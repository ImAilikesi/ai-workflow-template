# Codex Workflow

Use this workflow for substantial engineering work. Small tasks should stay single-agent when one capable agent can complete and verify them reliably.

## Roles

- **Owner:** the same GPT-5.6 Sol parent session from start to finish. It owns scope, architecture, delegation, decisions, final verification, and signoff.
- **Executor:** `glm_executor` implements and remediates inside the accepted contract.
- **Reviewer:** `glm_reviewer` is an isolated read-only GLM review lane.
- **Critical reviewer:** `critical_reviewer` is an exceptional Terra/max audit for critical work only.

The Sol owner is not replaced by a fresh Sol reviewer.

## Default substantial flow

1. Sol re-grounds from the live tree and states the requested outcome, important constraints, and smallest acceptance proof.
2. Sol delegates one coherent implementation contract to `glm_executor`. Use multiple executors only for genuinely independent, non-overlapping slices.
3. The executor implements, integrates, and runs relevant checks. It decides ordinary local implementation details, but escalates before changing scope, architecture, public behavior, security/risk posture, shared contracts, or major dependencies.
4. The executor returns changed paths, verification results, unresolved decisions, and remaining risk. Writers stop.
5. Sol freezes the current candidate and starts one isolated `glm_reviewer`. Give it requirements, changed paths, candidate state, and evidence; do not give it builder reasoning.
6. `CHANGES` returns to the same executor for remediation. Re-run affected checks, then use the same reviewer lineage for a targeted recheck when possible.
7. `PASS` returns to the same Sol owner.
8. Sol reopens the important changed paths and verification evidence, confirms the reviewed candidate is still current, and gives final signoff.

## Critical work

After GLM reviewer `PASS`, use `critical_reviewer` when the change materially affects money, security, release/deploy machinery, consequential data integrity, trading truth, major architecture, cross-repository contracts, or when the operator explicitly requests a critical audit.

On `CHANGES`, return confirmed findings to `glm_executor`, re-run affected verification, obtain GLM reviewer `PASS` again, then re-run the critical review. The same Sol owner remains final authority.

## Review contract

A material finding must be in accepted scope, realistically reachable, and consequential to correctness, safety, data, or acceptance. Preference-level hardening is a note, not a blocker.

Reviewers are read-only. Review verdicts never authorize commit, push, deploy, spend, credential use, destructive actions, or external changes.

Verdict format:

`VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

`BLOCK` is for an invalid/unreviewable candidate, authority conflict, structural impossibility, or required evidence that cannot be obtained in-lane. It is not a review-round counter.

## Stop condition

Stop when the requested outcome is satisfied, relevant evidence passes, required review is complete, and no material unresolved finding remains. Do not add another review layer or pass without a concrete remaining gap.
