---
name: terra-review
description: Cross-model terra review through the Codex CLI. Use when a phase closes, when money/security/release/data-integrity/architecture surfaces changed, or before any push, publish, merge, or deploy. Runs a read-only second opinion and records TERRA VERDICT markers; the optional landing gate plugin consumes them when installed.
---

# Terra review

One independent cross-model pass over finished work, executed through the Codex CLI in a read-only
sandbox. Terra reviews evidence; it never edits the tree.

## When to run

1. At every phase boundary, after the independent reviewer returns `VERDICT: PASS`.
2. Always, when the change touches money, security, release machinery, consequential data
   integrity, trading truth, major architecture, or cross-repository contracts — even mid-phase.
3. Before every irreversible landing: `git push`, PR create/merge, release upload, deploy.

## Procedure

1. Build the evidence packet at `/tmp/opencode/terra-packet.md`:
   - accepted scope and goal, one paragraph;
   - the relevant diff (`git diff` against the base, plus new files in full);
   - gates actually run, with real output (tests, typecheck, lint);
   - the independent reviewer's final `VERDICT: PASS` line and one-line history of prior
     CHANGES rounds;
   - known risks and rollback plan.
2. Run terra read-only:

   ```sh
   mkdir -p /tmp/opencode
   model="${OPENCODE_TERRA_MODEL:-gpt-5.6-terra}"
   codex exec --sandbox read-only --model "$model" "$(cat /tmp/opencode/terra-packet.md)"
   ```

3. Read the full terra output. Classify each finding: confirmed defect, speculative concern, or
   out-of-scope note.
4. Record the verdict verbatim in this session. When the landing gate plugin is installed, also
   append the exact line to the active verdict ledger (`.opencode/verdicts.log` by default;
   `OPENCODE_VERDICT_LEDGER` overrides the path) with a file tool — create the file when missing,
   one line per verdict, never a shell command: the gate matches raw command text, so a reason
   containing `git commit` or `git push` would block its own append:

   `TERRA VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

## Iteration

On `CHANGES`: hand confirmed defects back to the normal build/review loop, obtain a fresh
`VERDICT: PASS`, rebuild the packet with the remediation delta, and run terra again. The newest
terra verdict replaces older ones. On `BLOCK`: stop; do not land anything; surface the blocker.

## Rules

- Never give terra write access: keep `--sandbox read-only`.
- Never edit terra output before recording the verdict.
- If the CLI fails, report the failure; do not fabricate a verdict.
- Override the model only through `OPENCODE_TERRA_MODEL`.
