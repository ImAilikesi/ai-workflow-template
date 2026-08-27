# Global Command Code Instructions

These are default working agreements for Command Code across all repositories. Project `AGENTS.md`,
project `.commandcode/AGENTS.md`, or an explicit operator instruction overrides these when more
specific.

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

## 5. Workflow and delegation

One active Command Code parent owns orchestration, implementation, integration, remediation, and
final verification. Small tasks should stay in that parent when delegation adds no value.

Use built-in agents or explicitly configured personal/project agents only. Do not invent ad-hoc roles,
guess agent names, or silently substitute another model/provider. Built-in `Explore` and `Plan` are
read-only support lanes; `General` is not an independent reviewer.

For substantial changes, after writers stop, use one read-only `independent-reviewer` when review
materially helps or the operator requests it. Keep the selected reviewer model fixed for that review
lineage. `CHANGES` returns to the same parent for remediation and then to the same reviewer for a
targeted recheck. If the selected reviewer model cannot be applied natively, use one isolated reviewer
session instead. The same parent performs final verification and signoff.

## 6. Context continuity

Continue in the same session while its state remains recoverable. Compaction, interruption, session
age, or token count alone does not require a handoff. Re-ground from the tree, changed paths,
verification state, active contract, and unresolved findings before deciding context is stale.

For an actual cross-session transfer, use the globally managed `handoff` skill when available and
explicitly invoked. Do not maintain a second workflow-specific handoff protocol.

## 7. Safety and version control

Do not commit or push unless explicitly authorized. Never touch `.env`, credentials, keys, secrets,
or private data without explicit authority. Broad requests such as `fix`, `clean`, or `finish` do not
authorize destructive, irreversible, financial, production, or external-account actions.

## 8. Communication

Be concise and direct. Report material decisions, blockers, outcomes, and evidence without noisy
progress narration. Questions are read-only unless the same instruction explicitly authorizes
changes or external actions.

## 9. Skills and configuration boundary

Shared skills are managed globally. Do not create project-local copies of globally managed skills by
default. This control-room surface intentionally does not own authentication, taste data, provider
settings, conversation history, or other machine-private Command Code state.
