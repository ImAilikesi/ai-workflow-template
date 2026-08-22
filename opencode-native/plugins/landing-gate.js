// Landing gate: mechanically block irreversible landing commands until the
// required verdicts exist in the current session transcript.
//
//   git commit                      -> needs  VERDICT: PASS        (independent review)
//   git push / gh pr / deploys      -> needs  TERRA VERDICT: PASS  (cross-model terra review)
//
// Disable entirely with OPENCODE_LANDING_GATE=off.

const COMMIT_RE = /\bgit\s+commit\b/;
const PUSH_RE =
  /\bgit\s+push\b|\bgh\s+pr\s+(create|merge)\b|\bgh\s+release\s+(create|upload|edit)\b|\bwrangler\s+(deploy|versions\s+upload)\b|\bcf:deploy\b|\bvercel\s+(deploy|--prod)\b|\bnetlify\s+(deploy|prod)\b|\bfly(?:ctl)?\s+deploy\b/;

function extractText(part) {
  if (!part || typeof part !== "object") return "";
  if (part.type === "text" && typeof part.text === "string") return part.text;
  if (
    part.type === "tool" &&
    part.state &&
    part.state.status === "completed" &&
    typeof part.state.output === "string"
  ) {
    return part.state.output;
  }
  return "";
}

async function scanVerdicts(client, sessionID) {
  let data;
  try {
    const res = await client.session.messages({ sessionID });
    data = res.data;
  } catch (err) {
    throw new Error(
      `Landing gate: could not read the session transcript (${err?.message ?? err}). ` +
        `Retry, or start opencode with OPENCODE_LANDING_GATE=off to disable the gate.`,
    );
  }

  let childPass = false;
  let terraPass = false;
  for (const entry of data ?? []) {
    for (const part of entry?.parts ?? []) {
      const text = extractText(part);
      if (!text) continue;
      if (/TERRA VERDICT:\s*PASS\b/.test(text)) {
        terraPass = true;
      } else if (/VERDICT:\s*PASS\b/.test(text)) {
        childPass = true;
      }
    }
  }
  return { childPass, terraPass };
}

export const LandingGate = async ({ client }) => {
  if (process.env.OPENCODE_LANDING_GATE === "off") return {};

  return {
    "tool.execute.before": async (input, output) => {
      if (input?.tool !== "bash") return;
      const command = String(output?.args?.command ?? "");
      const needsCommitGate = COMMIT_RE.test(command);
      const needsTerraGate = PUSH_RE.test(command);
      if (!needsCommitGate && !needsTerraGate) return;

      const { childPass, terraPass } = await scanVerdicts(client, input.sessionID);

      if (needsCommitGate && !childPass && !terraPass) {
        throw new Error(
          "Landing gate blocked `git commit`: no independent-review verdict exists in this session yet. " +
            "Delegate @reviewer over the finished scope and resolve CHANGES findings until it ends with " +
            "`VERDICT: PASS — <reason>`, then commit.",
        );
      }
      if (needsTerraGate && !terraPass) {
        throw new Error(
          "Landing gate blocked a push/publish/deploy command: no cross-model terra verdict exists in this session yet. " +
            "Run the terra-review skill (codex exec, read-only sandbox) over the landing evidence and iterate until it records " +
            "`TERRA VERDICT: PASS — <reason>` in this session, then retry.",
        );
      }
    },
  };
};
