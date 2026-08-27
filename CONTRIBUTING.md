# Contributing

Keep changes focused on the repository's three responsibilities:

1. public-safe global harness instruction/workflow surfaces under `live/`;
2. manual copy-ready project bundles under `templates/<harness>/`;
3. curated non-live public-safe assets under `inactive/`.

Shared skills belong in Skills Manager, not here.

## In scope

- Updating a tracked live instruction, workflow, or hand-maintained role file.
- Adding a verified editable global surface for a harness that is actually used.
- Improving a manual project template.
- Improving one of the three Codex workflows or the generic non-Codex workflow.
- Retaining a deliberately selected non-live asset under `inactive/`.
- Fixing `sync.sh` behavior.
- Improving documentation for the control-room structure.

## Out of scope

- API keys, tokens, provider credentials, private data, `.env`, or full machine/account configuration.
- Generated Codex Router model files.
- Symlink-based installs or runtime dependencies on this repository.
- Shared skill libraries.
- Dumping broad historical trees into `inactive/`; Git history already stores history.
- Reintroducing separate live phase-gate, handoff, ledger, or mandatory readiness packages without a concrete failure that requires them.
- Deleting configured live role definitions without explicit operator authorization.
- Infrastructure that does not directly help maintain these surfaces.

## Pull requests

Keep one coherent change per PR. Verify the real global path before adding a live surface. Use portable paths such as `~/.codex/...`; never commit machine-specific private values.

## Verification

Before landing a change:

- confirm `README.md` matches the tree;
- run `./sync.sh status` when live mappings changed;
- run `bash -n sync.sh` when the script changed;
- parse changed TOML or other structured files;
- confirm no secret/private value was added;
- confirm project templates contain only portable placeholders;
- confirm `inactive/` content is not treated as current authority or synced by `sync.sh`.

## License

Contributions are licensed under the [MIT License](LICENSE).
