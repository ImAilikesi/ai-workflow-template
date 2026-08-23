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
// ("VERDICT: PASS|CHANGES|BLOCK"), bracket/paren placeholders ("PASS — <reason>",
// "(reason)"), escaped or quote-wrapped placeholders, and bare "PASS" never
// count, so instruction text cannot satisfy the gate.
function reasonOk(rest) {
  if (/^\s*\|/.test(rest)) return false;
  const separated = rest.match(/^\s*[—–-]\s*(.*)$/);
  if (!separated) return false;
  // Unwrap every layer of matching quotes before the placeholder check;
  // anything still opening with a bracket, paren, quote, or escape afterwards
  // is a placeholder or malformed line, not a reason.
  let reason = separated[1].trim();
  for (;;) {
    const next = reason.replace(/^(['"`])((?:(?!\1).)*)\1$/, "$2").trim();
    if (next === reason) break;
    reason = next;
  }
  return Boolean(reason) && !/^[<[\{('"`\\]/.test(reason);
}

// Verdict lines are matched per line and anchored at line start. The terra
// prefix must be the canonical single-space form, so spacing variants ("TERRA
//  VERDICT", tabs, NBSP) and foreign word prefixes ("MYVERDICT") can never
// satisfy either gate through substring matching. Terra lines count for terra
// only.
export function scanLedgerText(text) {
  let childPass = false;
  let terraPass = false;
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const terra = line.match(/^TERRA VERDICT:\s*PASS(.*)$/i);
    if (terra) {
      if (reasonOk(terra[1])) terraPass = true;
      continue;
    }
    const child = line.match(/^VERDICT:\s*PASS(.*)$/);
    if (child && reasonOk(child[1])) childPass = true;
  }
  return { childPass, terraPass };
}

async function scanLedger(ledgerPath) {
  try {
    return scanLedgerText(await readFile(ledgerPath, "utf8"));
  } catch {
    // Missing or unreadable ledger means no verdicts yet: stay blocked.
    return { childPass: false, terraPass: false };
  }
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
            "and append the exact verdict line to the active verdict ledger " +
            "(.opencode/verdicts.log by default; OPENCODE_VERDICT_LEDGER overrides the path).",
        );
      }
      if (needsTerraGate && !terraPass) {
        throw new Error(
          "Landing gate blocked a push/publish/deploy command: no terra verdict in the ledger. " +
            "Run the terra-review skill (codex exec --sandbox read-only), iterate until `TERRA VERDICT: PASS`, " +
            "and append the exact verdict line to the active verdict ledger " +
            "(.opencode/verdicts.log by default; OPENCODE_VERDICT_LEDGER overrides the path).",
        );
      }
    },
  };
};
