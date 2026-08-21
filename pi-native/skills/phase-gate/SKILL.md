---
name: phase-gate
description: Execute and close a Pi-native project phase using the repository's .pi/WORKFLOW.md.
---

# Pi-native phase gate

Use this skill only when the accepted plan or operator selects phase-gated execution.
`.pi/WORKFLOW.md` is authoritative for topology, review, convergence, and closure.

## Procedure

1. **Re-ground**
   - Read project `AGENTS.md`, `.pi/WORKFLOW.md`, the accepted phase contract, relevant `CONTEXT.md`,
     and the live tree.
   - State the acceptance proof, named gates, current authority, and reserved decisions.

2. **Preserve model choice**
   - Do not pin a model in this skill or workflow.
   - Use the same model as the active owner session for readiness and review sessions.
   - If an already-installed Pi extension provides child agents, keep parent-model inheritance unless
     the operator or accepted contract explicitly overrides it.

3. **Implement**
   - The active Pi owner is the writer and integrator.
   - Use applicable Pi skills and normal tools for implementation and verification.
   - Do not self-issue the formal readiness or independent review from the builder context.

4. **Freeze**
   - Run required gates.
   - Stop writers.
   - Record changed paths, candidate identity, gate results, exclusions, and the exact next review
     role.

5. **Readiness**
   - Prefer one dedicated read-only Pi readiness session using the same model as the owner.
   - If an installed child-agent extension can preserve model inheritance and read-only authority,
     one isolated child is acceptable instead.
   - `CHANGES|BLOCK` -> owner remediates, then the same readiness lineage rechecks.
   - first `PASS` -> retire readiness for the rest of the phase.

6. **Independent review**
   - Start one fresh read-only Pi reviewer session for R1, using the same model as the owner.
   - Use the critical review prompt for money, security, release, consequential data integrity,
     trading truth, major architecture, cross-repository contracts, or explicit operator request.
   - After remediation, continue the same reviewer lineage for a targeted recheck.

7. **Remediate**
   - Fix accepted material findings coherently in the owner session.
   - Re-run affected gates and freeze the next candidate.
   - After readiness has passed once, return directly to the same independent reviewer.

8. **Convergence**
   - R3 non-PASS -> record `CONVERGENCE_ALERT`.
   - If the same root cause survives two genuine remediation attempts or structural ambiguity changes
     design or authority, stop ordinary patching and escalate through an approved lane or to the
     operator.
   - Do not change models silently to chase a different verdict.

9. **Close**
   - On reviewer `PASS`, verify that the reviewed candidate is current and required gates remain
     satisfied.
   - The Pi owner issues `CLOSE|REOPEN|BLOCK`.
   - Closure does not authorize commit, push, deploy, spend, secrets, destructive, or external
     actions.

## Separate-session packet

When the base Pi runtime has no child-agent extension, prepare a compact packet for readiness or
review containing phase/role, accepted contract, candidate identity, changed paths, named gate
results, exclusions, and exact next action. A recheck packet also includes prior findings and the
remediation delta.

The receiving session reads `AGENTS.md`, `.pi/WORKFLOW.md`, and the live repository before returning a
verdict. The packet is a locator and state transfer, not a substitute for repository grounding.

## Context

Compaction count is not a handoff boundary. If the active role cannot recover its verified state
reliably, invoke the `handoff` skill at a safe checkpoint.