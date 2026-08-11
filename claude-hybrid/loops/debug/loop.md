# Debug Loop

Find and fix a bug with the **smallest** change. Mainly driven by Codex. The discipline is:
reproduce first, isolate the root cause, fix only that, verify green. No unrelated refactors.

## Driver

- **Codex** drives by default (`config.yaml: driver`). Opus owns unclear debugging that needs
  architectural judgment.

## Loop

1. **Reproduce** → verify: the bug is observed deterministically (a command/test that fails).
   If `require_repro` and it can't be reproduced, stop — do not guess at fixes.
2. **Failing test** → verify: a test exists that fails *because of this bug* and would pass
   once fixed (`require_failing_test_first`). The test encodes *why* the behavior matters.
3. **Isolate root cause** → verify: the actual cause is identified at `file:line`, logged in
   the evidence log — not a symptom, not a guess.
4. **Smallest fix** → verify: the change touches only what the root cause requires. No
   adjacent "improvements," no refactors (`no_unrelated_changes`).
5. **Run tests/checks** → verify: `test_cmd` passes, the new failing test now passes, and no
   previously-passing test regressed.
6. **Confirm green** → verify: full check is clean. If not, return to step 3 (up to
   `max_retries`), then stop and escalate.

## Guardrails

- **Reproduce before fixing** — no repro, no fix. Guessing at a fix you can't trigger is banned.
- **Smallest fix only** — touch only what the root cause requires.
- **No unrelated refactors** — pre-existing dead code or adjacent smells get **mentioned, not
  changed** (see `CLAUDE.md` §3).
- The evidence log must contain the repro and the root cause, not just the fix.

## Definition of Done

**Done when** the reproducing test now passes, the full `test_cmd` is green with no regressions,
and the diff is the minimal change tracing to the root cause.

## Evidence required before PASS

The evidence log must show: the **repro** (failing command/test before the fix), the **root
cause** at `file:line`, and the **green run** of `test_cmd` after the fix (incl. the once-failing
test now passing). No `PASS` without all three.

## Built-in controls

- Checkpoints / stop conditions / escalation: `../_shared/checkpoint-and-escalation.md`.
- Operating rules (failure budget, retries, resume, anti-drift): `../_shared/operating-rules.md`.
- Loop modes: `../_shared/loop-modes.md`.
- Handoff / evidence: `../_shared/handoff.md`, `../_shared/evidence-log.md`.

## Resume

After a context break, follow `../_shared/operating-rules.md` → "Resume" and re-read the repro +
root cause from `HANDOFF.md` before touching the fix.

## Knobs

See `config.yaml` — `driver`, `require_repro`, `require_failing_test_first`, `test_cmd`,
`no_unrelated_changes`, `max_retries`, `failure_budget`.
