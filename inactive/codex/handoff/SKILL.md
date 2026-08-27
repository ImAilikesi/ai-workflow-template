---
name: handoff
description: Transfer a verified checkpoint to one continuation in the same Codex-native phase and role lineage.
---

# Native handoff

Use this skill only when the current role cannot reliably continue from its active context or when an
operator explicitly requests a continuation. A handoff is context transfer, not a phase, review, or
escalation boundary.

## Before handoff

Finish or stop at a safe atomic checkpoint. Do not start new broad work only to make the packet prettier.
Verify the live tree and current phase state.

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

Add only essential reserved-action, candidate, or review details needed by that role.

For a reviewer continuation, preserve whether the review is INITIAL or RECHECK, the existing material
findings, resolved findings, current review round, and exact targeted recheck scope.

## Transfer

- Create or request exactly one successor in the same phase and role lineage.
- Label it `<Phase> · <Model> · <Role> · C<N>`.
- The predecessor stops after the verified checkpoint and packet.
- The successor reads the packet first, verifies the live tree/candidate, then starts the named next action.
- Do not replay the full transcript or broad memory.

If successor creation is ambiguous, reconcile the existing task/session state before creating anything
else. Never create a second successor as a retry guess.

A continuation does not reset readiness, Terra review count, convergence state, phase authority, or
candidate history.

## Context rule

Compaction count alone does not require this skill. Use it when current state cannot be recovered
confidently without broad history reconstruction.
