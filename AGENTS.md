# Repository Instructions

## Purpose

This repository is a public-safe control room for editable AI harness instruction and workflow surfaces.

- `live/` mirrors the intended global state for harnesses actually configured on the machine.
- `templates/` contains shared manual project instruction templates.
- `inactive/` retains curated non-live assets for possible future reuse.
- `sync.sh` mirrors only tracked public-safe live files to normal harness locations.

Skills are managed separately by Skills Manager. Do not add shared skill libraries here.

## Locked architecture

- `live/codex/` — global Codex `AGENTS.md`, `WORKFLOW.md`, and hand-maintained role TOMLs.
- `live/opencode/` — global OpenCode `AGENTS.md`, `WORKFLOW.md`, and hand-maintained agents.
- `live/claude/` — global Claude instruction file.
- `live/dsh/` — global DSH instruction file.
- `templates/project-AGENTS.md` — shared project template for AGENTS.md-compatible harnesses.
- `templates/project-CLAUDE.md` — Claude project template.
- `inactive/` — public-safe retained assets that are not live, not synced, and not normative.

Project templates contain project-specific facts and constraints only. Do not turn `templates/` back into harness packages or install global workflow mechanics into projects by default.

Do not add a harness under `live/` until its real local editable instruction surface is verified. Do not add symlinks or make harnesses read this repository at runtime.

## Workflow rules

Codex has exactly three standard workflow topologies:

1. **Native — default:** Sol parent -> Luna executor -> final Terra review -> same Sol final signoff.
2. **Sol + GLM:** Sol parent -> GLM executor -> isolated GLM reviewer -> same Sol final signoff; Terra only for critical final audit.
3. **Sol-only:** Sol owner/orchestrator/executor -> final Terra review -> same Sol final signoff.

A substantial Codex task uses one persistent Sol parent thread. Delegated executors, bounded helpers, and reviewers sit below that parent; do not create a peer Sol orchestrator beside its executor.

`luna_research_worker` and `volume_worker` are the shared bounded helper roles. Both are optional, never mandatory, and recommended only when they materially reduce serial work, add useful evidence, or isolate a genuinely disjoint slice. Other configured Codex roles remain available unless the operator explicitly authorizes deletion, but they are not mandatory workflow stages.

Only spawn native subagents/roles that are explicitly configured for the active harness with verifiable model/provider/permission boundaries. Do not invent ad-hoc roles, silently substitute another model/provider, or spawn an unconfigured generic child unless the operator explicitly overrides this rule.

MCR is optional project-level authority for genuinely multi-phase or multi-workstream projects. Keep it in a separate principal thread above phase parent threads; do not mix MCR state with ordinary executor/reviewer context.

Other harness global workflows use one model-agnostic shape: one primary parent owns orchestration and execution; the operator selects one independent reviewer model. Project templates do not install or duplicate that workflow.

Do not restore separate live phase-gate or custom handoff skill packages here. Keep the useful review/verification mechanics in concise global workflow/instruction files. Cross-session transfer uses the globally managed `handoff` skill where available. Retired custom skills may be retained under `inactive/`.

## Content preservation

Global `AGENTS.md` / `CLAUDE.md` behavior is intentionally stable. Preserve existing rules unless a requested workflow or architecture change requires a specific edit. Do not broadly rewrite these files during structural work.

The shared project template structure is also intentionally stable: Provider, Project, Stack, Commands, Architecture, External Dependencies, Current Status, Workflow, Project Skills, Local Rules, and Memory. Keep project templates unfilled and harness-agnostic apart from the Claude-specific file.

## Public-safe boundary

Never commit API keys, tokens, provider credentials, `.env`, private project data, memories, caches, account state, full provider configuration, or generated authenticated router files.

Generated Codex Router model-role files are not source-controlled here. Hand-maintained role TOMLs are.

## Changes

Read the current tree and README before structural edits. Keep moves mechanical where possible. Verify `sync.sh` syntax and mappings when live surfaces change.

Do not commit or push unless explicitly authorized.
