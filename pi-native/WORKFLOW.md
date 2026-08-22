# Pi-native phase workflow

This file is the normative Pi-native phase contract. Project `AGENTS.md` files define project facts
and local rules. Skills define execution procedure. Do not duplicate this contract in project files.

## 1. Core model

Pi keeps its core intentionally small and does not provide built-in subagents. The default phase
workflow therefore uses one Pi owner/executor session plus isolated readiness and review sessions.
Optional Pi extensions may automate those isolated roles, but the base workflow must not depend on an
extension.

Normal non-phase work does not require this lifecycle. Use it when the accepted project plan or the
operator selects a phase gate.

No shipped Pi workflow file pins a model. The owner, readiness reviewer, and independent reviewer use
the same model by default. When roles run as separate Pi sessions, select the same model as the active
owner session. When an installed extension provides child agents, keep parent-model inheritance unless
the operator or accepted contract explicitly requires another route.

Keep labels readable:

`<Phase> · Pi · <Role>`

Add the actual model only when useful evidence. Add `· C<N>` only for a continuation.

## 2. Default topology

### Owner/executor session

One Pi session owns the accepted contract, implementation, integration, remediation, verification,
candidate freeze, and `CLOSE|REOPEN|BLOCK`.

The owner may use normal Pi tools and applicable skills during implementation. It must not perform the
formal readiness or independent review on its own candidate in the same builder context.

### Readiness session

After writers stop and the first candidate is frozen, use one dedicated Pi session for readiness.
Keep it read-only and on the same model as the owner session. Reuse it until its first `PASS`, then
retire it for the rest of the phase.

### Independent review session

After readiness passes, use one fresh dedicated Pi session for the initial independent review. Keep it
read-only and on the same model as the owner session. Reuse that same review session for targeted
rechecks after remediation.

For money, security, release, consequential data integrity, trading truth, major architecture,
cross-repository contracts, or an explicit operator request, use the critical review prompt in the
same model. Criticality changes the review standard, not the model.

### Optional extension topology

If the operator has already installed and trusted a Pi extension that provides isolated child agents,
the owner may use it for bounded research, readiness, or review roles. The extension path must preserve
these rules:

- no hard-coded model in this package;
- parent model is inherited by default;
- research, readiness, and review roles are read-only;
- one logical readiness lineage until first `PASS`;
- one independent review lineage for R1 and later targeted rechecks;
- the owner retains implementation and closure authority.

If the extension cannot preserve those properties, use the default session topology instead.

## 3. Phase sequence

1. Re-ground from project `AGENTS.md`, `.pi/WORKFLOW.md`, the accepted phase contract, relevant
   `CONTEXT.md`, and the live tree.
2. State the smallest acceptance proof and named deterministic gates.
3. Implement with one active owner for each changed file.
4. Run targeted verification while building and required phase gates before review.
5. Stop writers and freeze the review candidate.
6. Run the readiness lineage until its first `PASS`.
7. Start one fresh independent review lineage for the initial full review.
8. On `CHANGES`, remediate in the owner session, re-run affected gates, freeze the next candidate,
   and return to the same review lineage for a targeted recheck.
9. On `PASS`, verify that the reviewed candidate is still current and required gates remain satisfied,
   then issue `CLOSE` or `REOPEN`.
10. Use `BLOCK` only for the narrow conditions in the review contract below.

A review result never authorizes commit, push, deploy, spend, secrets, destructive actions, or other
external changes.

## 4. Candidate and review packet

A frozen candidate is the current in-scope project state after writers stop.

The owner prepares a compact packet for a separate readiness or review session. Include only:

- accepted phase and contract;
- current changed paths;
- relevant base, HEAD, branch, or worktree identity when available;
- named gates and results;
- known exclusions or protected dirt;
- exact review role and whether it is INITIAL or RECHECK;
- prior material findings and remediation delta for a recheck.

The receiving Pi session reads project `AGENTS.md`, `.pi/WORKFLOW.md`, and the packet, then verifies the
live candidate before judging it. Do not rely only on copied snippets when the repository is available.

If the review surface changes while a reviewer is evaluating it, that verdict is stale. Freeze the
new candidate revision and continue the same reviewer lineage with the delta.

## 5. Readiness

Readiness answers one question:

**Is this candidate ready for an independent review?**

It checks acceptance coverage, obvious candidate/gate inconsistencies, and material omissions. It does
not redesign the solution, add requirements, or duplicate the full independent review.

- `CHANGES` — owner remediates, then the same readiness session or child rechecks.
- `BLOCK` — owner resolves the unreviewable or missing-critical-evidence condition, then the same
  readiness lineage rechecks.
- first `PASS` — readiness retires for the rest of that phase lineage.

After the first readiness `PASS`, later remediation returns directly to the independent reviewer.

## 6. Independent review

The initial reviewer is fresh, isolated from builder history, read-only, and scope-bound.

### Initial review

Review the complete accepted phase scope once. Report all substantiated material findings together.

A blocking finding must be:

1. inside accepted scope;
2. reachable or realistically possible;
3. material to correctness, safety, data, contract, or acceptance; and
4. require a code or design change to satisfy the accepted contract.

Anything else is a non-blocking `NOTE`.

### Rechecks

Reuse the same review session or child lineage. Rechecks are targeted to:

- prior findings;
- remediation delta;
- immediate affected callers or consumers; and
- necessary regression gates.

Do not silently turn a recheck into another full repository audit.

A new material defect caused or exposed by remediation is `NEW_FINDING`. A defect that existed
unchanged and was reasonably reviewable in the initial pass is `LATE_FINDING`. A late finding can
still be material, but it does not reset review scope.

## 7. Convergence

There is no automatic review-round cap and no endless ordinary patch loop.

- R1 is the full independent review.
- R2 and later are targeted rechecks.
- If R3 is still non-PASS, emit `CONVERGENCE_ALERT`.
- If one bounded remediation is clearly sufficient, perform it and continue the same lineage.

If the same material root cause survives two genuine remediation attempts, the phase remains
non-PASS after repeated targeted rechecks, or structural ambiguity changes design or authority, stop
ordinary patching. Re-ground the accepted authority and escalate to the operator or an already-approved
advisory lane. Do not silently switch models as an escalation mechanism.

Never force `PASS` or suppress a genuine defect.

## 8. Verdicts and closure

The independent reviewer ends with exactly one verdict:

`VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

- `PASS` — no material accepted-contract violation remains on the reviewed candidate.
- `CHANGES` — material defects are remediable inside the accepted phase.
- `BLOCK` — candidate is invalid or unreviewable, a structural impossibility or authority conflict
  exists, or critical evidence required by the accepted contract cannot be repaired in-lane.

After `PASS`, the owner verifies candidate identity and required gates before `CLOSE`.
Any material candidate change after `PASS` requires an appropriate targeted recheck in the same
review lineage.

## 9. Context and continuation

Pi context compaction, session age, or a long run is not by itself a handoff trigger. Re-ground first.

Use `.pi/skills/pi-handoff/SKILL.md` when a role can no longer recover its verified state reliably. A
continuation remains the same phase and role lineage; it is not a new phase or review round.

When a separate reviewer session needs continuation, continue that reviewer lineage when Pi supports
it. If a fresh session is unavoidable, transfer one verified handoff packet and treat the successor as
a continuation, not a fresh R1.