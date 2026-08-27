# Generic Harness Workflow

Use one primary parent session. The active model is owner, orchestrator, executor, integrator, remediator, and final authority. The operator chooses the independent reviewer model.

## Thread topology

Keep the topology flat and explicit:

```text
primary parent — owner/orchestrator/executor
└── independent reviewer — isolated, read-only
```

Do not create a second orchestrator, readiness lane, review panel, or extra principal thread. If the harness can run the operator-selected reviewer as a native child, use that. If it cannot override the reviewer model reliably, use one separate isolated reviewer session with the selected model.

Only spawn a subagent or named role when it is explicitly configured/registered for the active harness and its intended model, permissions, and role boundary can be verified. Do not invent ad-hoc roles, silently substitute a different model/provider, or use an unconfigured generic child unless the operator explicitly overrides this rule.

## Flow

1. Re-ground from project instructions, the accepted task/phase contract, and the live tree.
2. State the requested outcome, important constraints, and smallest useful verification proof.
3. The primary parent implements and verifies the work directly.
4. When implementation is complete, stop writers and freeze only the current changed paths, relevant verification, and material exclusions.
5. Run one independent read-only reviewer using the operator-selected model.
6. `CHANGES` returns to the same primary parent for remediation. Re-run affected checks and reuse the same reviewer lineage for a targeted recheck.
7. `PASS` returns to the same primary parent, which verifies that the reviewed candidate is still current and signs off.

Do not add extra workflow machinery unless the operator explicitly requests it or a concrete risk cannot be handled by this shape.

## Review contract

A material finding must be in accepted scope, realistically reachable, and consequential to correctness, safety, data, contract, or acceptance. Preference-level hardening is a note, not a blocker.

Initial review covers the accepted scope once. Rechecks cover prior findings, the remediation delta, immediate affected consumers, and necessary regression evidence. Do not spawn a fresh reviewer for every patch.

Reviewers are read-only. Review never authorizes commit, push, merge, deploy, spend, credentials, destructive action, or external mutation.

Use:

`VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

## Context and continuations

The durable authority is the live tree, accepted contract, changed paths, verification state, and unresolved material findings. Transcript history is context, not truth.

Continue the same primary parent while it can recover current state reliably. Do not rotate because of age, token count, one compaction, or review-round count. Re-ground first.

Keep one reviewer lineage through targeted rechecks. If a reviewer/session is actually lost or unreliable, reconcile it before creating exactly one successor; pass only current findings, remediation delta, verification, and next action.

For a principal cross-session transfer requested by the operator, use the globally managed `handoff` skill where available. Do not maintain a harness-specific handoff protocol in this repository.

## Stop condition

Stop when the requested outcome is satisfied, relevant verification passes, independent review passes, and no material unresolved finding remains.
