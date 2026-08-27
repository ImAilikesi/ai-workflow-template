# AI Workflow Template

Lean control room for public-safe AI harness instructions.

## What lives here

```text
live/
  codex/
    AGENTS.md
    WORKFLOW.md
    agents/
      glm_executor.toml
      glm_reviewer.toml
      critical_reviewer.toml

  opencode/
    AGENTS.md
    WORKFLOW.md
    agents/
      worker.md
      reviewer.md

  claude/
    CLAUDE.md

  dsh/
    AGENTS.md

templates/
  project/
    AGENTS.md
    CLAUDE.md

sync.sh
```

`live/` is curated desired global state, not a dump of harness directories. It excludes skills, memories, caches, plans, provider/account configuration, secrets, and generated Codex Router model files.

Harnesses continue to read their normal global paths. Nothing reads configuration from this repository at runtime and no symlinks are used.

## Workflow

The main Codex workflow is intentionally small:

```text
same Sol owner
  -> GLM-5.3-Flash executor
  -> isolated GLM-5.3-Flash reviewer
  -> same Sol owner final verification/signoff
```

For critical money, security, release, consequential data integrity, trading truth, major architecture, or explicit critical-review work, an optional Terra/max review runs after GLM review and before the same Sol owner signs off.

OpenCode stays simpler: one primary agent by default, optional bounded workers, and one isolated reviewer for substantial work. It has no phase-gate lifecycle.

## Sync

```sh
./sync.sh status
./sync.sh apply
./sync.sh pull
```

- `status` compares tracked repo files with their native global locations.
- `apply` copies repo state to the harness directories.
- `pull` copies the current installed versions of tracked files back into the repo checkout.

`sync.sh` only touches files already tracked under the supported live roots. It does not discover or import other files.

## Project templates

Project instructions are manual by design. Copy the appropriate starter from `templates/project/` into a repository and fill the bracketed project facts. Do not embed global workflow protocol in project files.

## Safety

Never commit API keys, tokens, provider/account configuration, private project data, `.env`, or machine-specific secrets.

## License

MIT.
