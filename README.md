# AI Workflow Template

A phase-gated engineering workflow for AI coding agents, shipped as copyable instruction files.

This repository holds no application runtime. It contains workflow contracts, skills, role prompts,
role presets, and instruction templates that you copy into a real project or into a harness's global
configuration.

## The problem it solves

A capable coding agent given a large task can drift: it starts building before the goal is agreed,
claims work is finished without running the proof, reviews its own output, or quietly widens scope.
More context or a stronger model does not fix this on its own.

This template constrains the loop instead. Work moves through an accepted contract and a stated
acceptance proof. Implementation and independent review are separate responsibilities, and nothing
closes on the builder's own say-so.

It is a set of agreements, not a framework. There is nothing to import and nothing to run from this
repository itself.

## Seven harness packages

Install the package for the harness that owns the current session. Several packages may coexist in the
same consuming repository because their workflow files, workflow skill names, and native role surfaces
are isolated.

| Package | Orchestrator | Native shape |
|---|---|---|
| [claude-hybrid/](claude-hybrid/) | Claude | Claude implements; Codex supplies independent review |
| [codex-native/](codex-native/) | Codex | Native Codex owners, executors, reviewers, workers, and optional Sol lanes |
| [dsh-native/](dsh-native/) | DeepSeek Harness (DSH) | DSH parent plus optional inherited-model subagents/workflows |
| [cursor-native/](cursor-native/) | Cursor | Cursor parent plus custom inherited-model read-only subagents |
| [pi-native/](pi-native/) | Pi | Pi owner plus same-model isolated review sessions; child extensions are optional |
| [commandcode-native/](commandcode-native/) | Command Code | Command Code parent plus custom read-only agents and native skills |
| [opencode-native/](opencode-native/) | OpenCode | OpenCode primary agent plus inherited-model read-only subagents |

All seven implement the same abstract lifecycle in harness-native terms:

`GROUND -> CONTRACT -> IMPLEMENT -> VERIFY -> FREEZE -> READINESS -> REVIEW -> CLOSE`

Do not combine topology or tool mechanics from two harnesses in one active session. The root project
facts are shared; execution mechanics are not.

## Shared project instructions

`templates/project-AGENTS.md` is the single project scaffold for Codex, DSH, Cursor, Pi, Command Code,
and OpenCode. Copy it once to `<project>/AGENTS.md`, then fill its placeholders with real project
facts.

That shared file routes each active harness to its own workflow:

| Harness | Workflow | Workflow skills / roles |
|---|---|---|
| Codex | `.codex/WORKFLOW.md` | `.agents/skills/phase-gate/`, `.agents/skills/handoff/`, global Codex role presets |
| DSH | `.dsh/WORKFLOW.md` | `.dsh/skills/dsh-phase-gate/`, `.dsh/skills/dsh-handoff/` |
| Cursor | `.cursor/WORKFLOW.md` | `.cursor/skills/cursor-phase-gate/`, `.cursor/skills/cursor-handoff/`, `.cursor/agents/` |
| Pi | `.pi/WORKFLOW.md` | `.pi/skills/pi-phase-gate/`, `.pi/skills/pi-handoff/` |
| Command Code | `.commandcode/WORKFLOW.md` | `.commandcode/skills/commandcode-phase-gate/`, `.commandcode/skills/commandcode-handoff/`, `.commandcode/agents/` |
| OpenCode | `.opencode/WORKFLOW.md` | `.opencode/skills/opencode-phase-gate/`, `.opencode/skills/opencode-handoff/`, `.opencode/agents/` |

Claude keeps `templates/project-CLAUDE.md` because Claude Code uses its own project instruction
surface.

The DSH, Cursor, Pi, Command Code, and OpenCode workflow skills are namespaced deliberately. Several
harnesses discover compatibility skill roots, and duplicate same-name skills can collide or be
surfaced separately. Namespacing prevents a co-installed Codex `phase-gate` or `handoff` from
colliding with another harness's workflow skill.

## The workflow

A phase uses this order:

