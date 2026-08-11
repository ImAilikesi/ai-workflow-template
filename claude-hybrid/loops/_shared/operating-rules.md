# Operating rules

Durable rules for long-running AI work, referenced by every loop. These keep a loop honest
across retries, context compaction, and multi-session runs. Pairs with
`checkpoint-and-escalation.md` (verdicts, stop conditions, escalation ladder) — this file is the
*discipline*; that file is the *gates*.

## Failure budget

A run has a **failure budget** (`config.yaml: failure_budget`) — the total number of distinct
failures allowed before the loop stops and escalates. Distinct = different root causes, not the
same error retried. Exhausting the budget is a stop condition; do not push past it.

## Max retries on the same error

Same error, no new information → stop guessing (`config.yaml: max_retries`). Retrying an
identical failure without a changed hypothesis burns budget and learns nothing. After
`max_retries`, escalate with the evidence log showing what was tried.

## Resume after context compact / session break

On resume, **do not trust in-context memory** — it may be summarized or stale:
1. Re-read `HANDOFF.md` → `TRUTH.md` → `LOG.md` (vault read order).
2. Restate the **Goal** and the **Next action** in one line each.
3. Re-verify the last "Verified" claim in the handoff before building on it.
Never resume from a state you can't describe back.

## Fresh-context reload before major checkpoints

Before a checkpoint or verification gate, reload the **source of truth** — the spec, the actual
diff, the evidence log — rather than relying on what you think you remember. Reviews on stale
memory pass things that aren't true.

## Anti-scope-drift

Every change must trace to the stated goal. Anything you notice that's outside it gets **logged
and deferred**, not done inline (matches `CLAUDE.md` §3). Drifting past the goal or `loc_cap`, or
into the never-delegate list, is a stop condition — surface it, don't absorb it.

## Human decision triggers

Stop and escalate to the user when any of these appear — these are never auto-decided:
- Irreversible or outward-facing actions (publish, deploy, send, delete, spend).
- Never-delegate territory (architecture, security, secrets, `.git`, CI/build, deps,
  entitlements, and the project's core domain logic).
- Ambiguous requirements where interpretations diverge materially.
- Failure budget exhausted.
- Any security / secrets / money decision.

## Primitive selector (what to reach for)

When a loop step needs something you don't have, pick by what's missing:
- Missing **knowledge / how-to-think** → a **skill**.
- Missing **context / want isolation** → a **subagent** (its own context + tools).
- Missing **capability / external system** → an **MCP** server.
- Need a **guaranteed, every-time action** → a **hook** (deterministic, not advisory).

Don't treat these as competitors — layer them. Most don't apply to a given loop; use the
minimum.
