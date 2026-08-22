---
name: opencode-phase-gate
description: Execute and close a phase-gated project phase using the active project workflow file. Use when the accepted plan or operator selects phase-gated execution, or when a formal review gate and closure are required.
---

# OpenCode-native phase gate

Use this skill only when the accepted plan or operator selects phase-gated execution. The active
project workflow file is authoritative for topology, review, convergence, and closure.

## Procedure

1. **Re-ground**
   - Read project `AGENTS.md`, the workflow file, the accepted phase contract, relevant `CONTEXT.md`,
     and the live tree.
   - State acceptance proof, named gates, authority, and reserved decisions.

2. **Implement**
   - The primary agent owns orchestration, integration, and remediation.
   - Delegate bounded read-only questions to `researcher`; delegate bounded write slices to
     `worker`; keep parallel lanes independent.
   - Run targeted verification while building.

3. **Freeze**
   - Run required gates.
   - Stop all writers and research lanes.
   - Record candidate identity, changed paths, gate results, and exclusions.

4. **Review**
   - Start one fresh `reviewer` lineage for the initial full accepted-scope review.
   - Treat money, security, release machinery, data integrity, trading truth, major architecture,
     and cross-repository contracts as critical surfaces.
   - Later rounds are targeted rechecks in the same logical lineage.
   - Iterate until the lineage ends with `VERDICT: PASS`.

5. **Remediate**
   - Fix accepted material findings in the owner lane.
   - Re-run affected gates, freeze the new candidate, and return directly to the same reviewer
     lineage.

6. **Terra review**
   - After reviewer `PASS`, run the `terra-review` skill at every phase boundary; always when a
     critical surface changed; before any push, publish, merge, or deploy.
   - Iterate until it records `TERRA VERDICT: PASS`.

7. **Convergence**
   - R3 non-PASS -> record `CONVERGENCE_ALERT`.
   - Escalate structural ambiguity or repeated root-cause failure rather than patching indefinitely.
   - Never force `PASS`.

8. **Close**
   - Verify the reviewed candidate is still current and required gates remain satisfied.
   - Only the owner issues `CLOSE|REOPEN|BLOCK`.
   - Closure does not authorize commit, push, deploy, spend, secret use, destructive actions, or
     external mutation. The landing gate enforces this mechanically.

## Context

Compaction is not a review or handoff boundary. Use the handoff skill only when the current role
cannot recover its verified state reliably.
