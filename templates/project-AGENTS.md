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
Use the workflow/instructions of the harness that is running the current session. Global harness
configuration owns orchestration, execution, review, continuation, and signoff. Do not duplicate or
combine harness workflow mechanics in this project file.

If the operator explicitly selects a non-default workflow, reviewer, topology, or routing override,
that explicit choice wins for the current work.

[Project-only workflow constraints or routing overrides, if any.]

# Project Skills
Shared skills are managed globally through Skills Manager. List only project-specific local skills
that this project intentionally requires.

[List project-only skills or leave empty. Do not repeat global skill-framework guidance.]

# Local Rules
[Project-only conventions, invariants, scope boundaries, acceptance criteria, and protected paths.
Do not repeat global policy or harness workflow mechanics.]

# Memory
If this project has `memory/MEMORY.md`, use it for project history and handoff context. Verify it
against the current tree; it does not override this file, the active harness workflow, or the accepted
plan.
