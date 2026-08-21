---
name: phase-gate
description: Execute and close a DSH-native project phase using the repository's .dsh/WORKFLOW.md.
---

# DSH-native phase gate

Use this skill only when the accepted plan or operator selects phase-gated execution.
`.dsh/WORKFLOW.md` is authoritative for topology, review, convergence, and closure.

## Procedure

1. **Re-ground**
   - Read project `AGENTS.md`, `.dsh/WORKFLOW.md`, the accepted phase contract, relevant `CONTEXT.md`,
     and the live tree.
   - State the acceptance proof, named gates, current authority, and reserved decisions.

2. **Preserve model inheritance**
   - Do not pin a provider or model for workflow roles.
   - For DSH in-process children, omit provider/model overrides so they inherit the active parent's
     provider and model.
   - If the selected child transport would use a different model, use an already-configured
     same-model route or the visible-session fallback. Record the reason once.

3. **Implement**
   - Keep one active owner for each changed file.
   - Use a read-only research subagent for one bounded question when useful.
   - Use DSH `workflow` only for genuine independent fan-out; ordinary delegation should stay on the
     simpler subagent path.
   - Run targeted verification while building.

4. **Freeze**
   - Run required gates.
   - Stop writers and active research work.
   - Record changed paths, candidate identity, gate results, and exclusions.

5. **Readiness**
   - Create or continue one read-only readiness lineage.
   - Prefer an isolated native DSH child when available; otherwise use one dedicated visible DSH
     session with the same model as the owner session.
   - `CHANGES|BLOCK` -> remediate, then continue the same readiness lineage.
   - first `PASS` -> retire readiness for the rest of the phase.

6. **Independent review**
   - Start one fresh read-only reviewer lineage for R1.
   - Use the critical reviewer prompt for money, security, release, consequential data integrity,
     trading truth, major architecture, cross-repository contracts, or explicit operator request.
   - R1 reviews the complete accepted scope.
   - After remediation, continue the same reviewer lineage for a targeted recheck.

7. **Remediate**
   - Fix accepted material findings coherently.
   - Re-run affected gates and freeze the next candidate.
   - After readiness has passed once, return directly to the same independent reviewer.

8. **Convergence**
   - R3 non-PASS -> record `CONVERGENCE_ALERT`.
   - If the same root cause survives two genuine remediation attempts or structural ambiguity
     changes design/authority, stop ordinary patching and escalate through an already-approved lane
     or to the operator.
   - Do not switch to another model silently as a convergence mechanism.

9. **Close**
   - On reviewer `PASS`, verify that the reviewed candidate is current and required gates remain
     satisfied.
   - The DSH phase owner issues `CLOSE|REOPEN|BLOCK`.
   - Closure does not authorize commit, push, deploy, spend, secrets, destructive, or external
     actions.

## DSH child handling

Use native subagents when the active composition exposes them. The workflow capability is optional and
is for meaningful scripted fan-out, not routine one-child delegation.

Readiness, review, and research children are read-only by authority. If the active provider supports
tool filtering, restrict them to the minimum read and verification tools they need. If it does not,
the behavioral read-only rule still applies.

Prefer a continuable reviewer child when the configured provider supports continuation. If it does
not, use one dedicated visible reviewer session for the phase so targeted rechecks preserve lineage.
Never run a fresh full reviewer for every remediation round.

## Context

Compaction count is not a handoff boundary. If the active role cannot recover its verified state
reliably, invoke the `handoff` skill at a safe checkpoint.