# Codex Workflow

Select exactly one topology for a substantial task. Small tasks stay in the active Sol parent when delegation adds no value.

## 1. Default — Sol + GLM

Use for most substantial work.

1. The same GPT-5.6 Sol parent owns scope, architecture, orchestration, consequential decisions, and final signoff.
2. `glm_executor` implements and remediates inside the accepted contract.
3. After writers stop, one isolated `glm_reviewer` reviews the frozen candidate.
4. `CHANGES` returns to the same GLM executor; re-run affected checks and use the same reviewer lineage for targeted recheck when practical.
5. `PASS` returns to the same Sol parent, which verifies that the reviewed candidate is current and signs off.
6. Add `critical_reviewer` only for money, security, release/deploy machinery, consequential data integrity, trading truth, major architecture, cross-repository contracts, or explicit critical review.

This is the default cost-efficient topology. Do not create a fresh Sol reviewer.

## 2. Sol-only — hardest work

Use when Sol should directly own implementation because the task is unusually difficult, ambiguous, architectural, or consequential.

1. The same Sol parent is owner, orchestrator, executor, integrator, and remediator.
2. Sol implements and runs the required verification directly.
3. When the complete candidate is ready, run one final independent Terra review: `independent_reviewer` normally, `critical_reviewer` for critical categories.
4. `CHANGES` returns to the same Sol parent for remediation and targeted Terra recheck.
5. After Terra `PASS`, the same Sol parent verifies candidate freshness and gives final signoff.

Terra is a true final gate here, not a repeated preflight layer.

## 3. Sol + Luna — conservative alternative

Use when the default delegated topology is desired but the operator selects the native GPT executor/reviewer path.

1. The same Sol parent owns scope, architecture, orchestration, consequential decisions, and final signoff.
2. `luna_executor` implements and remediates inside the accepted contract.
3. After writers stop, run one independent Terra review: `independent_reviewer` normally, `critical_reviewer` for critical categories.
4. `CHANGES` returns to the same Luna executor; re-run affected checks and use the same Terra lineage for targeted recheck.
5. Terra `PASS` returns to the same Sol parent for final verification and signoff.

## Optional supporting roles

The configured roles `luna_research_worker`, `volume_worker`, `pre_terra_readiness_reviewer`, and `sol_advisor` remain available, but none is mandatory in the three default topologies.

Use them only when their specific value is clear:

- research worker: a bounded read-only question;
- volume worker: a genuinely disjoint implementation slice;
- readiness reviewer: an explicitly requested pre-review readiness check;
- Sol advisor: only when a non-Sol owner exists outside these three standard topologies or the operator explicitly requests it.

Do not add supporting roles merely because they exist.

## Shared review contract

Before review, stop writers and identify the current changed paths and relevant verification evidence. A material finding must be in accepted scope, realistically reachable, and consequential to correctness, safety, data, contract, or acceptance. Preference-level hardening is a note, not a blocker.

Initial review is a full accepted-scope pass. Rechecks target prior findings, remediation delta, immediate affected callers/consumers, and necessary regression evidence. A material candidate change makes the previous verdict stale.

Reviewers are read-only. A review verdict never authorizes commit, push, merge, deploy, spend, credential use, destructive action, or external mutation.

Verdict format:

`VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

`BLOCK` is reserved for an invalid/unreviewable candidate, authority conflict, structural impossibility, or required evidence that cannot be obtained in-lane.

## Context and handoff

Continue in the same role/session while context remains reliable. Re-ground from the live tree before assuming context is stale.

For an actual cross-session handoff, use the globally installed `handoff` skill. Do not maintain a separate workflow-specific handoff protocol here.

## Stop condition

Stop when the requested outcome is satisfied, relevant evidence passes, the selected topology's required review is complete, and no material unresolved finding remains. Do not add another gate or review layer without a concrete remaining risk.
