# Loops

Reusable **execution playbooks** ("loops") for this project template. Each loop is a
self-contained way of driving a class of work — building, research, debugging, refactoring,
auditing, releasing — with defined roles, checkpoints, stop conditions, and escalation.

## Opt-in by design

These loops do **not** run automatically and do **not** change default project behavior.
Nothing here is auto-loaded — no hooks, no settings, no edits to `CLAUDE.md`. A loop only
applies when you point at a compatible active loop on purpose, e.g.:

> "Use the **debug** loop in `.claude/loops/debug/` for this."

## Layout

```
loops/
  _shared/                         # reusable formats, referenced by every loop
    handoff.md                     # handoff file format         (vault HANDOFF.md)
    evidence-log.md                # evidence/decision log        (vault LOG.md)
    checkpoint-and-escalation.md   # checkpoints, stop conditions, escalation ladder
    operating-rules.md             # failure budget, retries, resume, anti-drift, human triggers
    loop-modes.md                  # the 5 ways to RUN a loop (process loop by default)
  _template/                       # raw fill-in-the-blank scaffold for new loops (not a category)
    loop.md
    config.yaml
  <loop>/
    loop.md                        # the playbook (roles, numbered loop, checks)
    config.yaml                    # the tunable knobs (model, cadence, thresholds)
```

Each loop folder is two files: `loop.md` (what to do) and `config.yaml` (the knobs to
retune per project). Shared formats live once in `_shared/` and are referenced by relative
path, so loops stay DRY.

## Execution modes

These templates are **process loops by default** — a human (or an agent you point at them)
drives the steps. `/loop`, hooks, and routines are **optional** execution mechanisms, not
required and not shipped here. See `_shared/loop-modes.md`.

## Authoring a new loop (on demand)

For one-off or task-specific work, don't force-fit a category — spin up a loop from the raw
scaffold. Copy `_template/` to a new folder, or just ask an agent:

> "Create a loop from `_template/` for `<task>`."  — works with Claude, Codex, or Hermes.

Fill **`Done when`** (the stop condition) and the **`Verification surface`** (the evidence that
proves done) *first* — everything else follows. If the only check is your gut feeling, it's a
prompt, not a loop.

## Available loops

| Loop                  | Driver            | Use it for |
|-----------------------|-------------------|------------|
| `debug`               | Codex             | Reproduce → smallest fix → green, no unrelated refactors |
| `refactor`            | any worker        | Behavior-preserving cleanup with baseline-before / verify-after |
| `audit`               | Claude and/or Codex | Findings with severity + evidence (codebase / arch / security / UX / project) |
| `release`             | Codex             | Pre-release checklist → GO / NO-GO verdict |
| `project-builder`     | *retired*         | Do not run. Kept as a compatibility marker only; the phase contract in `WORKFLOW.md` owns phase roles and review ordering |

## How to use one

1. Pick the loop and read its `loop.md`.
2. Open its `config.yaml` and fill the project-specific placeholders (`test_cmd`, `loc_cap`, etc.).
3. Tell the agent to run that loop. The agent uses the `_shared/` formats for handoff,
   evidence logging, and checkpoint/escalation decisions.

## Alignment

Active loops are subordinate to the phase contract in `CLAUDE.md` and `.claude/WORKFLOW.md`. In the
Claude-hybrid topology one Opus parent owns orchestration and implementation, Luna/Max supplies
pre-Terra readiness, and Terra is the only independent phase-end reviewer. An active loop cannot add
a principal, an intermediate review gate, or an alternate merge authority.
