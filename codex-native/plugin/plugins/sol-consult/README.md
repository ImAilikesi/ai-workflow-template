# Sol Consult plugin

A skills-only Codex/ChatGPT plugin for the external Sol Consult advisory lane.

## What it does

- Adds the `$sol-consult` workflow skill.
- Runs the consultation automatically through the official Codex built-in browser: it opens the
  repository's ChatGPT Project, confirms GPT-5.6 Sol / High, uploads the selected evidence, submits the
  prompt, waits for the response, and returns it to Codex.
- Standardizes context selection, authority, escalation, and response handling.
- Provides the ChatGPT Project instruction template.
- Keeps `prepare_consult.py` as the fallback packet for when browser transport is blocked.

It adds **no** dependency of its own: no MCP server, no API model call, no Playwright, no external
browser automation, no scraper, no polling service, and no state database. Transport is Codex's own
browser capability, and the reasoning surface is the user's dedicated ChatGPT Project in standard Chat
using GPT-5.6 Sol / High.

## Per-repository ChatGPT Project

Create one project named `Sol Consult · <Project>`.

Paste `skills/sol-consult/references/chatgpt-project-instructions.md` into the Project instructions and
replace `<PROJECT>`.

Keep these core files in the Project when they exist and are relevant:

1. global `AGENTS.md`;
2. project `AGENTS.md`;
3. `.codex/WORKFLOW.md`;
4. `.agents/skills/phase-gate/SKILL.md`;
5. relevant `CONTEXT.md`;
6. `memory/MEMORY.md`;
7. current accepted plan / phase contract.

Refresh a core file when it changes materially. For a consultation that depends on exact current
wording and freshness is uncertain, attach the fresh local copy to that consultation even if an older
copy exists at Project level.

## Install

This plugin ships inside a ready-made local marketplace, so there is nothing to scaffold — do not
rebuild it with `$plugin-creator`. Two files matter, and they sit at different roots:

- `.codex-plugin/plugin.json` — this plugin's manifest, relative to this plugin directory.
- `.agents/plugins/marketplace.json` — the marketplace entry, relative to `codex-native/plugin/`,
  which is the directory you copy to a marketplace root.

The manifest passes the Codex plugin validator:

```sh
python3 ~/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py <path-to>/plugins/sol-consult
```

Follow the install commands in the repository's root `README.md`, under
**Install → Global — the sol-consult plugin**. Install it from one location only.

Then test in a new Codex conversation with `$sol-consult` and a non-trivial bounded design question.
