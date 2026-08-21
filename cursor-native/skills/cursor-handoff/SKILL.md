---
name: cursor-handoff
description: Transfer a verified checkpoint to one continuation in the same Cursor-native phase and role lineage.
---

# Cursor-native handoff

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
findings, resolved findings, current round, candidate identity, and exact targeted recheck scope.

## Transfer

- Create or request exactly one successor in the same phase and role lineage.
- Keep the active model by default. Shipped Cursor workflow subagents use `model: inherit`.
- Label it `<Phase> · Cursor · <Role> · C<N>`; add the actual model only when useful evidence.
- The predecessor stops after the verified checkpoint and packet.
- The successor reads the packet, project `AGENTS.md`, `.cursor/WORKFLOW.md`, and the live repository
  before starting the named next action.
- Do not replay the full transcript or broad memory.

If successor creation is ambiguous, reconcile existing conversation/subagent state before creating
anything else. Never create a second successor as a retry guess.

A continuation does not reset readiness, review count, convergence state, phase authority, or
candidate history.

## Context rule

Compaction or conversation age alone does not require this skill. Use it when the current state cannot
be recovered confidently without broad history reconstruction.