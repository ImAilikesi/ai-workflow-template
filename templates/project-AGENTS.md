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
Use only the workflow for the harness that is running the current session. Several harness packages
may coexist in one repository; their workflow mechanics must not be combined.

- Codex: `.codex/WORKFLOW.md`; workflow skills are `.agents/skills/phase-gate/` and
  `.agents/skills/handoff/`.
- DSH: `.dsh/WORKFLOW.md`; workflow skills are `.dsh/skills/dsh-phase-gate/` and
  `.dsh/skills/dsh-handoff/`.
- Cursor: `.cursor/WORKFLOW.md`; workflow skills are `.cursor/skills/cursor-phase-gate/` and
  `.cursor/skills/cursor-handoff/`; custom roles are `.cursor/agents/`.
- Pi: `.pi/WORKFLOW.md`; workflow skills are `.pi/skills/pi-phase-gate/` and
  `.pi/skills/pi-handoff/`.
- Command Code: `.commandcode/WORKFLOW.md`; workflow skills are
  `.commandcode/skills/commandcode-phase-gate/` and `.commandcode/skills/commandcode-handoff/`;
  custom roles are `.commandcode/agents/`.
- OpenCode: `.opencode/WORKFLOW.md`; workflow skills are `.opencode/skills/opencode-phase-gate/` and
  `.opencode/skills/opencode-handoff/`; custom roles are `.opencode/agents/`.

If the active harness has no installed workflow package, use the simplest execution path allowed by
its global instructions and this file.

[Project-only workflow constraints or routing overrides, if any. Do not restate a harness workflow
protocol here.]

# Project Skills
Harness-specific workflow skills live in the native roots listed above. Shared project skills may
live in `.agents/skills/` only when they are intentionally portable across the harnesses that discover
that directory.

[List project-only skills or leave empty. Do not repeat global skill-framework guidance.]

# Local Rules
[Project-only conventions, invariants, scope boundaries, acceptance criteria, and protected paths.
Do not repeat global policy or harness workflow mechanics.]

# Memory
If this project has `memory/MEMORY.md`, use it for project history and handoff context. Verify it
against the current tree; it does not override this file, the active harness workflow, or the accepted
plan.
