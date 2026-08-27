# Provider
Shared project instructions for AGENTS.md-compatible harnesses: Codex, DSH, Cursor, Pi, Command Code,
and OpenCode. This file contains project-specific rules only.

# Project
[What this project does — 2 lines max]

# Stack
[Languages, frameworks, key libraries, entry points]

# Commands
[Canonical setup, run, test, lint, type-check, build, and other verification commands]

# Architecture
[Key folders/components and what each owns — 1 line each]

# External Dependencies
[External services, APIs, CLIs, data stores, config surfaces, or related repositories]

# Current Status
[One short statement: current phase/workstream, what is working, and the main unresolved item]

# Workflow
Use only the workflow for the harness running the current session. Several harness templates may
coexist in one repository; do not combine their mechanics.

- Codex: `.codex/WORKFLOW.md`.
- DSH: `.dsh/WORKFLOW.md`.
- Cursor: `.cursor/WORKFLOW.md`.
- Pi: `.pi/WORKFLOW.md`.
- Command Code: `.commandcode/WORKFLOW.md`.
- OpenCode: `.opencode/WORKFLOW.md`.

The workflow file owns role topology and review mechanics. Globally managed skills remain global;
do not copy workflow skills into the project template.

[Project-only workflow constraints or routing overrides, if any. Do not restate the harness workflow
protocol here.]

# Project Skills
[List project-only skills or leave empty. Do not repeat global skill-framework guidance.]

# Local Rules
[Project-only conventions, invariants, scope boundaries, acceptance criteria, and protected paths.
Do not repeat global policy or harness workflow mechanics.]

# Memory
If this project has `memory/MEMORY.md`, use it for project history and handoff context. Verify it
against the current tree; it does not override this file, the active harness workflow, or the accepted
plan.