1. **Re-ground** from the live tree and the accepted contract.
2. **State** the smallest acceptance proof and named deterministic gates.
3. **Implement** with one active owner per changed file.
4. **Verify** with targeted checks while building, then run required gates.
5. **Freeze** the candidate and stop writers.
6. **Readiness** confirms the candidate is actually reviewable.
7. **Review** by an isolated, read-only reviewer.
8. **Remediate** material findings and return through a targeted review recheck.
9. **Close** only after the reviewed candidate is still current and its required gates remain green.

A review verdict never authorizes commit, push, deploy, spend, secret use, destructive actions, or
other external changes.

### Codex-native

`codex-native` keeps its existing native topology. Luna owns normal phases. Sol can own critical
phases as orchestrator or direct executor. Terra supplies independent review. Bounded Luna research
workers can help the active executor, and the optional Sol Consult and Master Control Room lanes keep
their existing authority boundaries.

Role presets live in [`codex-native/roles/`](codex-native/roles/). The normative contract is
[`codex-native/WORKFLOW.md`](codex-native/WORKFLOW.md).

### Claude-hybrid

`claude-hybrid` keeps Claude as the implementation/orchestration surface and uses Codex for independent
review. Its normative contract is [`claude-hybrid/WORKFLOW.md`](claude-hybrid/WORKFLOW.md).

### DSH-native

DSH uses one active parent as phase owner/executor. Native DSH subagents can provide bounded research,
readiness, and independent review. DSH's `workflow` capability is reserved for genuine independent
fan-out rather than routine one-child delegation.

No shipped DSH workflow file pins a provider or model. DSH in-process children inherit the active
parent provider and model when no override is supplied. If the configured child transport does not
preserve that behavior, the workflow requires a same-model configured route or a visible-session
fallback rather than a silent model switch.

The normative contract is [`dsh-native/WORKFLOW.md`](dsh-native/WORKFLOW.md).

### Cursor-native

Cursor uses one Agent conversation as owner/executor plus project custom subagents for bounded
research, readiness, normal independent review, and critical independent review. Every shipped custom
subagent uses `model: inherit`.

Cursor subagent invocations can be fresh isolated contexts, so the parent keeps the logical review
lineage explicitly: current round, findings, resolved findings, candidate identity, and targeted
recheck scope. A fresh subagent context never means "run another full R1".

The normative contract is [`cursor-native/WORKFLOW.md`](cursor-native/WORKFLOW.md).

### Pi-native

Pi intentionally has no built-in subagent system. The base workflow therefore uses one Pi owner
session, one same-model readiness session, and one fresh same-model independent review session. The
review session is reused for targeted rechecks.

No shipped Pi workflow file pins a model. Optional trusted Pi child-agent extensions may automate
those roles only when they preserve parent-model inheritance, read-only review authority, and review
lineage. The base package does not depend on an extension.

The normative contract is [`pi-native/WORKFLOW.md`](pi-native/WORKFLOW.md).

### Command Code-native

Command Code uses one active session as owner/executor plus custom project agents for bounded research,
readiness, normal independent review, and critical independent review. The shipped custom agents live
under `.commandcode/agents/` and expose only read-only tools for those roles.

The package does not pin a model or provider. Command Code model/provider selection remains a session
or user concern, and the workflow does not switch models merely to seek a different review verdict.
Review lineage is preserved explicitly across isolated custom-agent contexts.

The normative contract is [`commandcode-native/WORKFLOW.md`](commandcode-native/WORKFLOW.md).

### OpenCode-native

OpenCode uses one primary agent as owner/executor plus project subagents for bounded research,
readiness, normal independent review, and critical independent review.

The shipped OpenCode subagent files intentionally omit `model`. OpenCode therefore uses the model of
the primary agent that invoked the subagent. Reviewer files deny edit, bash, and nested task
delegation. Child sessions preserve isolation while the parent preserves one logical review lineage.

The normative contract is [`opencode-native/WORKFLOW.md`](opencode-native/WORKFLOW.md).

### Sol Consult

