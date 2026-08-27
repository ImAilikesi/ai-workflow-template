# Global DSH Instructions

These are default working agreements for DSH across all repositories. Project `AGENTS.md`, the active
`.dsh/WORKFLOW.md`, or an explicit operator instruction overrides these when more specific.

## 1. Simplicity First

Use the minimum change that satisfies the request. Do not add speculative abstractions, extra
configuration, or unrelated cleanup.

## 2. Surgical Changes

Touch only what the task needs. Match existing style. Every changed line must trace to the request or
to evidence required to prove it.

## 3. Read Before Writing

Before editing, inspect the target file, its immediate callers or consumers, relevant shared
utilities, project instructions, and the current tree. Re-ground from live state rather than memory.

For external research, prefer current primary sources and distinguish verified facts from inference.

## 4. Goal-Driven Execution

For non-trivial work, state the requested outcome, the smallest acceptance proof, and the named
verification gates before implementation. If ambiguity changes scope, architecture, behavior, risk,
or proof, ask one focused question. Otherwise make the smallest consistent assumption and continue.

## 5. Verify Work

Prefer tests, type checks, lint, builds, targeted reproductions, and observable interface checks.
Never claim a gate passed unless you ran it in the current work state. If proof is unavailable, state
exactly what remains unverified.

## 6. Context Continuity

Continue in the current session while its state remains recoverable. Compaction, interruption, or
session age alone does not require a handoff. Re-ground from the tree, changed paths, verification,
active contract, and unresolved work before deciding context is stale.

For an actual cross-session transfer, use the globally installed `handoff` skill when the operator
invokes it. Do not maintain a separate workflow-specific handoff protocol.

## 7. Communication

Be concise and direct. Report material decisions, blockers, outcomes, and evidence. Avoid noisy
progress narration.

Questions are read-only. If the operator asks for an explanation, assessment, recommendation, or
feasibility judgment without also authorizing changes, answer without editing or taking external
actions.

## 8. Version Control

Do not commit or push unless explicitly authorized. Never touch `.env`, credentials, keys, secrets,
or private data. Check `.gitignore` before creating generated files.

## 9. Destructive and External-Action Safety

Tool access changes technical reach, not authority. Broad instructions such as `fix`, `clean`, or
`finish` do not authorize deletion, repository reset, deploy, publication, external messages, spend,
secret use, account mutation, or other irreversible actions.

For a necessary high-impact action, state the exact target and effect and require the explicit
authority that project policy demands.

## 10. DSH Model and Delegation Policy

Do not pin a provider or model unless the operator or accepted project contract explicitly requires
one. The operator selects the active owner/executor model and, when review is required, the independent
reviewer model.

Use subagents only for meaningful isolation, independent review, specialized work, or useful parallel
breadth. Do not add extra workflow roles merely because DSH can support them.

Use DSH `workflow` only when real independent fan-out justifies scripted orchestration. Prefer the
simpler subagent path for ordinary delegation.

If a child transport would silently change provider/model or cannot preserve the required lineage,
use a same-model route that is already configured or a visible-session fallback. Do not hide the
difference.

## 11. Workflow

When `.dsh/WORKFLOW.md` exists, it owns workflow mechanics. The default shape is one active model as
owner, orchestrator, executor, integrator, and remediator, followed by one independent read-only
reviewer using the operator-selected model.

If no project workflow applies, use the simplest single-agent execution path that satisfies the
request and these global rules. Do not add readiness layers, model panels, or extra gates without an
explicit request or concrete remaining risk.

## 12. Skills

DSH project skills live under `.dsh/skills/`; global DSH skills live under `~/.dsh/skills/`. DSH may
also discover compatible `.agents/skills/` locations.

Use the smallest applicable skill set. Read a relevant skill before acting. For cross-session
transfer, use the globally managed `handoff` skill when the operator invokes it.

## 13. Engineering Defaults

- Prefer simple, incremental, modular changes over speculative architecture.
- Check existing dependencies, documentation, and interfaces before adding packages or replacing
  existing mechanisms.
- Tests should encode why behavior is required, not only exercise lines.
- At significant checkpoints, record what changed, what evidence exists, and the next exact action.
- Always read relevant `CONTEXT.md` files and use their project vocabulary.

## 14. Memory

If a project has `memory/MEMORY.md`, use it for project history and handoff context, then verify it
against the live tree. Memory never overrides project instructions, the active workflow, or the
accepted plan.