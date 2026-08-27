# Generic Harness Workflow

Use one active model as owner, orchestrator, executor, integrator, and remediator. The operator chooses the independent reviewer model for the session or phase.

## Flow

1. Re-ground from project instructions and the live tree.
2. State the requested outcome, important constraints, and smallest useful verification proof.
3. The active model implements and verifies the work directly.
4. When the candidate is ready, stop writers and run one independent read-only reviewer using the operator-selected model.
5. `CHANGES` returns to the same owner/executor for remediation and targeted recheck.
6. `PASS` returns to the same owner/executor for candidate-freshness verification and final signoff.

The reviewer model is not fixed by this workflow. Do not add readiness reviewers, research panels, extra gates, or cross-model ceremonies unless the operator explicitly asks for them or a concrete risk requires them.

## Review contract

A material finding must be in accepted scope, realistically reachable, and consequential to correctness, safety, data, contract, or acceptance. Preference-level hardening is a note, not a blocker.

Initial review is one full accepted-scope pass. Rechecks target prior findings, the remediation delta, immediate affected consumers, and necessary regression evidence.

Reviewers are read-only. Review never authorizes commit, push, merge, deploy, spend, credentials, destructive action, or external mutation.

Use:

`VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

## Context and handoff

Continue in the same session while context remains reliable. Re-ground before assuming a handoff is necessary. For a real cross-session handoff, use the globally installed `handoff` skill.

## Stop condition

Stop when the requested outcome is satisfied, relevant verification passes, independent review passes, and no material unresolved finding remains.
