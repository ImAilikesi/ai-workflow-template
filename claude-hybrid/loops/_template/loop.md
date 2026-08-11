# <Loop Name> Loop

<!--
RAW LOOP TEMPLATE — copy this folder to spin up a task-specific loop.
This is a scaffold, NOT a loop category. Fill every <...>. Delete guidance comments when done.
Fastest path: ask Claude / Codex / Hermes — "create a loop from _template for <task>".
Fill `Done when` and `Verification surface` FIRST; the rest follows from them.
-->

<One-line purpose: what this loop produces.>

## Driver

- <Who runs it: Claude (Opus) / Codex / Hermes / OpenGo executor — and what each does.>

## Definition of Done

**Done when** <the stop condition, written first — finish: "this is done when ___">.
<If you can't state this crisply, you have a prompt, not a loop — stop and define it.>
- [ ] <concrete completion item>
- [ ] <item>
- [ ] Verification surface is green (see below).

## Verification surface

<The concrete evidence that PROVES done — a command, a test, a metric threshold, an artifact.>
<Rule: if the only verification is your gut feeling, it's a prompt, not a loop. Name a real
check here (e.g. `pytest -q` green, build artifact produced, sharpe ≥ target on OOS data).>

## Loop

1. **<Step>** → verify: <observable check for this step>.
2. **<Step>** → verify: <...>.
3. **<Step>** → verify: <...>.
4. **Repeat** <which steps>, or **stop** on a stop condition / when the Definition of Done is met.

## Evidence required before PASS

<What a reviewer must SEE in the evidence log before any `VERDICT: PASS` — cite the actual
command output / metric / test name, not a claim.>

## Built-in controls

- Checkpoints / stop conditions / escalation: `../_shared/checkpoint-and-escalation.md`.
- Operating rules (failure budget, retries, anti-drift, human triggers): `../_shared/operating-rules.md`.
- Loop modes (how this loop is run): `../_shared/loop-modes.md`.
- Handoff / evidence: `../_shared/handoff.md`, `../_shared/evidence-log.md`.

## Resume

On resume or after a context break, follow `../_shared/operating-rules.md` → "Resume" and read
`HANDOFF.md` before continuing.

## Knobs

See `config.yaml`.
