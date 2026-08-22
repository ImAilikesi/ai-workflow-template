# Command Code-native phase workflow

This file is the normative Command Code phase contract. Project `AGENTS.md` defines project facts and
local rules. Skills define procedure. Custom agents under `.commandcode/agents/` define isolated
read-only roles. Do not duplicate this contract in project instructions.

## 1. Core model

Use one active Command Code session as phase owner and normal executor. Use custom agents only for
bounded research, readiness, and independent review where isolated context adds value.

Normal work does not require this lifecycle. Use it when the accepted plan or operator selects a
phase gate.

The shipped package does not pin a provider or model. Command Code model selection remains a
session/user concern. Do not add model-specific workflow behavior unless the accepted project
contract explicitly requires it.

Keep labels readable:

`<Phase> · Command Code · <Role>`

Add the actual model only when useful evidence. Add `· C<N>` only for a continuation.

## 2. Native topology

### Owner/executor

One Command Code parent owns the accepted contract, implementation, integration, remediation,
verification, candidate freeze, and `CLOSE|REOPEN|BLOCK`.

Project custom agents under `.commandcode/agents/` provide these bounded roles:

- `workflow-research-worker` — read-only investigation of one bounded question;
- `workflow-readiness-reviewer` — read-only pre-review check after writers stop;
- `workflow-independent-reviewer` — read-only independent review of the frozen candidate;
- `workflow-critical-reviewer` — stricter independent review for money, security, release,
  consequential data integrity, trading truth, major architecture, cross-repository contracts, or an
  explicit operator request.

Research workers never write, review, or decide. Stop active research work before candidate freeze.
The parent remains responsible for every accepted change.

### Read-only boundary

The shipped custom agents expose read-only tool sets and also state read-only authority in their
prompts. Readiness and review agents must not edit, create, delete, rename, format, commit, push,
deploy, use secrets, or take destructive or external actions.

### Review lineage

Each custom agent has isolated context. Preserve one logical review lineage in the parent with the
accepted contract, review round, material findings, resolved findings, candidate identity, and
recheck scope.

R1 uses a fresh independent-review context. Later rechecks use the same logical reviewer role and the
accumulated review state. Do not interpret a fresh internal context as permission to run another full
R1.

If the active product can continue the same custom-agent context, prefer that continuation.
Otherwise the explicit review-state packet is the lineage boundary.

## 3. Phase sequence

1. Re-ground from project `AGENTS.md`, `.commandcode/WORKFLOW.md`, the accepted phase contract,
   relevant `CONTEXT.md`, and the live tree.
2. State the smallest acceptance proof and named deterministic gates.
3. Implement with one active owner for each changed file. Use `workflow-research-worker` only for a
   bounded read-only question that materially helps the owner.
4. Run targeted verification while building and required phase gates before review.
5. Stop writers and freeze the review candidate.
6. Run one readiness lineage until its first `PASS`.
7. Start one fresh independent review lineage for the initial full review.
8. On `CHANGES`, remediate in the owner lane, re-run affected gates, freeze the next candidate, and
   return to the same logical review lineage for a targeted recheck.
9. On `PASS`, verify that the reviewed candidate is still current and required gates remain
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
- exact review role and current round;
- prior findings and remediation delta for a recheck.

If the review surface changes while a reviewer is evaluating it, that verdict is stale. Freeze the
new candidate revision and return to the same logical review lineage with the delta.

## 5. Readiness

Readiness is a pre-review filter, not phase-end authority.

Invoke `workflow-readiness-reviewer` after the first candidate is frozen. Give it the accepted
contract, candidate, named gates, and evidence needed to answer:

**Is this candidate ready for an independent review?**

Readiness checks acceptance coverage, obvious candidate/gate inconsistencies, and material omissions.
It must not redesign the solution, add requirements, or duplicate the full independent review.

- `CHANGES` — owner remediates, then readiness rechecks.
- `BLOCK` — owner resolves the unreviewable or missing-critical-evidence condition, then readiness
  rechecks.
- first `PASS` — readiness retires for the rest of that phase lineage.

After the first readiness `PASS`, later remediation returns directly to independent review.

## 6. Independent review

Use `workflow-independent-reviewer` for normal work and `workflow-critical-reviewer` for the critical
categories named above.

### Initial review

R1 receives the frozen candidate, accepted contract, named gates, and necessary candidate evidence.
Do not provide builder reasoning that could bias the review. Review the complete accepted phase scope
once and report all substantiated material findings together.

A blocking finding must be:

1. inside accepted scope;
2. reachable or realistically possible;
3. material to correctness, safety, data, contract, or acceptance; and
4. require a code or design change to satisfy the accepted contract.

Anything else is a non-blocking `NOTE`.

### Rechecks

Reuse the same logical reviewer lineage. Rechecks are targeted to:

- prior findings;
- remediation delta;
- immediate affected callers or consumers; and
- necessary regression gates.

Do not silently turn a recheck into another full repository audit.

A new material defect caused or exposed by remediation is `NEW_FINDING`. A defect that existed
unchanged and was reasonably reviewable in R1 is `LATE_FINDING`. A late finding can still be material,
but it does not reset review scope.

## 7. Convergence

There is no automatic review-round cap and no endless ordinary patch loop.

- R1 is the full independent review.
- R2 and later are targeted rechecks.
- If R3 is still non-PASS, emit `CONVERGENCE_ALERT`.
- If one bounded remediation is clearly sufficient, perform it and continue the same lineage.

If the same material root cause survives two genuine remediation attempts, repeated targeted
rechecks remain non-PASS, or structural ambiguity changes design or authority, stop ordinary
patching. Re-ground the accepted authority and escalate to the operator or an already-approved
advisory lane. Do not switch models merely to seek a different verdict.

Never force `PASS` or suppress a genuine defect.

## 8. Verdicts and closure

The independent reviewer ends with exactly one verdict:

`VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

- `PASS` — no material accepted-contract violation remains on the reviewed candidate.
- `CHANGES` — material defects are remediable inside the accepted phase.
- `BLOCK` — candidate is invalid or unreviewable, a structural impossibility or authority conflict
  exists, or critical evidence required by the accepted contract cannot be repaired in-lane.

After `PASS`, the owner verifies candidate identity and required gates before `CLOSE`.
Any material candidate change after `PASS` requires a targeted recheck in the same logical reviewer
lineage.

## 9. Context and continuation

Compaction, session age, or a long run is not by itself a handoff trigger. Re-ground first.

Use `.commandcode/skills/commandcode-handoff/SKILL.md` when a role can no longer recover its verified
state reliably. A continuation remains the same phase and role lineage; it is not a new phase or
review round.
