# Contributing

Thanks for taking an interest. This repository is small and deliberately conservative, so please read
this before opening a pull request.

## What this repository is

Instruction content only — workflow contracts, skills, role presets, and templates. There is no build,
no runtime, and no dependencies. Almost every change is a change to prose that an AI agent will treat
as normative.

That makes wording load-bearing. A sentence that reads as a suggestion instead of a rule changes agent
behavior.

## Scope

**In scope**

- Correcting a rule that is ambiguous, contradictory, or wrong in practice.
- Fixing stale installation steps, broken links, or drift between a package and its documentation.
- Improving clarity without changing meaning.
- Support for a new Claude or Codex capability that the current contract cannot express.

**Out of scope**

- New workflow gates, roles, counters, or lifecycle stages. The lifecycle is intentionally minimal;
  additions need a concrete failure that the current contract cannot handle.
- Merging the Claude and Codex surfaces. They are independent on purpose — a change to a shared idea
  is applied to each provider's file in that provider's own terms, never by copying one over the other.
- Adding infrastructure (CI, bots, badges, generators) because open-source repositories often have it.
- Filling in the bracketed placeholders in `templates/`. They are unfilled on purpose.

## Expectations

**Issues.** Say what you expected, what happened, and which package and file you were using. For a
behavioral report, include the agent and model, since these are instructions and behavior varies.

**Pull requests.** Keep them minimal and surgical:

- One coherent change per PR. No drive-by reformatting or unrelated refactors.
- Touch only the files the change requires, and match the surrounding style.
- Explain *why* in the description. For anything touching authority, review, or closure semantics,
  state the concrete failure it fixes — those rules exist to stop specific failure modes, and changing
  them without a reason is the main way this workflow degrades.
- Write instruction content in ASD-STE100 Simplified Technical English, like the surrounding text.
- If a change applies to both provider packages, update both, in each package's own terms.

## Testing

Verification here is structural rather than a test suite. Before opening a PR, confirm:

- relative links resolve;
- the `README.md` install tables still match the real tree;
- no file exists twice inside one package, and no package file has an "installed copy" elsewhere;
- `claude-hybrid/` contains no `codex-native/` paths, and the reverse;
- JSON, TOML, and YAML files parse;
- `python3 -m py_compile` passes for any changed script.

Paths such as `.codex/WORKFLOW.md` written *inside* a package describe where the file lands in a
consuming project. They are correct as written — do not rewrite them to match this repository's layout.

## No secrets, no personal data

Never include API keys, tokens, credentials, `.env` contents, or private URLs — in files, examples, or
commit messages.

Use portable placeholders (`~/.codex/...`, `<project>/...`, `<repo>/...`) rather than absolute paths
from your own machine. The exception is a path that is deliberately part of a test for absolute-path
behavior.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