`sol-consult` remains an optional Codex plugin for one supplied-context reasoning pass in a dedicated
ChatGPT Project. It is advisory only. It holds no readiness, review, closure, commit, deploy, or other
external-action authority.

Details: [`codex-native/plugin/plugins/sol-consult/README.md`](codex-native/plugin/plugins/sol-consult/README.md).

### Master Control Room

The Master Control Room remains an optional Codex-native project-level principal above phase-local
work. It owns master-plan formation, authority resolution, cross-phase reconciliation, scoped
integration sign-off, and final project sign-off. It never becomes a phase reviewer or phase owner,
and a phase never spawns it.

Use [`codex-native/skills/master-control-room/`](codex-native/skills/master-control-room/) for that
lane. It is not part of the other harness workflows.

## Prerequisites

Install only the products you actually use:

- [Codex](https://developers.openai.com/codex) — `codex-native`, and independent review in
  `claude-hybrid`.
- [Claude Code](https://claude.com/claude-code) — `claude-hybrid`.
- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) — `dsh-native`.
- [Cursor](https://cursor.com/) — `cursor-native`.
- [Pi](https://pi.dev/) — `pi-native`.
- [Command Code](https://commandcode.ai/) — `commandcode-native`.
- [OpenCode](https://opencode.ai/) — `opencode-native`.
- Python 3.9+ — only for the optional `sol-consult` fallback helper.

The workflow files themselves install no packages and make no network calls. Harness products,
plugins, extensions, and model providers keep their own configuration and authentication outside this
repository.

## Layout

```text
claude-hybrid/
  WORKFLOW.md
  skills/
  loops/

codex-native/
  WORKFLOW.md
  skills/
  roles/
  plugin/

dsh-native/
  WORKFLOW.md
  skills/
    dsh-phase-gate/
    dsh-handoff/

cursor-native/
  WORKFLOW.md
  skills/
    cursor-phase-gate/
    cursor-handoff/
  agents/
    workflow-research-worker.md
    workflow-readiness-reviewer.md
    workflow-independent-reviewer.md
    workflow-critical-reviewer.md

pi-native/
  WORKFLOW.md
  skills/
    pi-phase-gate/
    pi-handoff/

commandcode-native/
  WORKFLOW.md
  skills/
    commandcode-phase-gate/
    commandcode-handoff/
  agents/
    workflow-research-worker.md
    workflow-readiness-reviewer.md
    workflow-independent-reviewer.md
    workflow-critical-reviewer.md

opencode-native/
  WORKFLOW.md
  skills/
    opencode-phase-gate/
    opencode-handoff/
  agents/
    workflow-research-worker.md
    workflow-readiness-reviewer.md
    workflow-independent-reviewer.md
    workflow-critical-reviewer.md

templates/
  global-CLAUDE.md
  global-AGENTS.md                 # Codex global AGENTS.md; filename intentionally unchanged
  global-DSH-AGENTS.md
  global-CURSOR-USER-RULES.md
  global-PI-AGENTS.md
  global-COMMANDCODE-AGENTS.md
  global-OPENCODE-AGENTS.md
  project-CLAUDE.md
  project-AGENTS.md                # shared by six AGENTS.md-compatible harnesses
```

## Install

There is no installer script. Copy only the files needed by your harnesses. Back up existing global
instruction files before replacing them.

### Global — once per machine

| From | To |
|---|---|
| `templates/global-CLAUDE.md` | `~/.claude/CLAUDE.md` |
| `templates/global-AGENTS.md` | `~/.codex/AGENTS.md` |
| `templates/global-DSH-AGENTS.md` | `$DSH_HOME/AGENTS.md` (default `~/.dsh/AGENTS.md`) |
| `templates/global-PI-AGENTS.md` | `~/.pi/agent/AGENTS.md` |
| `templates/global-COMMANDCODE-AGENTS.md` | `~/.commandcode/AGENTS.md` |
| `templates/global-OPENCODE-AGENTS.md` | `~/.config/opencode/AGENTS.md` |
| `templates/global-CURSOR-USER-RULES.md` | Cursor **Customize -> Rules -> User Rules** (paste contents) |
| `codex-native/roles/*.toml` | `~/.codex/agents/` when using Codex-native roles |

`templates/global-AGENTS.md` is intentionally the **Codex** global template. It is not renamed.
DSH, Pi, Command Code, and OpenCode use separately named source templates because their global
instruction destinations differ. Cursor uses User Rules because Cursor has no equivalent global
`AGENTS.md` destination.

Create the file-system destinations you need:

```sh
mkdir -p ~/.claude ~/.codex/agents ~/.dsh ~/.pi/agent ~/.commandcode ~/.config/opencode
```

If `DSH_HOME` is configured to another location, copy the DSH global file there instead of `~/.dsh`.

### Codex global agent limits

The existing Codex-native workflow assumes bounded subagent fan-out. Merge this into
`~/.codex/config.toml` by hand rather than replacing your full config:

```toml
[agents]
max_threads = 10
max_depth = 5
```

### Global — Sol Consult plugin (optional, Codex only)

```sh
mkdir -p ~/.codex/local-marketplaces
cp -R codex-native/plugin ~/.codex/local-marketplaces/sol-consult
codex plugin marketplace add ~/.codex/local-marketplaces/sol-consult
codex plugin add sol-consult@sol-consult-local
```

Install it from one location only. Do not also copy its skill into another Codex skill root.

### Shared project instructions — Codex / DSH / Cursor / Pi / Command Code / OpenCode

Copy this once even when several harness packages coexist:

| From | To |
|---|---|
| `templates/project-AGENTS.md` | `<project>/AGENTS.md` |

Fill every bracketed placeholder with current project facts.

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
| `codex-native/WORKFLOW.md` | `<project>/.codex/WORKFLOW.md` |
| `codex-native/skills/` | `<project>/.agents/skills/` |

### Per project — DSH-native

| From | To |
|---|---|
| `dsh-native/WORKFLOW.md` | `<project>/.dsh/WORKFLOW.md` |
| `dsh-native/skills/` | `<project>/.dsh/skills/` |

### Per project — Cursor-native

| From | To |
|---|---|
| `cursor-native/WORKFLOW.md` | `<project>/.cursor/WORKFLOW.md` |
| `cursor-native/skills/` | `<project>/.cursor/skills/` |
| `cursor-native/agents/` | `<project>/.cursor/agents/` |

Do not duplicate the shared project `AGENTS.md` as an always-on `.cursor/rules` file. Cursor loads both
surfaces and duplicate rules waste context.

### Per project — Pi-native

| From | To |
|---|---|
| `pi-native/WORKFLOW.md` | `<project>/.pi/WORKFLOW.md` |
| `pi-native/skills/` | `<project>/.pi/skills/` |

Pi asks for project trust before loading project-local `.pi` resources in interactive use. Keep that
trust boundary intact.

### Per project — Command Code-native

| From | To |
|---|---|
| `commandcode-native/WORKFLOW.md` | `<project>/.commandcode/WORKFLOW.md` |
| `commandcode-native/skills/` | `<project>/.commandcode/skills/` |
| `commandcode-native/agents/` | `<project>/.commandcode/agents/` |

Command Code reads the shared root `<project>/AGENTS.md`; do not also copy it to
`<project>/.commandcode/AGENTS.md` unless you intentionally want a separate Command Code-only project
memory file.

### Per project — OpenCode-native

| From | To |
|---|---|
| `opencode-native/WORKFLOW.md` | `<project>/.opencode/WORKFLOW.md` |
| `opencode-native/skills/` | `<project>/.opencode/skills/` |
| `opencode-native/agents/` | `<project>/.opencode/agents/` |

OpenCode reads the shared root `<project>/AGENTS.md`. Because it also discovers compatibility skill
roots such as `.agents/skills/`, keep the OpenCode workflow skill names namespaced.

## Using it

Invoke the workflow skill that belongs to the active harness:

```text
Codex:        $phase-gate
DSH:          dsh-phase-gate
Cursor:       /cursor-phase-gate
Pi:           /skill:pi-phase-gate
Command Code: /commandcode-phase-gate
OpenCode:     /opencode-phase-gate
```

Handoff skills follow the same naming pattern:

```text
Codex:        $handoff
DSH:          dsh-handoff
Cursor:       /cursor-handoff
Pi:           /skill:pi-handoff
Command Code: /commandcode-handoff
OpenCode:     /opencode-handoff
```

Exact command presentation can vary by product UI. The skill name and native skill root are the source
of truth.

A typical phase still reads the same way:

```text
owner re-grounds from the live tree
  -> states acceptance proof and named gates
  -> implements and runs targeted checks
  -> freezes the candidate and stops writers
  -> readiness confirms reviewability
  -> independent review returns PASS | CHANGES | BLOCK
  -> remediation returns through targeted recheck
  -> on PASS, owner verifies candidate + gates and closes
```

Small work needs no phase lifecycle.

## Safety and authority boundaries

These rules are common across packages even though each harness expresses them in its own files:

- Reviewers are read-only and never become builders.
- Closure belongs to the active phase owner.
- A review verdict authorizes no commit, push, deploy, spend, secret use, destructive action, or
  external mutation.
- Broad phrasing such as `fix`, `clean`, `finish`, or `full access` does not grant destructive or
  external authority.
- Model choice does not change authority.
- DSH and Pi do not silently switch models for workflow roles.
- Cursor custom workflow subagents use `model: inherit`.
- OpenCode workflow subagents omit `model`, which makes them inherit the invoking primary agent's
  model.
- Command Code workflow files do not pin a provider/model and keep model choice at session/user scope.

## Uninstall

Delete only what you copied.

```sh
# project workflow surfaces
rm -rf <project>/.claude/WORKFLOW.md <project>/.claude/skills <project>/.claude/loops
rm -rf <project>/.codex/WORKFLOW.md <project>/.agents/skills
rm -rf <project>/.dsh/WORKFLOW.md <project>/.dsh/skills
rm -rf <project>/.cursor/WORKFLOW.md <project>/.cursor/skills <project>/.cursor/agents
rm -rf <project>/.pi/WORKFLOW.md <project>/.pi/skills
rm -rf <project>/.commandcode/WORKFLOW.md <project>/.commandcode/skills <project>/.commandcode/agents
rm -rf <project>/.opencode/WORKFLOW.md <project>/.opencode/skills <project>/.opencode/agents

# Codex global role presets
rm -f ~/.codex/agents/{luna_executor,luna_research_worker,independent_reviewer,critical_reviewer,sol_advisor,volume_worker,pre_terra_readiness_reviewer}.toml

# optional Sol Consult plugin
codex plugin remove sol-consult@sol-consult-local
codex plugin marketplace remove sol-consult-local
rm -rf ~/.codex/local-marketplaces/sol-consult
```

Restore any global instruction files or Cursor User Rules from the backups you made before install.

## Limitations

- **Agent-dependent.** These are instructions, not enforcement. A model that ignores them is not
  technically blocked from a tool call.
- **Harness behavior changes.** DSH, Cursor, Pi, Command Code, OpenCode, Claude, and Codex evolve
  quickly. Discovery paths, subagent behavior, model inheritance, and plugin formats must be
  re-verified when vendor behavior changes.
- **Cursor read-only roles are contractual.** Their prompts define read-only authority even if the
  active product exposes write-capable tools.
- **Pi base workflow is session-based.** It does not install or require a subagent extension.
- **Command Code agent permissions use explicit read-only tool lists.** The workflow still treats the
  role prompt as the authority boundary.
- **OpenCode subagent inheritance depends on leaving `model` unset.** Adding a model field to a
  workflow reviewer changes that contract.
- **Manual install with no versioning.** Copies can drift from this source; there is no update command.
- **Overhead is real.** The full phase lifecycle is for consequential changes. Small work should stay
  single-agent.
- **Written in ASD-STE100 Simplified Technical English**, so the instruction files are terse by
  design.

## Contributing

Issues and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first. Changes should be
minimal and surgical, and changes to workflow authority or review semantics need an explicit
rationale.

For security-sensitive reports, see [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE).
