# Audit Loop

Inspect and report — **no fixes applied**. Produces a structured findings list with severity,
evidence, and a recommended fix per item. Run by Claude, Codex, or both.

## Driver

- `config.yaml: auditor` — `claude` | `codex` | `both`. Two auditors give independent passes;
  reconcile findings, don't average them (`CLAUDE.md` §7).

## Scope (pick one or more)

`codebase` · `architecture` · `security` · `ux` · `project` (set in `config.yaml: scope`).
Each scope changes what you look for, but the output format is identical.

## Loop

1. **Frame** → verify: scope and target are stated; auditor knows what "good" looks like here.
2. **Inspect** → verify: walk the target systematically; every observation cites `file:line`,
   a command, or a concrete artifact.
3. **Record findings** → verify: each finding has the four required fields (below).
4. **Severity-rank** → verify: findings sorted by `severity_scale`, highest first.
5. **Report** → verify: written to `output_path`; recommendations are concrete, not "improve
   this." **No code is changed** — fixes are recommendations only.

## Finding format

Every finding MUST include all four: **severity**, **evidence**, **impact**, **fix
recommendation**. A finding missing any of these does not ship.

```md
### [<severity>] <title>          # severity from severity_scale
- Where:    <file:line / component / flow>
- Evidence: <what was observed — code, output, repro, or measurement>
- Impact:   <why it matters — concrete consequence if unaddressed>
- Fix:      <recommended remediation — specific, not "improve this">
```

## Definition of Done

**Done when** every in-scope area has been inspected and the report at `output_path` contains
all findings, severity-ranked, each with the four required fields. No code changed —
recommendations only.

## Evidence required before PASS

Each finding cites real evidence (file:line / command output / measurement). Any finding
missing severity, evidence, impact, or fix is incomplete — fix it before the report is `PASS`.

## Built-in controls

- Checkpoints / stop conditions / escalation: `../_shared/checkpoint-and-escalation.md`.
- Operating rules (resume, anti-drift, human triggers): `../_shared/operating-rules.md`.
- Loop modes: `../_shared/loop-modes.md`.
- Severity scale: `config.yaml: severity_scale` (applied in the Finding format above).
- Evidence: `../_shared/evidence-log.md` — every finding is evidence-backed; no speculation
  presented as fact.

## Resume

After a context break, follow `../_shared/operating-rules.md` → "Resume" and re-read the
in-progress report at `output_path` before continuing.

## Knobs

See `config.yaml` — `auditor`, `scope`, `severity_scale`, `output_path`.
