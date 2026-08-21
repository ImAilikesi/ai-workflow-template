---
name: commandcode-phase-gate
description: Execute and close a Command Code-native project phase using .commandcode/WORKFLOW.md.
---

# Command Code-native phase gate

Use this skill only when the accepted plan or operator selects phase-gated execution.
`.commandcode/WORKFLOW.md` is authoritative for topology, review, convergence, and closure.

## Procedure

1. **Re-ground**
   - Read project `AGENTS.md`, `.commandcode/WORKFLOW.md`, the accepted phase contract, relevant
     `CONTEXT.md`, and the live tree.
   - State acceptance proof, named gates, authority, and reserved decisions.

2. **Preserve model choice**
   - Do not pin or silently change provider/model for workflow roles.
   - Treat model selection as a session/operator concern unless the accepted contract requires more.

3. **Implement**
   - The active Command Code session is owner/executor.
   - Use `workflow-research-worker` only for one bounded read-only question that materially helps.
   - Run targeted verification while building.

4. **Freeze**
   - Run required gates.
   - Stop writers and active research work.
   - Record candidate identity, changed paths, gate results, and exclusions.

5. **Readiness**
   - Invoke `workflow-readiness-reviewer` after the first freeze.
   - `CHANGES|BLOCK` -> owner remediates, then the same logical readiness lineage rechecks.
   - First `PASS` -> retire readiness for the rest of the phase.

6. **Independent review**
   - Use `workflow-independent-reviewer` normally.
   - Use `workflow-critical-reviewer` for money, security, release, consequential data integrity,
     trading truth, major architecture, cross-repository contracts, or explicit critical review.
   - R1 is full accepted-scope review. Later rounds are targeted rechecks in the same logical lineage.

7. **Remediate**
   - Fix accepted material findings in the owner lane.
   - Re-run affected gates, freeze the new candidate, and return directly to the same reviewer lineage
     after readiness has passed once.

8. **Convergence**
   - R3 non-PASS -> record `CONVERGENCE_ALERT`.
   - Escalate structural ambiguity or repeated root-cause failure rather than patching indefinitely.
   - Never force `PASS` or switch models merely to seek a different verdict.

9. **Close**
   - After reviewer `PASS`, verify the reviewed candidate is still current and required gates remain
     satisfied.
   - Only the owner issues `CLOSE|REOPEN|BLOCK`.
   - Closure does not authorize commit, push, deploy, spend, secret use, destructive actions, or
     external mutation.

## Context

Compaction is not a review or handoff boundary. Use `commandcode-handoff` only when the current role
cannot recover its verified state reliably.
