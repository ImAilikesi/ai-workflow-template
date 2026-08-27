# AI Workflow Template

A lean public-safe control room for AI coding-harness instructions and copy-ready project workflow templates.

## Structure

```text
live/
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
└── dsh/
    └── AGENTS.md

templates/
├── codex/
├── opencode/
├── claude/
├── dsh/
├── pi/
├── command-code/
└── cursor/
```

`live/` is the intended global editable state for harnesses actually configured on the current machine. `sync.sh` mirrors those files to their normal harness locations. It does not use symlinks and it does not make any harness read this repository at runtime.

`templates/` contains complete project folders for manual copy/paste. Project templates are manual by design.

Skills are managed separately by Skills Manager. Credentials, provider/account configuration, generated router files, memories, caches, and private data do not belong here.

## Codex workflows

`live/codex/WORKFLOW.md` defines exactly three standard topologies:

1. **Sol + GLM — default:** same Sol owner -> GLM executor -> isolated GLM reviewer -> same Sol final verification. Terra is added only for critical final audit.
2. **Sol-only — hardest work:** same Sol owner/orchestrator/executor -> one final Terra review -> same Sol signoff.
3. **Sol + Luna — conservative native path:** same Sol owner -> Luna executor -> one final Terra review -> same Sol signoff.

Existing Codex supporting roles remain available but are optional, not mandatory workflow stages.

## Other harnesses

Cursor, Command Code, Pi, DSH, Claude, and OpenCode project templates use one model-agnostic workflow:

`active model = owner + orchestrator + executor -> operator-selected independent reviewer -> same owner final signoff`

The operator chooses both models. The template does not pin a provider or reviewer model.

## Handoff and phase gating

The repository no longer ships its own handoff or phase-gate skills.

- Cross-session handoff uses the globally managed `handoff` skill.
- The useful phase-gate ideas — bounded scope, verification, candidate freeze, independent review, targeted recheck, and final signoff — live directly in the concise `WORKFLOW.md` files.

## Sync

```bash
./sync.sh status
./sync.sh apply
./sync.sh pull
```

- `status` reports missing or drifting live files.
- `apply` copies repository live state into normal global harness locations.
- `pull` copies current global harness files back into `live/`.

Review changes before `apply`. The script only handles tracked public-safe surfaces under `live/`.

## Project templates

Copy one harness folder into a project root, preserving hidden directories. Example:

```bash
cp -R templates/codex/. /path/to/project/
```

Then fill the bracketed project fields in `AGENTS.md` or `CLAUDE.md`.

## Public-safe boundary

Do not commit API keys, tokens, `.env`, private project data, full provider configuration, account state, generated authenticated router files, memories, caches, or machine-specific secrets.

MIT licensed.
