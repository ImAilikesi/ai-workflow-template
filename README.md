# AI Workflow Template

A phase-gated engineering workflow for AI coding agents, as copyable instruction files.

This repository holds no application code and no runtime. It holds the workflow contracts, skills,
role presets, and instruction templates that you copy into a real project or into your global agent
configuration.

## The problem it solves

A capable coding agent given a large task tends to drift: it starts building before the goal is
agreed, claims work is finished without running the proof, reviews its own output, and quietly widens
scope. More context or a stronger model does not fix this on its own.

This template constrains the loop instead. Work moves through explicit phases with an accepted
contract and a stated acceptance proof. Implementation and review are separate roles, and the
reviewer is read-only, independent, and scope-bound. Nothing closes on the builder's own say-so.

It is a set of agreements, not a framework — there is nothing to import and nothing to run.

## Two provider packages

Pick the one that matches who orchestrates the work. A project installs one, not both.

| Package | Orchestrator | Use it when |
|---|---|---|
| [claude-hybrid/](claude-hybrid/) | Claude owns orchestration and implementation | Claude builds; Codex supplies independent review |
| [codex-native/](codex-native/) | Codex owns orchestration | Luna owns normal phases; Sol may delegate or execute directly in a critical phase |

Both define the same lifecycle — re-ground, state the acceptance proof, implement, verify, review,
close — but differ in topology and authority. `codex-native` has three native topologies: Luna owner/executor,
Sol owner plus Luna executor, and Sol owner/executor. The two provider surfaces remain independent.

## The workflow

A phase runs in a fixed order. The normative contract is
[`codex-native/WORKFLOW.md`](codex-native/WORKFLOW.md) or the `claude-hybrid` equivalent. The procedure
invoked at each lifecycle moment is the `phase-gate` skill.

1. **Re-ground** from the live tree and the accepted contract. Never from memory alone.
2. **State** the smallest acceptance proof and the named deterministic gates.
3. **Implement** with one active owner per changed file.
4. **Verify** with targeted checks while building, then run the required gates.
5. **Freeze** the candidate and stop writers.
6. **Readiness** — a pre-review pass confirms the candidate is actually reviewable.
7. **Review** by a fresh, independent, read-only reviewer.
8. **Close** — only the active phase owner issues `CLOSE`, `REOPEN`, or `BLOCK`.

If review keeps failing, the workflow has an explicit convergence escalation rather than an unbounded
retry loop.

### Roles

Role presets live in [`codex-native/roles/`](codex-native/roles/) as Codex agent `*.toml` files.

- **Luna** — the executor. Implements inside the accepted scope.
- **Luna Research Worker** — a read-only Luna/Max child that helps the active executor answer a bounded
  question. The executor may create up to five concurrent workers, and stops them before candidate freeze.
- **Terra** — the independent reviewer. Read-only and scope-bound, fresh context for the initial
  review, and the same lineage for targeted rechecks. Returns `PASS`, `CHANGES`, or `BLOCK`.
- **Sol** — the deep-reasoning lane, in three distinct forms:
  - **Sol Owner/Orchestrator** — owns orchestration for a critical phase.
  - **Sol Owner/Executor** — owns both functions in `codex-native`; Sol is the only writer.
  - **Sol Advisor** — a bounded advisory call for convergence or when the agent must ground itself
    by exploring the repository directly.

A reviewer never becomes the builder, and a review result never authorizes commit, deploy, spend,
secrets, or any external action.

### Sol Consult

`sol-consult` is an optional plugin that adds one more advisory lane: a supplied-context reasoning
pass in a dedicated ChatGPT Project, for decisions where the evidence is known and can be handed over
explicitly.

Invoking `$sol-consult` frames one decision, selects a bounded non-secret evidence set, then drives
the official Codex built-in browser to your `Sol Consult · <Project>` Project, confirms the intended
model and reasoning mode, uploads the evidence, submits, waits for the response, and returns it. The
agent then verifies every material repository claim against the live tree before acting on it.

It is advisory only. It holds no readiness, review, or closure authority, and it never substitutes
for Terra or for a formal convergence escalation. Details:
[`codex-native/plugin/plugins/sol-consult/README.md`](codex-native/plugin/plugins/sol-consult/README.md).

### Master Control Room

Everything above is phase-local. A project large enough to run many phases also needs somewhere the
master plan itself lives. That is the **Master Control Room** — an optional, advanced, project-level
principal you run as GPT-5.6 Sol/High in its own thread, labelled
`<Project> · Sol High · Master Control Room`. It is `codex-native` only.

It is not a role preset, not a subagent, and not a phase step. No phase needs it, and no phase can
start it. Only you invoke and direct it. It has five scopes:

1. **Plan formation** — build and maintain the master plan, before any phase exists.
2. **Authority resolution** — answer a project-level question the accepted plan governs.
3. **Cross-phase reconciliation** — reconcile state, dependencies, and sequencing across phases.
4. **Scoped integration sign-off** — sign off one bounded group of already-closed phases.
5. **Final project sign-off** — sign off the complete accepted master plan.

