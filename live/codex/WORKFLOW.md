# Codex Workflow

Use exactly one topology for each substantial task or phase. Small tasks may stay in the active Sol parent when delegation adds no value.

## Thread topology

Every substantial task has one persistent **Sol parent thread**. It is the owner, orchestrator, authority, and final signoff point. Never spawn the Sol owner as a subagent or run it as a peer beside the executor.

Delegated work forms a simple tree:

```text
Sol parent
├── primary executor lineage
│   ├── luna_research_worker — bounded read-only questions
│   └── volume_worker — bounded disjoint write slices
└── independent reviewer lineage
```

The primary executor remains one lineage through implementation and remediation. The reviewer is isolated from builder reasoning and starts only after writers stop.

When nested child creation is supported, research and volume workers belong under the active delegated executor. If nested creation is not supported, the Sol parent may spawn them on the executor's behalf using the executor's bounded contract; they still report to the executor and gain no authority.

Only spawn roles that are explicitly configured in the active Codex agent registry (`~/.codex/agents/` or an approved project equivalent) and whose intended model/provider/sandbox can be verified. Do not invent ad-hoc subagent roles, guess role names, silently substitute another model/provider, or use an unconfigured generic child unless the operator explicitly overrides this rule.

Do not create extra visible principal threads when native child routing works. If native child creation itself is unavailable, use one visible fallback session for that logical role and preserve the same hierarchy. Never keep both native and fallback copies of one role.

## 1. Native — default Sol + Luna

Use this by default for substantial engineering work.

1. The same Sol parent owns scope, architecture, orchestration, consequential decisions, and final signoff.
2. One persistent `luna_executor` child implements, integrates, verifies, and remediates inside the accepted contract.
3. During implementation, the executor may use shared Luna research or bounded volume workers only when they remove real serial work.
4. When implementation and required checks are complete, stop writers and freeze the candidate.
5. Run one final independent Terra review: `independent_reviewer` normally, `critical_reviewer` for critical categories.
6. `CHANGES` returns to the same Luna executor. Re-run affected checks and return to the same Terra reviewer lineage for a targeted recheck.
7. Terra `PASS` returns to the same Sol parent, which verifies candidate freshness and gives final signoff.

Terra is the final review gate, not a readiness loop or repeated preflight layer.

## 2. Sol + GLM — cost-efficient delegated workflow

Use when GLM-5.3-Flash is the preferred implementation path.

1. The same Sol parent owns scope, architecture, orchestration, consequential decisions, and final signoff.
2. One persistent `glm_executor` child implements, integrates, verifies, and remediates inside the accepted contract.
3. Shared Luna research or bounded volume workers may be used when a clearly independent slice justifies them.
4. After writers stop, one isolated `glm_reviewer` reviews the frozen candidate.
5. `CHANGES` returns to the same GLM executor; use the same GLM reviewer lineage for targeted recheck.
6. GLM `PASS` returns to the same Sol parent for final verification and signoff.
7. Add a final Terra `critical_reviewer` only for money, security, release/deploy machinery, consequential data integrity, trading truth, major architecture, cross-repository contracts, or explicit critical review.

Do not add Terra to ordinary GLM work merely as another opinion.

## 3. Sol-only — hardest work

Use when Sol should directly own implementation because the task is unusually difficult, ambiguous, architectural, or consequential.

1. The Sol parent is also executor, integrator, and remediator.
2. Sol may use `luna_research_worker` for bounded read-only questions.
3. Do not use `volume_worker` for ordinary Sol-only work; delegated writing changes the topology and requires an explicit operator override.
4. Sol implements and runs the required verification directly.
5. When the complete candidate is frozen, run one final Terra review: `independent_reviewer` normally, `critical_reviewer` for critical categories.
6. `CHANGES` returns to the same Sol parent for remediation and a targeted recheck in the same Terra lineage.
7. After Terra `PASS`, the same Sol parent verifies candidate freshness and signs off.

## Shared supporting subagents

The shared helpers are **optional, never mandatory**. They are recommended only when they materially reduce serial work, add useful evidence, or isolate a genuinely disjoint slice.

