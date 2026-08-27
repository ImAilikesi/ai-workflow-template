# AI Workflow Template

A lean public-safe control room for AI coding-harness instructions, workflows, and shared project instruction templates.

## Architecture

```text
live/                       # exact intended global live state
├── codex/
│   ├── AGENTS.md
│   ├── WORKFLOW.md
│   └── agents/
├── opencode/
│   ├── AGENTS.md
│   ├── WORKFLOW.md
│   └── agents/
├── claude/
│   └── CLAUDE.md
├── dsh/
│   └── AGENTS.md
├── pi/
│   └── AGENTS.md
├── omp/
│   ├── AGENTS.md
│   └── RULES.md
└── command-code/
    ├── AGENTS.md
    └── agents/
        └── independent-reviewer.md

templates/                  # manual project instruction templates
├── project-AGENTS.md
└── project-CLAUDE.md

inactive/                   # retained but not live or synced
└── codex/
    ├── phase-gate/
    ├── handoff/
    └── master-control-room-v1/

sync.sh
```

### `live/`

`live/` is the desired public-safe global configuration for harnesses actually configured on the current machine. `sync.sh` mirrors these files to their normal harness locations.

Harnesses still read their normal global paths. There are no symlinks and no runtime dependency on this repository.

Tracked global roots:

- Codex: `~/.codex/`
- OpenCode: `~/.config/opencode/`
- Claude: `~/.claude/`
- DSH: `${DSH_HOME:-~/.dsh}`
- Pi: `~/.pi/agent/`
- OMP: `~/.omp/agent/`
- Command Code: `~/.commandcode/`

Pi and OMP can relocate their agent directory with runtime/profile configuration. `sync.sh` intentionally targets the default native roots so two installed runtimes cannot silently collide through one shared override path.

### `templates/`

`templates/` contains shared project instruction files only. It does not contain harness packages or harness-specific workflow installs.

For AGENTS.md-compatible harnesses:

```bash
cp templates/project-AGENTS.md /path/to/project/AGENTS.md
```

For Claude:

```bash
cp templates/project-CLAUDE.md /path/to/project/CLAUDE.md
```

Then fill the bracketed project fields. The active harness's global instructions/workflow remain authoritative for orchestration and review. Project templates contain project facts, constraints, commands, status, and local overrides only.

### `inactive/`

`inactive/` is a curated standby library for public-safe configuration or workflow assets that are intentionally not used live but may be useful again. It is never synced and is never normative.

Do not use it as a dump for old history. Git already stores history; keep only deliberately retained assets here.

## Codex workflow

`live/codex/WORKFLOW.md` defines exactly three standard topologies.

### 1. Native — default

```text
Sol parent
→ Luna executor
→ final Terra review
→ same Sol final verification
```

This is the default substantial-work workflow.

### 2. Sol + GLM

```text
Sol parent
→ GLM-5.3-Flash executor
→ isolated GLM reviewer
→ same Sol final verification
```

Terra is added only for a genuinely critical final audit.

### 3. Sol-only

```text
Sol owner/orchestrator/executor
→ final Terra review
→ same Sol final verification
```

Use for the hardest or most consequential work where Sol should implement directly.

### Shared bounded helpers

Two helpers are shared across the Codex workflows:

- `luna_research_worker` — bounded read-only research/question lane;
- `volume_worker` — bounded disjoint implementation slice.

Both are **optional, never mandatory**. They are recommended only when they materially reduce serial work, add useful evidence, or isolate a genuinely disjoint slice. A workflow must remain valid without them.

Other configured Codex roles remain installed, but they are not mandatory stages in the three standard workflows.

### Subagent safety

Native subagents must map to roles that are explicitly configured for the active harness with verifiable model/provider/permission boundaries. Do not invent ad-hoc roles, guess role names, silently substitute models/providers, or spawn an unconfigured generic child unless the operator explicitly overrides this restriction.

## Codex thread model

A substantial task has one persistent Sol parent thread. Delegated executor and reviewer lineages sit below it; Sol is never spawned as a peer subagent beside the executor.

```text
optional MCR principal
        ↓
Sol phase parent
   ├── primary executor
   │   ├── bounded research
   │   └── bounded volume work
   └── independent reviewer
```

MCR is optional project-level authority for multi-phase/multi-workstream projects. It stays in its own long-lived principal thread and never carries ordinary executor/reviewer context.

Bias toward continuity: reuse the same Sol parent, executor lineage, and reviewer lineage while they remain reliable. Do not rotate because of age, token count, compaction, or review-round count alone.

## Other harnesses

OpenCode, DSH, Pi, OMP, Command Code, and Claude use the same lean principle: one active parent owns orchestration and execution, with independent review only when it materially helps or the operator selects it.

```text
primary parent = owner + orchestrator + executor
→ optional independent read-only review
→ same parent final verification/signoff
```

- Pi tracks only its native global `AGENTS.md`; no replacement `SYSTEM.md` is shipped.
- OMP tracks native `AGENTS.md` plus a very small sticky `RULES.md`; its built-in reviewer is preferred over a duplicate custom reviewer.
- Command Code tracks global `AGENTS.md` plus one read-only personal `independent-reviewer` agent.
- Provider/account settings, model catalogs, credentials, MCP, prompts, hooks, extensions, and other runtime state stay outside this repository.

The same configured-role restriction applies: no ad-hoc or unconfigured native subagents unless the operator explicitly overrides it.

## Handoff and phase gating

The repository no longer ships its custom handoff or phase-gate skills as active configuration.

- Cross-session transfer uses the globally managed `handoff` skill where available.
- Useful phase-gate mechanics — bounded scope, verification, candidate freeze, independent review, targeted recheck, and final signoff — live directly in concise global workflow/instruction files.
- Retired custom phase-gate/handoff assets and the previous detailed MCR implementation are retained under `inactive/codex/` for future reference.

## Sync

```bash
./sync.sh status
./sync.sh apply
./sync.sh pull
```

- `status` reports missing or drifting live files.
- `apply` copies repository live state into normal global harness locations.
- `pull` copies current global harness files back into `live/`.

`sync.sh` only handles tracked files under `live/`. It never touches `templates/` or `inactive/`.

Review changes before `apply`.

## Scope boundary

Skills are managed separately by Skills Manager. Credentials, provider/account configuration, generated router files, memories, caches, full machine configuration, and private project data do not belong here.

Do not commit API keys, tokens, `.env`, private URLs, account state, generated authenticated router files, or machine-specific secrets.

MIT licensed.
