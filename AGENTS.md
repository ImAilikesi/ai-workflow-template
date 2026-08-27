# Repository Instructions

## Purpose

This repository is a public-safe control room for editable AI harness instruction and workflow surfaces.

- `live/` mirrors the intended global state for harnesses actually configured on the machine.
- `templates/` contains manual copy-ready project bundles.
- `sync.sh` mirrors only tracked public-safe live files to normal harness locations.

Skills are managed separately by Skills Manager. Do not add shared skill libraries here.

## Locked architecture

- `live/codex/` — global Codex `AGENTS.md`, `WORKFLOW.md`, and hand-maintained role TOMLs.
- `live/opencode/` — global OpenCode `AGENTS.md`, `WORKFLOW.md`, and hand-maintained agents.
- `live/claude/` — global Claude instruction file.
- `live/dsh/` — global DSH instruction file.
- `templates/<harness>/` — complete manual project bundle for that harness.

Do not add a harness under `live/` until its real local editable instruction surface is verified. Do not add symlinks or make harnesses read this repository at runtime.

## Workflow rules

Codex has exactly three standard workflow topologies: Sol + GLM, Sol-only, and Sol + Luna. Existing configured Codex supporting roles remain available unless the operator explicitly authorizes deletion.

Other harness templates use one model-agnostic shape: active model owns orchestration and execution; the operator selects one independent reviewer model.

Do not restore separate phase-gate or handoff skill packages here. Keep the useful review/verification mechanics in concise `WORKFLOW.md` files. Cross-session handoff uses the globally managed `handoff` skill.

## Content preservation

Global `AGENTS.md` / `CLAUDE.md` behavior is intentionally stable. Preserve existing rules unless a requested workflow or architecture change requires a specific edit. Do not broadly rewrite these files during structural work.

## Public-safe boundary

Never commit API keys, tokens, provider credentials, `.env`, private project data, memories, caches, account state, full provider configuration, or generated authenticated router files.

Generated Codex Router model-role files are not source-controlled here. Hand-maintained role TOMLs are.

## Changes

Read the current tree and README before structural edits. Keep moves mechanical where possible. Verify `sync.sh` syntax and mappings when live surfaces change.

Do not commit or push unless explicitly authorized.
