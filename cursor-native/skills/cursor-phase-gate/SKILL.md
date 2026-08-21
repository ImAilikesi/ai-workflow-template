---
name: cursor-phase-gate
description: Execute and close a Cursor-native project phase using the repository's .cursor/WORKFLOW.md.
---

# Cursor-native phase gate

Use this skill only when the accepted plan or operator selects phase-gated execution.
`.cursor/WORKFLOW.md` is authoritative for topology, review, convergence, and closure.

## Procedure

1. **Re-ground**
   - Read project `AGENTS.md`, `.cursor/WORKFLOW.md`, the accepted phase contract, relevant
     `CONTEXT.md`, and the live tree.
   - State the acceptance proof, named gates, current authority, and reserved decisions.

2. **Preserve model inheritance**
   - Use the shipped custom subagents with `model: inherit`.
   - Do not replace them with a model-pinned duplicate unless the operator or accepted contract
     explicitly requires that change.

3. **Implement**
   - Keep one active owner for each changed file.
   - Use `workflow-research-worker` only for one bounded read-only question that materially helps.
   - Run targeted verification while building.

4. **Freeze**
   - Run required gates.
   - Stop writers and active research work.
   - Record changed paths, candidate identity, gate results, exclusions, and current review state.

5. **Readiness**
   - Invoke `workflow-readiness-reviewer` after the first candidate is frozen.
   - `CHANGES|BLOCK` -> owner remediates, then readiness rechecks the updated candidate.
   - first `PASS` -> retire readiness for the rest of the phase.

6. **Independent review**
   - Use `workflow-independent-reviewer` for normal work.
   - Use `workflow-critical-reviewer` for money, security, release, consequential data integrity,
     trading truth, major architecture, cross-repository contracts, or explicit operator request.
   - R1 is fresh and reviews the complete accepted scope.
   - Persist a compact review state in the parent: current round, findings, resolved findings,
     candidate identity, and targeted recheck scope.
   - After remediation, invoke the same reviewer role with that review state for a targeted recheck.

7. **Remediate**
   - Fix accepted material findings coherently in the owner lane.
   - Re-run affected gates and freeze the next candidate.
   - After readiness has passed once, return directly to the independent reviewer.

8. **Convergence**
   - R3 non-PASS -> record `CONVERGENCE_ALERT`.
   - If the same root cause survives two genuine remediation attempts or structural ambiguity changes
     design or authority, stop ordinary patching and escalate through an approved lane or to the
     operator.
   - Do not change models silently to chase another verdict.

9. **Close**
   - On reviewer `PASS`, verify that the reviewed candidate is current and required gates remain
     satisfied.
   - The Cursor parent issues `CLOSE|REOPEN|BLOCK`.
   - Closure does not authorize commit, push, deploy, spend, secrets, destructive, or external
     actions.

## Reviewer authority

Research, readiness, and review subagents are read-only by contract. They must not edit files, commit,
push, deploy, use secrets, or take destructive or external actions even if the active Cursor toolset
technically exposes those capabilities.

A fresh internal subagent context does not create a fresh logical review lineage. Rechecks use the
same reviewer role plus the parent's explicit review state and are limited to prior findings,
remediation delta, affected consumers, and necessary regression gates.

## Context

Compaction count is not a handoff boundary. If the active role cannot recover its verified state
reliably, invoke the `cursor-handoff` skill at a safe checkpoint.