---
name: handoff
description: Transfer a verified checkpoint to one continuation in the same Claude-hybrid phase and role lineage.
---

# Hybrid handoff

A handoff transfers context. It does not change phase authority, review state, or provider roles.

## Packet

Include only:

1. `PHASE / ROLE`
2. `COMPLETED`
3. `CURRENT STATE`
4. `OPEN ITEMS`
5. `CHANGED PATHS`
6. `VERIFICATION`
7. `IMPORTANT DECISIONS`
8. `NEXT ACTION`

For Luna Readiness or Terra continuation, also preserve the current review mode/round, material findings,
resolved findings, and targeted recheck scope.

## Transfer

Create or request one successor with label `<Phase> · <Model> · <Role> · C<N>`.
The successor reads the packet first, verifies current project/candidate state, then continues the named
action. Do not replay full transcripts.

If successor creation is ambiguous, reconcile existing state before retrying. Never create duplicate
reviewer or implementation lineages.

Compaction count alone is not a handoff trigger.
