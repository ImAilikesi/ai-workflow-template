# Provider
Claude-hybrid project instructions. This file contains project-specific rules only.

# Project
[What this project does — 2 lines max]

# Stack
[Languages, frameworks, key libraries, entry points]

# Commands
[Canonical setup, run, test, lint, type-check, build, and other verification commands]

# Architecture
[Key folders/components and what each owns — 1 line each]

# External Dependencies
[External services, APIs, CLIs, data stores, config surfaces, related repositories, or Codex review surfaces]

# Current Status
[One short statement: current phase/workstream, what is working, and the main unresolved item]

# Workflow
The detailed hybrid workflow lives in `.claude/WORKFLOW.md`. It owns provider boundaries, role
topology, phase gates, review, continuation, and closure.

Keep Claude and Codex provider surfaces independent. Use the workflow and its referenced skills
for cross-provider execution; do not duplicate its mechanics here.

[Project-only hybrid workflow constraints or routing overrides, if any.]

# Project Skills
[List project-specific Claude/Superpowers skills, loops, or playbooks only when this project uses them.
Keep optional playbooks opt-in and define their stop condition before use.]

# Local Rules
[Project-only conventions, invariants, scope boundaries, acceptance criteria, and protected paths.
Do not repeat global policy or hybrid workflow mechanics.]

# Memory
If this project has `memory/MEMORY.md`, use it for project history and handoff context. Verify it
against the current tree; it does not override this file, the active workflow, or the accepted plan.

# Version Control

- Do not commit or push unless explicitly authorized.
- Never touch `.env`, secrets, credentials, or private data; check `.gitignore` before creating files.
