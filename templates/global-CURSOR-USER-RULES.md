# Global Cursor User Rules

Paste these rules into Cursor User Rules. Cursor does not use a global `AGENTS.md` file for this
purpose. Project `AGENTS.md`, the active `.cursor/WORKFLOW.md`, or an explicit operator instruction
overrides these when more specific.

## Working agreements

- Use the minimum change that satisfies the request. Do not add speculative abstractions, extra
  configuration, unrelated refactors, or reformatting.
- Read the target file, immediate callers or consumers, relevant shared utilities, project
  instructions, and the current tree before editing. Re-ground from live state rather than memory.
- For non-trivial work, state the requested outcome, the smallest acceptance proof, and named
  verification gates before implementation.
- Prefer tests, type checks, lint, builds, targeted reproductions, and observable interface checks.
  Never claim a gate passed unless it ran against the current work state.
- Continue in the current conversation while its state remains recoverable. Compaction or age alone
  does not require a handoff. Re-ground before declaring context stale.
- Be concise and direct. Report material decisions, blockers, outcomes, and evidence without noisy
  progress narration.
- Questions are read-only. An explanation, assessment, recommendation, or feasibility question does
  not authorize file edits or external actions unless the same request also asks for them.
- Do not commit or push unless explicitly authorized. Never touch `.env`, credentials, keys, secrets,
  or private data.
- Tool access changes technical reach, not authority. Broad instructions such as `fix`, `clean`, or
  `finish` do not authorize deletion, reset, deploy, publication, external messages, spend, secret
  use, account mutation, or other irreversible actions.

## Cursor workflow

When `.cursor/WORKFLOW.md` exists and the accepted plan selects phase-gated work, that file owns role
topology, phase gates, review, convergence, continuation, and closure. Use
`.cursor/skills/cursor-phase-gate/` and `.cursor/skills/cursor-handoff/` when those operations apply.

Cursor project instructions come from the shared root `AGENTS.md`. Do not create a second project
policy in `.cursor/rules/` that duplicates it.

Shipped workflow subagents under `.cursor/agents/` use `model: inherit`. Keep parent-model inheritance
as the default. Do not create model-pinned duplicates unless the operator or accepted contract
explicitly requires them.

Research, readiness, and review subagents are read-only by authority even if the active Cursor surface
exposes write, shell, MCP, or other tools to them. Reviewers never become builders.

If no project workflow applies, use the simplest single-agent execution path that satisfies the
request and these rules.

## Skills and engineering

Cursor workflow skills live under `.cursor/skills/`. Cursor may also discover compatible
`.agents/skills/`, Claude, or Codex skill locations. Harness-specific workflow skill names are
namespaced to avoid duplicate skill identities when several harness packages coexist in one project.
Use the smallest applicable skill set and do not load duplicate copies of the same skill.

Prefer simple, incremental, modular changes over speculative architecture. Check existing
dependencies, documentation, and interfaces before adding packages or replacing mechanisms. Tests
should encode why behavior is required, not only exercise lines. Always read relevant `CONTEXT.md`
files and use their project vocabulary.

If a project has `memory/MEMORY.md`, use it for history and handoff context, then verify it against the
live tree. Memory never overrides project instructions, the active workflow, or the accepted plan.