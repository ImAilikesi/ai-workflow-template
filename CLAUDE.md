# Provider
Claude instructions for the AI Workflow Template repository itself.

Note: this repository *ships* workflow templates. It does not *run* any shipped phase workflow on
itself. Do not install `.claude/`, `.codex/`, `.agents/`, `.dsh/`, `.cursor/`, or `.pi/` here — those
are install destinations in consuming projects, not part of this tree.

# Project
Source-of-truth templates for a phase-gated AI engineering workflow across Claude, Codex, DSH,
Cursor, and Pi. Content only: instruction files, workflow contracts, skills, role presets, execution
loops, and harness-specific role prompts.

# Stack
Markdown, YAML, TOML, and JSON Schema. No build, no runtime, no dependencies.

# Commands
No test, build, or lint tooling. Verification is structural — see Local Rules.

# Architecture
- `claude-hybrid/` — Claude-orchestrated variant: `WORKFLOW.md`, `skills/`, `loops/`.
- `codex-native/` — Codex-orchestrated variant: `WORKFLOW.md`, `skills/`, `roles/*.toml`, `plugin/`.
- `dsh-native/` — DSH-orchestrated variant: `WORKFLOW.md`, namespaced `skills/`.
- `cursor-native/` — Cursor-orchestrated variant: `WORKFLOW.md`, namespaced `skills/`, `agents/`.
- `pi-native/` — Pi-orchestrated variant: `WORKFLOW.md`, namespaced `skills/`.
- `templates/` — harness-specific global instructions plus shared project `AGENTS.md` and Claude
  project `CLAUDE.md` templates.
- `README.md` — the public entry point: what each file is and where it installs.
- `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` — public project files (MIT).

# External Dependencies
Install destinations only: `~/.claude/CLAUDE.md`, `~/.codex/AGENTS.md`, `~/.codex/agents/`,
`$DSH_HOME/AGENTS.md` (default `~/.dsh/AGENTS.md`), `~/.pi/agent/AGENTS.md`, Cursor User Rules, and the
harness-specific project directories in consuming repositories. Nothing here reads them back.

# Current Status
Five harness packages plus `templates/`. Each harness package is the single source for its native
workflow surface; there are no installed copies inside this repository.

# Workflow
This repository is the source of `claude-hybrid/WORKFLOW.md`, `codex-native/WORKFLOW.md`,
`dsh-native/WORKFLOW.md`, `cursor-native/WORKFLOW.md`, and `pi-native/WORKFLOW.md`. Those files are
content to edit, not contracts that govern work in this repository. Ordinary edits here need no phase
lifecycle.

Keep harness surfaces independent. A shared lifecycle idea must be expressed in each harness's own
native terms. Do not copy one harness's topology, tool names, model assumptions, or install paths into
another.

# Project Skills
None. The `skills/` directories are shipped artifacts, not skills active in this repository.

# Local Rules
- **No duplicated content within a surface.** A file must not exist twice inside one harness package,
  and a package file must never have an "installed copy" elsewhere in this repository.
- **Harness isolation.** No harness package references another harness package's source paths. Shared
  project facts belong in `templates/project-AGENTS.md`; Claude keeps its separate
  `templates/project-CLAUDE.md` surface.
- **Global template naming is intentional.** `templates/global-AGENTS.md` is the Codex global
  `AGENTS.md` template and keeps that filename. DSH and Pi use their separately named global AGENTS
  templates; Cursor uses a User Rules template.
- **Namespaced new workflow skills.** DSH, Cursor, and Pi workflow skill names include the harness
  prefix so projects can contain several harness packages without same-name skill collisions. Do not
  rename the existing Codex skills as part of unrelated work.
- **Paths inside a package are consumer paths.** A reference to `.claude/WORKFLOW.md` inside
  `claude-hybrid/` describes where the file lands in a consuming project. Do not rewrite it to match
  this repository's layout.
- **Templates stay unfilled.** Placeholders in `templates/` are `[bracketed]` on purpose. Never fill
  them with example project data.
- **Verification is structural.** Before claiming a change is complete: no dangling relative links,
  no orphaned files, no duplicate workflow skill identities across co-installable new packages, and
  `README.md` install tables match the real tree.
- Write instruction content in ASD-STE100 Simplified Technical English.

# Memory
No `memory/` directory. `.archive/` holds historical evidence, is gitignored, and is not a source of
truth — do not treat it as current.

# Version Control

- Do not commit or push unless explicitly authorized.
- Never touch `.env`, secrets, credentials, or private data; check `.gitignore` before creating files.
