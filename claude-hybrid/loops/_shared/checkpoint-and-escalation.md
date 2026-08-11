# Checkpoints, stop conditions & escalation

Shared definitions every loop references instead of restating. Aligned with the phase contract
and review protocol in `CLAUDE.md` and `.claude/WORKFLOW.md`.

## What a checkpoint is

A **checkpoint** is a defined point where work pauses for review before continuing. Between
checkpoints the worker runs without being watched. At a checkpoint:

1. Worker updates `HANDOFF.md` and the evidence log.
2. The reviewer (Opus at checkpoints; Codex at the verification gate) inspects the diff +
   evidence — never merges blind.
3. A verdict is issued (below). Work continues, is corrected, or stops.

Checkpoints are defined by the loop's `config.yaml` (`checkpoint_every`) — e.g. per task,
per N LOC, or per phase. Pick the smallest cadence that keeps reviews cheap and bounded.

## Verdict convention

Reviews emit a single verdict line (same convention `codex-review` uses):

```
VERDICT: PASS | CHANGES | BLOCK
```

- **PASS** — correct and in scope. Advisory only; the user is still the one who merges.
- **CHANGES** — proceed after the listed fixes; re-review the fixes.
- **BLOCK** — do not continue or merge. Escalate.

Never merge a BLOCK. A Codex `PASS` is advisory, not permission to merge.

## Stop conditions

Stop the loop and escalate when any of these trip:

- **Budget hit** — task or session token budget reached (see `CLAUDE.md` §6).
- **Repeated failure** — same step fails N times (`config.yaml: max_retries`) with no new
  information; stop guessing.
- **Scope breach** — the change is drifting outside the stated goal / `loc_cap`, or into the
  never-delegate list (architecture, security, secrets, `.git`, CI/build, deps, entitlements).
- **Behavior change** (refactor loop) — verification no longer matches baseline.
- **No baseline** (refactor loop) — cannot establish a green baseline to protect.
- **Unresolved decision** — progress requires a call only the user can make.

On stop: write the handoff, log the evidence, state the stop reason in one line, escalate.

## Escalation ladder

```
worker (OpenGo / Codex)            ← does the work inside its isolated worktree
   ↓ checkpoint
Opus review                        ← inspects diff + evidence, issues verdict
   ↓ verification gate
Codex independent verification     ← second opinion; PASS is advisory
   ↓
user (final operator)              ← only the user merges / commits / ships
```

Each rung handles what the rung below cannot. Skipping a rung (e.g. worker self-merges, or
Opus merges without the user) is a process violation. When in doubt, escalate up — never
down.
