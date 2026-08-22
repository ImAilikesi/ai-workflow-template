# OpenCode-native phase workflow

This file is the normative OpenCode phase contract, wherever it is installed. Project `AGENTS.md`
defines project facts and local rules. Skills define procedure. Shipped subagents define isolated
roles. Do not duplicate this contract in project instructions.

## 1. Core model

Use one active OpenCode primary agent as phase owner, orchestrator, and normal executor. Use
subagents only where isolated context adds value: bounded research, bounded write slices, and
independent review.

Normal work does not require this lifecycle. Use it when the accepted plan or operator selects a
phase gate.

Shipped subagents omit `model` and reasoning overrides. OpenCode therefore gives each child the
model and reasoning effort of the primary agent that invoked it. Nothing in this package pins a
provider, a model, or a reasoning level.

Keep labels readable:

`<Phase> · OpenCode · <Role>`

Add the actual model only as useful evidence. Add `· C<N>` only for a continuation.

## 2. Topology

### Owner

One primary agent owns the accepted contract, orchestration, integration, remediation, verification,
candidate freeze, and `CLOSE|REOPEN|BLOCK`. The owner remains responsible for every accepted change,
including work done by delegates.

Three shipped subagents serve as bounded lanes:

- `researcher` — read-only investigation of one bounded question;
- `worker` — one bounded write slice: named paths, one goal, defined done-state, real gate output;
- `reviewer` — read-only independent review of a frozen candidate, then targeted rechecks until
  `VERDICT: PASS`.

Researchers never write or decide. Workers stay inside their slice and never delegate or land
anything. Run researchers and independent workers in parallel only when their lanes do not depend on
each other.

### Authority boundaries

- `researcher`: deny edit, bash, and nested delegation.
- `worker`: allow edits inside the slice; deny commit, push, branch moves, deploys, and delegation.
- `reviewer`: deny edit, bash except read-only git inspection, and nested delegation.
- No subagent commits, pushes, deploys, uses secrets, or takes destructive or external actions.
- The landing gate applies to every session in this OpenCode process, including subagent sessions,
  so a landing command from any lane stays mechanically blocked until the matching verdicts exist.

### Review lineage

Subagents run in child sessions. Preserve one logical review lineage in the parent with the accepted
contract, review round, material findings, resolved findings, candidate identity, and recheck scope.

R1 uses one fresh reviewer child. Later rechecks should continue that child session when practical.
If continuation is unavailable, invoke the same reviewer role with an explicit review-state packet.
A fresh child session is not permission to run another full R1.

## 3. Phase sequence

1. Re-ground from project `AGENTS.md`, this workflow, the accepted phase contract, relevant
   `CONTEXT.md`, and the live tree.
2. State the smallest acceptance proof and named deterministic gates.
3. Implement in the owner lane, or delegate bounded write slices to `worker`. Use `researcher` only
   for a bounded read-only question that materially helps the owner.
4. Run targeted verification while building and required phase gates before review.
5. Stop all writers and freeze the review candidate.
6. Start one fresh independent review lineage for the initial full review.
7. On `CHANGES`, remediate in the owner lane, re-run affected gates, freeze the next candidate, and
   return to the same logical review lineage for a targeted recheck.
8. On reviewer `PASS`, run the cross-model terra review (section 8).
9. After both verdicts are `PASS`, verify that the reviewed candidate is still current and required
   gates remain satisfied, then issue `CLOSE` or `REOPEN`.
10. Use `BLOCK` only for the narrow conditions in the review contract below.

A review result never authorizes commit, push, deploy, spend, secrets, destructive actions, or other
external changes. The landing gate plugin mechanically blocks those commands until the matching
verdicts exist in the session transcript.

## 4. Candidate

A frozen candidate is the current in-scope project state after writers stop.

Record only what review needs:

- accepted phase and contract;
- current changed paths;
- relevant base, HEAD, branch, or worktree identity when available;
- named gates and results;
- known exclusions or protected dirt;
- exact review round;
- prior findings and remediation delta for a recheck.

If the review surface changes while a reviewer evaluates it, that verdict is stale. Freeze the new
candidate revision and return to the same logical review lineage with the delta.

## 5. Independent review

The single `reviewer` role covers normal work and critical categories alike. Treat money, security,
release machinery, consequential data integrity, trading truth, major architecture, cross-repository
contracts, and any explicit operator request as critical: apply the stricter skepticism described in
its prompt, and always run terra review afterwards regardless of phase position.

### Initial review

R1 receives the frozen candidate, accepted contract, named gates, and necessary evidence. Do not
provide builder reasoning that could bias the review. Review the complete accepted phase scope once
and report all substantiated material findings together.

A blocking finding must be:

1. inside accepted scope;
2. reachable or realistically possible;
3. material to correctness, safety, data, contract, or acceptance; and
4. require a code or design change to satisfy the accepted contract.

Anything else is a non-blocking `NOTE`.

### Rechecks

Reuse the same logical reviewer lineage. Rechecks target only prior findings, the remediation delta,
immediate affected callers or consumers, and necessary regression gates. Do not silently turn a
recheck into another full repository audit.

A new material defect caused or exposed by remediation is `NEW_FINDING`. A defect that existed
unchanged and was reasonably reviewable in R1 is `LATE_FINDING`. A late finding can still be
material, but it does not reset review scope.

## 6. Convergence

There is no automatic review-round cap and no endless ordinary patch loop.

- R1 is the full independent review.
- R2 and later are targeted rechecks.
- If R3 is still non-PASS, emit `CONVERGENCE_ALERT`.
- If one bounded remediation is clearly sufficient, perform it and continue the same lineage.

If the same material root cause survives two genuine remediation attempts, repeated targeted
rechecks remain non-PASS, or structural ambiguity changes design or authority, stop ordinary
patching. Re-ground the accepted authority and escalate to the operator or an approved advisory
lane. Never force `PASS` or suppress a genuine defect.

## 7. Verdicts and closure

The reviewer ends with exactly one verdict:

`VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

- `PASS` — no material accepted-contract violation remains on the reviewed candidate.
- `CHANGES` — material defects are remediable inside the accepted phase.
- `BLOCK` — candidate is invalid or unreviewable, a structural impossibility or authority conflict
  exists, or critical evidence required by the accepted contract cannot be repaired in-lane.

After reviewer `PASS`, terra must also return `PASS` before the phase may land anything irreversible.
Any material candidate change after either `PASS` requires the corresponding recheck again.

## 8. Terra review

Terra is one independent cross-model pass through the Codex CLI in a read-only sandbox. It reviews
evidence; it never edits the tree. Run the `terra-review` skill:

1. at every phase boundary, after reviewer `PASS`;
2. always, when a critical category changed, even mid-phase;
3. before every push, publish, merge, release upload, or deploy.

Terra ends with exactly one verdict recorded verbatim in the session:

`TERRA VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

On `CHANGES`, route confirmed defects back through build and review, obtain a fresh reviewer `PASS`,
and run terra again. On `BLOCK`, stop and surface the blocker. The newest terra verdict replaces
older ones.

## 9. Context and continuation

Compaction, session age, or a long run is not by itself a handoff trigger. Re-ground first.

Use the handoff skill when a role can no longer recover its verified state reliably. A continuation
remains the same phase and role lineage; it is not a new phase or review round.
