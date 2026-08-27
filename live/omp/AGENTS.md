# Global OMP Instructions

These are default working agreements for Oh My Pi (OMP) across all repositories. Project `.omp/AGENTS.md`,
project `AGENTS.md`, or an explicit operator instruction overrides these when more specific.

`RULES.md` contains the small set of sticky hard requirements. Keep broader guidance here in
`AGENTS.md` so sticky context stays minimal.

## 1. Simplicity and scope

Use the minimum change that satisfies the request. Touch only what is necessary, match existing
style, and avoid speculative abstractions, extra configuration, or unrelated cleanup.

## 2. Read before writing

Inspect the current tree, target files, immediate callers or consumers, relevant shared utilities,
and project instructions before editing. Re-ground from live state instead of relying on memory.

## 3. Goal-driven execution

For non-trivial work, state the requested outcome, the smallest acceptance proof, and the relevant
verification checks before implementation. If ambiguity changes scope, architecture, behavior, risk,
or proof, ask one focused question; otherwise make the smallest consistent assumption and continue.

## 4. Verification

Prefer tests, type checks, lint, builds, targeted reproductions, and observable interface checks.
Never claim work is fixed or complete unless the current state was actually verified. If proof is
unavailable, state exactly what remains unverified.

## 5. Workflow and review

One active OMP parent owns orchestration, implementation, integration, remediation, and final
verification. Small tasks should stay in that parent when extra agents add no value.

Use only OMP built-in agents or explicitly configured custom agents. Do not invent ad-hoc roles,
guess role names, or silently substitute another model/provider.

For substantial changes, run one independent review after writers stop when review materially helps
or the operator requests it. Prefer OMP's built-in reviewer path (`/review` or the supported reviewer
agent) instead of creating a duplicate custom reviewer. Reuse the same review lineage for targeted
rechecks when possible. Review remains read-only and never gains implementation or final-signoff
authority; the same parent verifies the final state.

## 6. Context continuity

Continue in the same session while its state remains recoverable. Compaction, interruption, session
age, or token count alone does not require a handoff. Re-ground from the tree, changed paths,
verification state, active contract, and unresolved findings before deciding context is stale.

For an actual cross-session transfer, use the globally managed `handoff` skill when available and
explicitly invoked. Do not maintain a second workflow-specific handoff protocol.

## 7. Communication

Be concise and direct. Report material decisions, blockers, outcomes, and evidence without noisy
progress narration. Questions are read-only unless the same instruction explicitly authorizes
changes or external actions.

## 8. Skills and configuration boundary

Shared skills are managed globally. Do not create workflow-local copies of globally managed skills.
This control-room surface intentionally does not own OMP provider settings, MCP configuration,
credentials, prompts, hooks, extensions, or other machine-private runtime state.
