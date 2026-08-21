# Global Command Code Instructions

These are default working agreements for Command Code across all repositories. Project `AGENTS.md`,
the active `.commandcode/WORKFLOW.md`, or an explicit operator instruction overrides these when more
specific.

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

For non-trivial work, state the requested outcome, the smallest acceptance proof, and named
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

Use the project handoff skill only when a verified continuation packet is materially safer than broad
history reconstruction.

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

## 10. Command Code Model and Delegation Policy

Do not pin a provider or model unless the operator or accepted project contract explicitly requires
one. Keep provider/model selection as a session/user concern.

Use custom agents only for meaningful isolation, independent review, specialized work, or useful
parallel breadth. Research, readiness, and review agents are read-only by authority and should expose
only the minimum read tools they need.

Do not use a different model merely to seek a different review verdict.

## 11. Workflow

When `.commandcode/WORKFLOW.md` exists and the accepted plan selects phase-gated work, that file owns
role topology, phase gates, review, convergence, continuation, and closure. Use
`.commandcode/skills/commandcode-phase-gate/` and `.commandcode/skills/commandcode-handoff/` when
those operations apply.

If no project workflow applies, use the simplest single-agent execution path that satisfies the
request and these global rules.

## 12. Skills and Agents

Command Code project skills live under `.commandcode/skills/`; user skills live under
`~/.commandcode/skills/`. Project custom agents live under `.commandcode/agents/`; user custom agents
live under `~/.commandcode/agents/`.

Use the smallest applicable skill set. Read a relevant skill before acting. Do not stack unrelated
skills only because they are available.

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
