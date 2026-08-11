# Provider
Claude instructions for the AI Workflow Template repository itself.

Note: this repository *ships* workflow templates. It does not *run* the hybrid phase workflow on
itself. Do not install `.claude/`, `.codex/`, or `.agents/` here — those are install destinations in
consuming projects, not part of this tree.

# Project
Source-of-truth templates for a phase-gated AI engineering workflow across Claude and Codex.
Content only: instruction files, workflow contracts, skills, role presets, and execution loops.

# Stack
Markdown, YAML, TOML, and JSON Schema. No build, no runtime, no dependencies.

# Commands
No test, build, or lint tooling. Verification is structural — see Local Rules.

# Architecture
- `claude-hybrid/` — Claude-orchestrated variant: `WORKFLOW.md`, `skills/`, `loops/`.
- `codex-native/` — Codex-orchestrated variant: `WORKFLOW.md`, `skills/`, `roles/*.toml`, `plugin/`.
- `templates/` — global and per-project `CLAUDE.md` / `AGENTS.md` files to copy.
- `README.md` — the public entry point: what each file is and where it installs.
- `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` — public project files (MIT).

# External Dependencies
Install destinations only: `~/.claude/CLAUDE.md`, `~/.codex/AGENTS.md`, `~/.codex/agents/`, and the
`.claude/` `.codex/` `.agents/` directories of consuming projects. Nothing here reads them back.

# Current Status
Two provider packages plus `templates/`. Each package is the single source for its provider; there
are no installed copies inside this repository.

# Workflow
This repository is the source of `claude-hybrid/WORKFLOW.md` and `codex-native/WORKFLOW.md`. Those
files are content to edit, not a contract that governs work here. Ordinary edits to this repo need
no phase lifecycle.

Keep the Claude and Codex surfaces independent. A change to a shared idea must be applied to each
provider's file in that provider's own terms — never by copying one over the other.

# Project Skills
None. The `skills/` directories are shipped artifacts, not skills active in this repository.

# Local Rules
- **No duplicated content within a surface.** A file must not exist twice inside one package, and a
  package file must never have an "installed copy" elsewhere in this repository. That source/copy
  split was the specific problem the current structure fixed.
  The two provider packages are the exception: each installs standalone, so genuinely
  provider-neutral reference material may appear in both. Today that is only
  `skills/handoff/references/wf10-known-limitations.md`. Keep such files in sync by hand, and prefer
  a provider-specific version whenever the content can differ.
- **Provider isolation.** `claude-hybrid/` never references `codex-native/` paths, and the reverse.
- **Paths inside a package are consumer paths.** A reference to `.claude/WORKFLOW.md` inside
  `claude-hybrid/` describes where the file lands in a consuming project. It is correct as written —
  do not rewrite it to match this repository's layout.
- **Templates stay unfilled.** Placeholders in `templates/` are `[bracketed]` on purpose. Never
  fill them with example project data.
- **Verification is structural.** Before claiming a change is complete: no dangling relative links,
  no orphaned files, `README.md` install tables match the real tree.
- Write instruction content in ASD-STE100 Simplified Technical English.

# Memory
No `memory/` directory. `.archive/` holds historical evidence, is gitignored, and is not a source of
truth — do not treat it as current.

# Version Control

- Do not commit or push unless explicitly authorized.
- Never touch `.env`, secrets, credentials, or private data; check `.gitignore` before creating files.
