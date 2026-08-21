# DSH-native phase workflow

This file is the normative DSH-native phase contract. Project `AGENTS.md` files define project facts
and local rules. Skills define execution procedure. Do not duplicate this contract in project files.

## 1. Core model

Use one active DSH parent as the phase owner and normal executor. Separate contexts only when a
bounded research, readiness, or review responsibility benefits from isolation.

Normal non-phase work does not require this lifecycle. Use it when the accepted project plan or the
operator selects a phase gate.

No shipped DSH workflow file pins a provider or model. For DSH in-process children, omit provider and
model overrides so the child inherits the active parent's provider and model. If a configured child
transport does not preserve that behavior, do not silently switch models: use a same-model route that
is already configured or use the visible-session fallback and record the reason.

Keep labels readable:

`<Phase> · DSH · <Role>`

Add the actual model only when it is useful evidence. Add `· C<N>` only for a continuation.

## 2. Native topology

### Owner/executor

One DSH parent owns the accepted contract, orchestration, implementation, integration, remediation,
verification, candidate freeze, and `CLOSE|REOPEN|BLOCK`.

The owner may use DSH subagents for these bounded roles when the active DSH composition provides the
required subagent capability:

- **research worker** — read-only investigation of one bounded question;
- **readiness reviewer** — read-only pre-review check after writers stop;
- **independent reviewer** — read-only independent review of the frozen candidate;
- **critical reviewer** — the same independent role with a stricter prompt for money, security,
  release, consequential data integrity, trading truth, major architecture, cross-repository
  contracts, or an explicit operator request.

Role differences are authority and task differences, not model pins. Children use the parent's
provider and model by default.

The owner may use the DSH `workflow` capability only when real independent fan-out justifies scripted
orchestration. Ordinary delegation should use the simpler subagent path. Do not create parallel work
only because the capability exists.

Research workers never write, review, or decide. Stop active research work before candidate freeze.
The owner remains responsible for every accepted change.

### Capability fallback

DSH subagent and workflow capabilities are optional composition seams. If the required capability is
not present, use one dedicated visible DSH session for that logical role. Preserve the same authority,
model choice, candidate, and lineage. Never create both a native child and a fallback session for the
same logical role.

If a child transport cannot continue the same reviewer lineage for a targeted recheck, keep one
visible reviewer session for that phase instead of creating a fresh reviewer for every round.

## 3. Phase sequence

1. Re-ground from project `AGENTS.md`, `.dsh/WORKFLOW.md`, the accepted phase contract, relevant
   `CONTEXT.md`, and the live tree.
2. State the smallest acceptance proof and named deterministic gates.
3. Implement with one active owner for each changed file. Use read-only research delegation only
   where it reduces uncertainty or provides useful parallel breadth.
4. Run targeted verification while building and the required phase gates before review.
5. Stop writers and freeze the review candidate.
6. Run one readiness lineage until its first `PASS`.
7. Start one fresh independent review lineage for the initial full review.
8. On `CHANGES`, remediate in the owner lane, re-run affected gates, freeze the next candidate, and
   return to the same review lineage for a targeted recheck.
9. On `PASS`, verify that the reviewed candidate is still current and the required gates remain
   satisfied, then issue `CLOSE` or `REOPEN`.
10. Use `BLOCK` only for the narrow conditions in the review contract below.

A review result never authorizes commit, push, deploy, spend, secrets, destructive actions, or other
external changes.

## 4. Candidate

A frozen candidate is the current in-scope project state after writers stop.

Record only what review needs:

- accepted phase and contract;
- current changed paths;
- relevant base, HEAD, branch, or worktree identity when available;
- named gates and results;
- known exclusions or protected dirt;
- a deterministic digest only when the accepted contract or project policy requires one.

If the review surface changes while a reviewer is evaluating it, that verdict is stale. Freeze the
new candidate revision and return to the same reviewer lineage with the delta.

## 5. Readiness

Readiness is a pre-review filter, not the independent phase-end authority.

Create one isolated readiness lineage after the first candidate is frozen. Keep it read-only. Give it
the accepted contract, candidate, named gates, and evidence needed to answer one question:

**Is this candidate ready for an independent review?**

Readiness checks acceptance coverage, obvious candidate/gate inconsistencies, and material omissions.
It must not redesign the solution, add new requirements, or duplicate the full independent review.

- `CHANGES` — owner remediates, then the same readiness lineage rechecks.
- `BLOCK` — owner resolves the unreviewable or missing-critical-evidence condition, then the same
  readiness lineage rechecks.
- first `PASS` — readiness retires for the rest of that phase lineage.

After the first readiness `PASS`, later remediation returns directly to the independent reviewer.

## 6. Independent review

The initial reviewer is fresh, isolated from builder history, read-only, and scope-bound. Use the
critical reviewer prompt for the critical categories named above; it still inherits the parent model.

### Initial review

Review the complete accepted phase scope once. Report all substantiated material findings together.

A blocking finding must be:

1. inside accepted scope;
2. reachable or realistically possible;
3. material to correctness, safety, data, contract, or acceptance; and
4. require a code or design change to satisfy the accepted contract.

Anything else is a non-blocking `NOTE`.

### Rechecks

Reuse the same review lineage. Rechecks are targeted to:

- prior findings;
- remediation delta;
- immediate affected callers or consumers; and
- necessary regression gates.

Do not silently turn a recheck into another full repository audit.

A new material defect caused or exposed by remediation is `NEW_FINDING`. A defect that existed
unchanged and was reasonably reviewable in the initial pass is `LATE_FINDING`. A late finding can
still be material, but it does not reset the review scope.

## 7. Convergence

There is no automatic review-round cap and no endless ordinary patch loop.

- R1 is the full independent review.
- R2 and later are targeted rechecks.
- If R3 is still non-PASS, emit `CONVERGENCE_ALERT`.
- If one bounded remediation is clearly sufficient, perform it and continue the same lineage.

If the same material root cause survives two genuine remediation attempts, the phase remains
non-PASS after repeated targeted rechecks, or the owner identifies structural ambiguity that may
change the design, stop ordinary patching. Re-ground the accepted authority and ask the operator for
an explicit design/authority decision or use an already-approved advisory lane. Do not silently pin a
different model as an escalation mechanism.

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

Compaction, session age, or a long run is not by itself a handoff trigger. Re-ground first.

Use `.dsh/skills/handoff/SKILL.md` when a role can no longer recover its current state reliably. A
continuation remains the same phase and role lineage; it is not a new phase or review round.

## 10. Child handling

Prefer in-process DSH children when the configured composition supports them because they inherit the
parent provider and model unless explicitly overridden. Do not supply provider or model overrides in
this workflow.

Use one child identity for one logical role. If a wait or host wrapper yields, reconcile that child
before creating anything else. Do not duplicate a child because its result is slow or because a
wrapper yielded.

Read-only is an authority rule even when the active child provider cannot technically remove write
or shell tools. A readiness or review child must not edit files, run destructive commands, commit,
push, deploy, or take external actions.