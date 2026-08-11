---
name: phase-gate
description: Execute and close a Claude-hybrid project phase using the repository's .claude/WORKFLOW.md.
---

# Claude-hybrid phase gate

Use `.claude/WORKFLOW.md` as the authoritative hybrid contract.

## Procedure

1. Re-ground from project `CLAUDE.md`, the workflow, accepted contract, relevant `CONTEXT.md`, and live tree.
2. Opus states the acceptance proof, named gates, and reserved decisions.
3. Opus implements and runs verification. Keep optional workers bounded and disjoint.
4. Stop writers and freeze a compact candidate packet.
5. If readiness has not yet passed for the phase, create or continue the same Luna/Max Readiness task.
6. After the first readiness PASS, retire readiness permanently for the phase.
7. Create one fresh Terra task for R1. Reuse that same Terra task for every targeted recheck.
8. Remediate accepted findings in Opus, re-run affected gates, and send only the candidate delta plus evidence.
9. R3 non-PASS creates `CONVERGENCE_ALERT`. Use Sol Advisor only under the stricter hybrid escalation rules
   in `.claude/WORKFLOW.md`.
10. On Terra PASS, Opus verifies candidate/gates and issues `CLOSE|REOPEN|BLOCK`.

Do not create a Sol Owner/Orchestrator for the normal Claude-hybrid workflow.

## Cross-provider discipline

Reviewer/advisor packets contain only contract, candidate paths/state, gates/evidence, findings or
bounded question, and next action. Never send builder transcripts unless an explicit task requires them.

Use only supported provider messaging/task mechanisms. Do not invent polling, callback, or task-control
primitives.

## Context

Compaction is not a phase or review boundary. Use the hybrid `handoff` skill only when the active role
cannot recover its state reliably.
