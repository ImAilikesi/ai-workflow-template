---
name: handoff
description: Transfer a verified checkpoint to one continuation in the same DSH-native phase and role lineage.
---

# DSH-native handoff

Use this skill only when the current role cannot reliably continue from its active context or when the
operator explicitly requests a continuation. A handoff is context transfer, not a phase, review, or
escalation boundary.

## Before handoff

Stop at a safe atomic checkpoint. Verify the live tree, active phase, candidate, review state, and
named gates. Do not start broad work only to improve the packet.

## Packet

Keep the packet compact. Include:

1. `PHASE / ROLE`
2. `COMPLETED`
3. `CURRENT STATE`
4. `OPEN ITEMS`
5. `CHANGED PATHS`
6. `VERIFICATION`
7. `IMPORTANT DECISIONS`
8. `NEXT ACTION`

For a reviewer continuation, also preserve whether the review is INITIAL or RECHECK, material
findings, resolved findings, current round, and exact targeted recheck scope.

## Transfer

- Create or request exactly one successor in the same phase and role lineage.
- Keep the same provider/model as the current role unless the operator or accepted contract explicitly
  changes it. No shipped DSH workflow file pins a model.
- Label it `<Phase> · DSH · <Role> · C<N>`; add the actual model only when useful evidence.
- The predecessor stops after the verified checkpoint and packet.
- The successor reads the packet first, verifies the live tree or candidate, then starts the named
  next action.
- Do not replay the full transcript or broad memory.

If successor creation is ambiguous, reconcile the existing child/session state before creating
anything else. Never create a second successor as a retry guess.

A continuation does not reset readiness, review count, convergence state, phase authority, or
candidate history.

## Context rule

Compaction or session age alone does not require this skill. Use it when the current state cannot be
recovered confidently without broad history reconstruction.