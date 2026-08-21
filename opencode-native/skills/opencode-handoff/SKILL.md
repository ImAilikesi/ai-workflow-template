---
name: opencode-handoff
description: Transfer one verified OpenCode workflow checkpoint to a continuation in the same phase and role lineage.
---

# OpenCode-native handoff

Use this skill when the active role can no longer recover its verified state reliably or when the
operator explicitly requests a continuation. A handoff is context transfer, not a new phase, review,
or escalation boundary.

## Before handoff

Stop at a safe atomic checkpoint. Verify the live tree, candidate identity, active contract, current
review state, and required evidence.

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

For reviewer continuation, also preserve INITIAL versus RECHECK, current round, material findings,
resolved findings, candidate identity, and exact targeted recheck scope.

## Transfer

- Continue exactly one successor in the same logical role lineage.
- Label it `<Phase> · OpenCode · <Role> · C<N>`.
- Keep provider/model choice unchanged unless the operator or accepted contract explicitly changes it.
- The predecessor stops after the verified packet.
- The successor reads the packet first, verifies live state, then performs the named next action.
- Do not replay the full transcript or broad memory.

A continuation does not reset readiness, review count, convergence state, phase authority, or candidate
history.
