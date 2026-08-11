# Release Loop

Pre-release readiness check ending in a single **GO / NO-GO** verdict. Mainly driven by Codex.
Walks a fixed checklist; any blocking item is NO-GO until cleared.

## Driver

- **Codex** drives by default (`config.yaml: driver`). Opus owns release decisions involving
  architecture or risk judgment. The user is the final operator — Codex does not ship.

## Loop (checklist)

Run each enabled check; record pass/fail + evidence. Order matters — stop drilling once a
NO-GO blocker is confirmed, but report all findings.

1. **Tests** → verify: `test_cmd` green, no skips hiding failures.
2. **Build** → verify: `build_cmd` produces a clean artifact.
3. **Docs** → verify: changelog / README / API docs reflect this release.
4. **Config** → verify: config defaults correct for the target; no dev-only values.
5. **Env** → verify: required env vars documented and present for `deploy_target`; no secrets
   committed.
6. **Migrations** → verify: migrations are reversible / safe; run order documented.
7. **Deployment risk** → verify: rollback plan exists; blast radius understood.
8. **Verdict** → emit `GO` or `NO-GO` with the blocking items listed.

## Verdict

A release run ends in **exactly one** verdict, with exact blockers:

```
VERDICT: GO | NO-GO
Blockers:
  - <failing check> — <evidence: command + output / what's missing>   # one per blocker
  # GO requires this list to be empty
```

`GO` requires an **empty** blocker list. Each blocker names the **failing check** and its
**evidence** — not a generic label. Maps to the `VERDICT` convention in
`../_shared/checkpoint-and-escalation.md`. `NO-GO` blocks the release; a `GO` is advisory —
**the user ships**, not the loop.

## Definition of Done

**Done when** every enabled check has a recorded pass/fail with evidence and a single `VERDICT`
line is emitted. The loop is done at the verdict; shipping is the user's separate action.

## Evidence required before PASS (GO)

Each enabled check cites its command + output (tests green, build artifact, migration review,
etc.). A `GO` with any unbacked check is invalid — that's gut feeling, not a verification surface.

## Built-in controls

- Checkpoints / stop conditions / escalation: `../_shared/checkpoint-and-escalation.md`.
- Operating rules (failure budget, resume, human triggers): `../_shared/operating-rules.md`.
- Loop modes: `../_shared/loop-modes.md`.
- Evidence: `../_shared/evidence-log.md` — every checklist item cites its command/output.

## Resume

After a context break, follow `../_shared/operating-rules.md` → "Resume" and re-run checks
rather than trusting a prior in-context "green".

## Knobs

See `config.yaml` — `driver`, `test_cmd`, `build_cmd`, `checks`, `deploy_target`, `block_on`,
`failure_budget`.
