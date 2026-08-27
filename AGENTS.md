# Repository Instructions

## Purpose

This repository is a public-safe control room for the editable instruction surfaces used by AI coding harnesses.

- `live/` is the desired global instruction state for tracked harnesses.
- `templates/project/` contains manual project starter files.
- `sync.sh` copies tracked live files to and from each harness's normal global directory.

Skills, credentials, provider/account configuration, memories, caches, and full machine configuration do not belong here.

## Current structure

- `live/codex/` — Codex global instructions, workflow, and hand-maintained role TOMLs.
- `live/opencode/` — OpenCode global instructions, workflow, and hand-maintained agents.
- `live/claude/` — Claude global instructions only.
- `live/dsh/` — DSH global instructions only.
- `templates/project/` — manual project `AGENTS.md` and `CLAUDE.md` starters.

Generated Codex Router model files are not tracked. Shared skills are managed by Skills Manager.

## Rules

- Keep this repository lean. Add only a real editable instruction surface or a file needed to maintain it.
- Keep harnesses native. Do not make a harness read configuration from this repository at runtime.
- Do not use symlinks.
- Keep project templates manual and project-specific.
- Keep workflow mechanics out of large global `AGENTS.md`/`CLAUDE.md` files when a small harness `WORKFLOW.md` is clearer.
- Do not restore the retired phase-gate, readiness, ledger, or multi-package ceremony without a concrete failure that needs it.
- Never commit secrets, private project data, `.env`, provider keys, account state, or generated authenticated router files.

## Changes

Inspect the current tree before structural edits. Keep changes minimal and verify paths and sync behavior. Do not commit or push unless explicitly authorized.
