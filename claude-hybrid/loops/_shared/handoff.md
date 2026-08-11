# Handoff format

Reusable handoff template for any loop. Mirrors the vault `HANDOFF.md` (read order:
`HANDOFF.md` → `TRUTH.md` → `LOG.md`). Keep it **compressed** — state, not narrative.
No raw chat dumps.

A handoff lets a different model/session resume cold. Write it at every checkpoint and
whenever you stop.

## Template

```md
# HANDOFF — <loop> — <YYYY-MM-DD HH:MM>

## Goal
<one line: what this run is trying to achieve>

## State
- Done:      <bullet list of completed, merged-or-staged work>
- Verified:  <what was actually checked, and how — command / metric / test>
- Left:      <what remains, in priority order>

## Next action
<the single next concrete step the resumer should take>

## Open questions
<decisions that need the user / are unresolved; empty if none>

## Risks
<what could break, known fragile spots, assumptions made>
```

## Rules

- One line per bullet. If a bullet needs a paragraph, it belongs in the evidence log.
- "Verified" must cite evidence, not intent. "Tests pass" without a command is not verified.
- Update in place — the handoff is the *current* state, not an append log. History lives in
  `evidence-log.md`.
