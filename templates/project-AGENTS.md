# Provider
Codex-native project instructions. This file contains project-specific rules only.

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
The detailed native workflow lives in `.codex/WORKFLOW.md`. It owns role topology, phase gates,
review, continuation, and closure.

Use `.agents/skills/phase-gate/SKILL.md` for phase execution and
`.agents/skills/handoff/SKILL.md` for a continuation when those operations apply.

[Project-only workflow constraints or routing overrides, if any. Do not restate the workflow protocol.]

# Project Skills
Project-specific Codex skills live in `.agents/skills/`.

[List project-only skills or leave empty. Do not repeat global Superpowers guidance.]

# Local Rules
[Project-only conventions, invariants, scope boundaries, acceptance criteria, and protected paths.
Do not repeat global policy or workflow mechanics.]

# Memory
If this project has `memory/MEMORY.md`, use it for project history and handoff context. Verify it
against the current tree; it does not override this file, the active workflow, or the accepted plan.