- `luna_research_worker` — one bounded read-only question. Run several only when the questions are genuinely independent. Return evidence to the active executor and stop.
- `volume_worker` — one bounded, disjoint implementation slice with explicit file/task ownership. It never owns shared contracts, architecture, integration, review, or final judgment.

Keep worker scope small enough that the primary executor can integrate and verify the result without reconstructing the worker's reasoning. A workflow must remain valid when no shared helper is spawned.

`pre_terra_readiness_reviewer` and `sol_advisor` remain installed and available because they are configured roles, but they are not part of the three standard workflows. Use them only on explicit operator direction or a concrete exceptional need.

## Candidate and review

A frozen candidate needs only:

- accepted scope/contract;
- current changed paths;
- relevant verification results;
- material exclusions or unresolved external blockers.

Do not maintain review ledgers, manual hash chains, phase counters, or readiness packets unless a project has a concrete requirement for them.

Initial review covers the accepted scope once. Rechecks cover prior findings, the remediation delta, immediate affected callers/consumers, and necessary regression evidence. Reuse the same reviewer lineage for rechecks; do not spawn a fresh reviewer for every patch.

A material finding must be in accepted scope, realistically reachable, and consequential to correctness, safety, data, contract, or acceptance. Preference-level hardening is a note, not a blocker.

Reviewers are read-only. Review never authorizes commit, push, merge, deploy, spend, credentials, destructive action, or external mutation.

Use:

`VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

`BLOCK` is reserved for an invalid/unreviewable candidate, authority conflict, structural impossibility, or required evidence that cannot be obtained in-lane.

## Master Control Room

MCR is optional and only useful for genuinely multi-phase, multi-workstream, or cross-repository projects. It is a separate long-lived Sol principal thread, not an executor, reviewer, or native subagent.

Authority is:

```text
Operator
  ↓
MCR principal — optional project/master-plan authority
  ↓
Sol phase parent — one parent thread per active phase/workstream
  ├── executor/support children
  └── reviewer child
```

MCR does not carry phase implementation context and does not communicate directly with executors, workers, or reviewers. It gives a compact phase/workstream contract to the Sol phase parent; the phase parent re-grounds from the live tree and owns execution.

Use MCR only for master-plan formation/maintenance, cross-phase dependency and status reconciliation, project-level authority decisions, scoped integration signoff, and final project signoff. It is not a mandatory phase gate.

Keep MCR traffic compact. A phase reports back only load-bearing state: outcome, current candidate/commit when relevant, verification, final review verdict, blockers, and next dependency. MCR should inspect durable artifacts when it needs detail instead of importing child transcripts.

Never combine MCR and ordinary phase execution in one thread merely to save a session. One MCR lineage may supervise many phase parent threads; each phase parent owns only its accepted workstream.

## Context and continuations

The durable authority is the live tree, accepted plan/contract, current changed paths, verification state, and unresolved material findings. Transcript history is context, not truth.

Bias strongly toward continuity:

- keep the same Sol parent for the task/phase;
- keep the same primary executor through remediation;
- keep one reviewer lineage through targeted rechecks;
- treat research and volume workers as disposable bounded children that stop after their result.

Do not rotate a thread because of age, token count, one compaction, review round count, or a yielded wait. Re-ground first from durable state.

A fresh continuation is justified only when the active role can no longer recover current state reliably without broad transcript reconstruction, repeatedly confuses stale/current decisions, the platform has actually lost the role context, or the operator requests a new session.

When a child needs replacement, create exactly one successor after reconciling the existing child. Give it only the current contract, changed paths, verification, open findings, and next action. Do not replay the full transcript or duplicate a still-live child.

For a principal-thread cross-session transfer requested by the operator, use the globally managed `handoff` skill. This repository does not maintain a second handoff protocol.

For MCR rotation, carry only the master-plan reference, current cross-phase checkpoint, still-relevant signoffs/directives, unresolved master decisions, and next exact action. The new MCR re-grounds everything from current durable evidence.

## Stop condition

Stop when the requested outcome is satisfied, relevant verification passes, the selected topology's required review is complete, and no material unresolved finding remains. Do not add another worker, review layer, continuation, or gate without a concrete remaining gap.
