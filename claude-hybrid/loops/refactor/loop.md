# Refactor Loop

Controlled cleanup that **preserves behavior**. The non-negotiable rule: establish a green
baseline *before* touching anything, and verify against it *after*. If you can't baseline, you
can't safely refactor.

## Driver

- Driver-agnostic — any worker (`config.yaml: driver`, default `any`). The baseline-before /
  verify-after discipline holds regardless of who runs it. Behavior-changing decisions
  escalate to Opus.

## Loop

1. **Capture baseline** → verify: `baseline_cmd` (tests + lint + build) is **green** and its
   output is recorded in the evidence log. If it can't be made green, **stop** — there is no
   baseline to protect (`require_baseline`).
2. **Controlled change** → verify: one bounded refactor step, under `loc_cap`, no behavior
   change intended. Match existing conventions (`CLAUDE.md` §11).
3. **Re-run checks** → verify: `verify_cmd` (same checks as baseline) is green.
4. **Diff behavior** → verify: outputs/tests match baseline exactly. If `behavior_must_match`
   and anything differs, **stop** — a refactor that changes behavior is a bug, revert the step.
5. **Repeat** 2–4 for the next bounded step, or stop when the cleanup goal is met.

## Hard requirements

- **Baseline before, verification after** — both mandatory. No baseline → abort.
- **Behavior is invariant.** If tests change meaning, it is no longer a refactor — split it out
  and surface it.
- Refactor only what was asked; don't expand scope into new features.

## Definition of Done

**Done when** the cleanup goal is met and **behavior is provably unchanged**: `verify_cmd`
matches the recorded baseline exactly. If behavior differs, it isn't done — it's a regression.

## Evidence required before PASS

The evidence log must show **baseline behavior evidence captured before changes** (the green
`baseline_cmd` output) and **equivalence verified after** (the `verify_cmd` output, matching the
baseline) — recorded side by side. No `PASS` without both.

## Built-in controls

- Checkpoints / stop conditions / escalation: `../_shared/checkpoint-and-escalation.md`
  (includes the no-baseline and behavior-change stops).
- Operating rules (failure budget, retries, resume, anti-drift): `../_shared/operating-rules.md`.
- Loop modes: `../_shared/loop-modes.md`.
- Handoff / evidence: `../_shared/handoff.md`, `../_shared/evidence-log.md` — record baseline
  output and post-change output side by side.

## Resume

After a context break, follow `../_shared/operating-rules.md` → "Resume" and re-confirm the
recorded baseline is still valid before continuing.

## Knobs

See `config.yaml` — `baseline_cmd`, `verify_cmd`, `require_baseline`, `behavior_must_match`,
`loc_cap`, `failure_budget`, `max_retries`.
