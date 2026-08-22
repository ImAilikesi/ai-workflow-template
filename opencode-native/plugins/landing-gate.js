// Landing gate hook: mechanically block irreversible landing commands until
// the matching verdicts exist in the project verdict ledger.
//
//   git commit                 -> needs  VERDICT: PASS        (independent review)
//   git push / pr / deploys    -> needs  TERRA VERDICT: PASS  (cross-model terra review)
//
// Ledger: .opencode/verdicts.log in the project directory (override with
// OPENCODE_VERDICT_LEDGER). The phase-gate and terra-review skills append
// every final verdict line there. Disable with OPENCODE_LANDING_GATE=off.

import { readFile } from "node:fs/promises";
import path from "node:path";

const COMMIT_RE = /\bgit\s+commit\b/;
const PUSH_RE =
  /\bgit\s+push\b|\bgh\s+pr\s+(create|merge)\b|\bgh\s+release\s+(create|upload|edit)\b|\bwrangler\s+(deploy|versions\s+upload)\b|\bcf:deploy\b|\bvercel\s+(deploy|--prod)\b|\bnetlify\s+(deploy|prod)\b|\bfly(?:ctl)?\s+deploy\b/;

// A real verdict carries a concrete reason after PASS. Alternation templates
// ("VERDICT: PASS|CHANGES|BLOCK"), bracket placeholders ("PASS — <reason>"),
// and bare "PASS" never count, so instruction text cannot satisfy the gate.
function passWithReason(matches) {
  for (const match of matches) {
    const rest = match[1];
    if (/^\s*\|/.test(rest)) continue;
    const separated = rest.match(/^\s*[—–-]\s*(.*)$/);
    if (!separated) continue;
    const reason = separated[1].trim();
    if (!reason || /^[<[\{]/.test(reason)) continue;
    return true;
  }
  return false;
}

function hasTerraVerdictPass(text) {
  return passWithReason(text.matchAll(/TERRA VERDICT:\s*PASS([^\n]*)/gi));
}

function hasChildVerdictPass(text) {
  // Strip terra lines first so a terra recording never satisfies review.
  const withoutTerra = text.replace(/TERRA VERDICT:[^\n]*/gi, "");
  return passWithReason(withoutTerra.matchAll(/VERDICT:\s*PASS([^\n]*)/g));
}

async function scanLedger(ledgerPath) {
  let text = "";
  try {
    text = await readFile(ledgerPath, "utf8");
  } catch {
    // Missing or unreadable ledger means no verdicts yet: stay blocked.
  }
  return {
    childPass: hasChildVerdictPass(text),
    terraPass: hasTerraVerdictPass(text),
  };
}

export const LandingGate = async ({ directory }) => {
  if (process.env.OPENCODE_LANDING_GATE === "off") return {};

  const ledgerPath =
    process.env.OPENCODE_VERDICT_LEDGER ?? path.join(directory ?? process.cwd(), ".opencode", "verdicts.log");

  return {
    "tool.execute.before": async (input, output) => {
      if (input?.tool !== "bash") return;
      const command = String(output?.args?.command ?? "");
      const needsCommitGate = COMMIT_RE.test(command);
      const needsTerraGate = PUSH_RE.test(command);
      if (!needsCommitGate && !needsTerraGate) return;

      const { childPass, terraPass } = await scanLedger(ledgerPath);

      if (needsCommitGate && !childPass) {
        throw new Error(
          "Landing gate blocked `git commit`: no independent-review verdict in the ledger. " +
            "Delegate @reviewer over the finished scope, resolve CHANGES until `VERDICT: PASS`, " +
            "and append the exact verdict line to .opencode/verdicts.log.",
        );
      }
      if (needsTerraGate && !terraPass) {
        throw new Error(
          "Landing gate blocked a push/publish/deploy command: no terra verdict in the ledger. " +
            "Run the terra-review skill (codex exec --sandbox read-only), iterate until `TERRA VERDICT: PASS`, " +
            "and append the exact verdict line to .opencode/verdicts.log.",
        );
      }
    },
  };
};