The authority boundary is the point. The Master Control Room reads any phase's artifacts as evidence,
but it never issues `READINESS`, a Terra `VERDICT`, or `CLOSE`/`REOPEN`/`BLOCK` — closure stays with
the phase owner. It talks to you, and to a phase owner only when you tell it to; phase roles never
call up into it. It may use Sol Consult on its own judgement, and never native Sol Advisor.

Sign-off is `PASS`, `CHANGES`, or `BLOCK`, plus a 0–100 quality score against a target of 90+. The
score is diagnostic: it is not a gate, and it moves independently of the verdict.

One lineage is meant to last a long time, because the history is worth keeping. It rotates on a
health check — reliability, re-groundability, efficiency — not on a turn, age, or token limit.

When Superpowers is installed, plan formation uses its planning skills, normally `brainstorming` then
`writing-plans`. Those skills shape the plan; they never widen this repository's approval,
version-control, or external-action rules.

## Prerequisites

- [Codex](https://developers.openai.com/codex) — required for the `codex-native` package, and for
  independent review in `claude-hybrid`.
- [Claude Code](https://claude.com/claude-code) — required for the `claude-hybrid` package.
- Python 3.9+ — only for the optional `sol-consult` fallback helper. It uses the standard library
  only.
- The Sol Consult plugin additionally needs a ChatGPT account with Projects, and Codex's built-in
  browser.

No package installs and no services. Nothing in this repository makes a network call on its own: the
files are instructions, and the one script here — the Sol Consult fallback helper — is standard-library
only and works entirely on local files.

Sol Consult itself is the exception worth understanding before you enable it. When you invoke it, your
agent drives *Codex's own browser* to upload the evidence files it selected to your ChatGPT Project.
That is a deliberate transfer of repository content to an external service, limited to the files chosen
for that consultation.

The skill instructs the agent that it must not upload `.env` files, credentials, keys, or secrets, and
the fallback helper refuses obviously sensitive filenames outright. Treat both as guardrails rather than
guarantees: like everything else here, the rule binds a compliant agent, and a secret sitting inside an
ordinary-looking source file can still be selected. Review what a consultation is about to send if the
repository holds sensitive material. The plugin is optional; skip it and this plugin initiates no such
transfer.

## Layout

```
claude-hybrid/            # Claude-orchestrated variant
  WORKFLOW.md             # the normative phase contract
  skills/                 # phase-gate + handoff skills (with references/)
  loops/                  # opt-in execution playbooks

codex-native/             # Codex-orchestrated variant
  WORKFLOW.md             # the normative phase contract
  skills/                 # phase-gate + handoff + master-control-room (with references/)
  roles/                  # Codex agent presets (*.toml)
  plugin/                 # sol-consult plugin, as a ready local marketplace

templates/                # instruction files to copy
  global-CLAUDE.md        # default working agreements, all repos (Claude)
  global-AGENTS.md        # default working agreements, all repos (Codex)
  project-CLAUDE.md       # per-project scaffold (Claude)
  project-AGENTS.md       # per-project scaffold (Codex)
```

## Install

Files are copied to their destination; there is no installer script. Install one provider package,
plus the matching global and project instruction files.

### Global — once per machine

| From | To |
|---|---|
| `templates/global-CLAUDE.md` | `~/.claude/CLAUDE.md` |
| `templates/global-AGENTS.md` | `~/.codex/AGENTS.md` |
| `codex-native/roles/*.toml` | `~/.codex/agents/` |

Back up any file you already have at those paths first — copying replaces it. Create the destination
directories if they do not exist yet:

```sh
mkdir -p ~/.claude ~/.codex/agents
```

The Codex role presets are global because they define reusable reviewer and executor agents. Install
them even when you run the `claude-hybrid` package, because that package calls Codex for independent
review.

The workflow assumes bounded subagent fan-out. Merge this into `~/.codex/config.toml` by hand rather
than copying a file over your existing config:

```toml
[agents]
max_threads = 10
max_depth = 5
```

These values provide headroom for a nested Luna executor and its five concurrent Luna research workers. Do
not raise them unless you accept broader concurrent work and can keep the review lineage legible.

### Global — the sol-consult plugin (optional)

```sh
mkdir -p ~/.codex/local-marketplaces
cp -R codex-native/plugin ~/.codex/local-marketplaces/sol-consult
codex plugin marketplace add ~/.codex/local-marketplaces/sol-consult
codex plugin add sol-consult@sol-consult-local
```

Install it from **one** location only. Registering a second marketplace carrying the same plugin, or
also copying its skill into `~/.codex/skills/`, produces two `sol-consult` registrations and ambiguous
routing. Never install this plugin per project.

Codex Desktop owns `~/.codex/config.toml` and rewrites it. If a running Desktop instance holds the
file in memory from before the install, its next write can drop the marketplace and plugin entries.
Restart Desktop after installing, then confirm `codex plugin list` still reports the plugin.

Then create a ChatGPT Project named `Sol Consult · <Project>` and paste in the instruction template at
`codex-native/plugin/plugins/sol-consult/skills/sol-consult/references/chatgpt-project-instructions.md`.

### Per project — Claude-hybrid

| From | To |
|---|---|
| `templates/project-CLAUDE.md` | `<project>/CLAUDE.md` |
| `claude-hybrid/WORKFLOW.md` | `<project>/.claude/WORKFLOW.md` |
| `claude-hybrid/skills/` | `<project>/.claude/skills/` |
| `claude-hybrid/loops/` | `<project>/.claude/loops/` *(optional)* |

### Per project — Codex-native

| From | To |
|---|---|
| `templates/project-AGENTS.md` | `<project>/AGENTS.md` |
| `codex-native/WORKFLOW.md` | `<project>/.codex/WORKFLOW.md` |
| `codex-native/skills/` | `<project>/.agents/skills/` |

After copying a project template, fill in its bracketed placeholders — purpose, stack, commands,
architecture, current status. An unfilled template gives the agent nothing to ground on.

## Using it

Once installed, the workflow is invoked by name, not by ceremony:

```text
# start a phase — the skill walks the gate sequence
$phase-gate

# get a second deep reasoning pass on one bounded decision
$sol-consult

# hand a verified checkpoint to a fresh session in the same phase
$handoff

# run the project-level master-plan authority lane (codex-native)
$master-control-room
```

`$master-control-room` belongs in its own dedicated Sol/High principal thread, not in an ordinary
phase task. Skip it entirely on a project that runs a handful of phases.

A typical phase reads like this:

```text
owner re-grounds from the live tree
  -> states the acceptance proof and named gates
  -> implements, running targeted checks while building
  -> freezes the candidate and stops writers
  -> readiness pass confirms the candidate is reviewable
  -> fresh Terra review returns PASS | CHANGES | BLOCK
  -> on PASS, the owner closes the phase
```

The rest is ordinary work. Nothing here auto-loads: loops are opt-in, Sol Consult is optional, and a
small task needs no phase lifecycle at all.

## Safety and authority boundaries

These are the load-bearing rules. Change them only deliberately.

- **Reviewers are read-only.** Terra never edits, commits, or becomes the builder. A `PASS` authorizes
  nothing by itself — not commit, deploy, spend, secrets, destructive actions, or external changes.
- **Closure belongs to the phase owner**, and only to the phase owner.
- **External and destructive actions are separately gated.** Broad phrasing such as "fix it" or "full
  access" is never authorization to delete data, publish, spend, use secrets, or act on an external
  account. See section 10 of `templates/global-AGENTS.md`.
- **One advisory lane per decision.** If a decision escalates from Sol Consult to Sol Advisor, the
  escalation *replaces* the earlier recommendation. Two advisory opinions are never counted as
  corroboration.
- **Sol Consult's browser transport is a narrow standing grant** — one site, one Project, non-secret
  evidence only. It does not extend to other recipients, other messages, secrets, or any spend or
  deploy.

## Uninstall

Delete what you copied; nothing else records state.

```sh
# per project
rm -rf <project>/.claude/WORKFLOW.md <project>/.claude/skills <project>/.claude/loops
rm -rf <project>/.codex/WORKFLOW.md <project>/.agents/skills

# global
rm -f ~/.codex/agents/{luna_executor,luna_research_worker,independent_reviewer,critical_reviewer,sol_advisor,volume_worker,pre_terra_readiness_reviewer}.toml

# sol-consult plugin
codex plugin remove sol-consult@sol-consult-local
codex plugin marketplace remove sol-consult-local
rm -rf ~/.codex/local-marketplaces/sol-consult
```

Restore your own `~/.claude/CLAUDE.md` and `~/.codex/AGENTS.md` from the backup you took at install.

## Limitations

- **Agent-dependent.** These are instructions, not enforcement. A model that ignores them is not
  constrained by them; nothing here can block a tool call.
- **Tied to current Claude and Codex behavior.** Role presets name specific models and reasoning
  modes, and the plugin format follows Codex's current conventions. Vendor changes will require edits.
- **Manual install with no versioning.** Copies drift from this source; there is no update command.
- **Sol Consult needs a human-created ChatGPT Project** and a browser session that is already
  authenticated. It falls back to a prepared packet when that is unavailable.
- **Overhead is real.** The full phase lifecycle is aimed at consequential changes. Using it for small
  work costs more than it returns.
- **Written in ASD-STE100 Simplified Technical English**, which reads as terse by design.

## Contributing

Issues and pull requests are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first — the short
version is that changes should be minimal and surgical, and any change to workflow authority or review
semantics needs an explicit rationale.

For security-sensitive reports, see [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE).
