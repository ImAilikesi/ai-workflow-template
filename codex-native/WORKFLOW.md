# Codex-native phase workflow

This file is the normative Codex-native phase contract. Project `AGENTS.md` files define project
facts and local rules. Skills define execution procedure. Role presets define role behavior.
None of them should duplicate this contract.

## 1. Core model

Use the simplest topology that fits the phase. Separate contexts by responsibility, but preserve
one logical lineage for repeated work inside the same responsibility.

Native child/subagent routing is preferred in both native topologies whenever supported. “Fresh”
means a fresh isolated child context, not a separate principal Codex thread. Reviewer independence
comes from isolated context and role boundaries, not principal-thread status.

Normal non-phase work does not require this multi-agent lifecycle. Use it when the accepted project
plan or operator selects a phase gate.

Keep thread labels readable:

`<Phase> · <Model> · <Role>`

Add `· C<N>` only for a continuation.

## 2. Native topologies

### Default: Luna-owned phase

One Luna/Max parent owns phase orchestration, implementation, integration, remediation, verification,
candidate freeze, and `CLOSE|REOPEN|BLOCK`.

When supported, the Luna parent uses native children for these bounded roles:

- `pre_terra_readiness_reviewer` — Luna/Max, read-only.
- `independent_reviewer` — Terra/High, read-only.
- `critical_reviewer` — Terra/Max, read-only, only for the critical categories below.
- `sol_advisor` — Sol/High, read-only, optional.
- `volume_worker` — Luna/Max, bounded implementation only.

The Luna parent remains the phase owner. Children never gain closure authority.

### Critical: Sol Owner/Orchestrator

Use a Sol/High phase owner/orchestrator only for money, security, release, consequential data
integrity, trading truth, major architecture, cross-repository contracts, or an explicit operator
request.

The Sol parent owns the accepted contract, consequential decisions, review routing, and
`CLOSE|REOPEN|BLOCK`. It does not implement. When supported, it uses native children for:

- `luna_executor` — Luna/Max implementation and remediation.
- `pre_terra_readiness_reviewer` — Luna/Max readiness after writers stop.
- `independent_reviewer` or `critical_reviewer` — Terra/High or Terra/Max review after writers stop.
- `volume_worker` — bounded, disjoint Luna/Max work only.

Do not create a `sol_advisor` child in this topology; Sol already owns the phase.

The Luna/Max executor owns implementation, integration, tests, remediation, and candidate preparation
inside the accepted contract. It escalates scope, architecture, public behavior, risk posture, or
sequencing changes to Sol before acting.

If native child creation actually fails because of registration, runtime, platform, or supported-tool
limitations, a separate visible principal thread is an acceptable fallback. Record the reason once
and preserve the exact same role authority and lifecycle. Never create both a native child and a
fallback principal thread for the same logical role. Fallback does not change phase ownership,
convergence, review independence, or closure authority.

Do not use a Sol Owner/Orchestrator only because a phase is large, slow, or inconvenient.

### Project-level Master Control Room

The Master Control Room is an optional project/master-plan authority layer above the phase
topologies. Normal phase work does not need it. It is not a native child, not a role preset, not a
reviewer, and not a phase step. A phase never spawns it.

Run it in a dedicated visible principal thread labelled `<Project> · Sol High · Master Control Room`,
using GPT-5.6 Sol and High reasoning. The operator is the only authority above it. It has five
scopes:

1. plan formation and master-plan maintenance;
2. master authority resolution;
3. cross-phase reconciliation;
4. scoped integration sign-off;
5. final project sign-off.

It inspects the live repository, worktrees, branches, ledgers, plans, and evidence directly. It does
not implement ordinary phase code and does not replace the phase owner, Luna Readiness, Terra, or
phase closure. It never issues phase `READINESS`, Terra `VERDICT`, or phase `CLOSE|REOPEN|BLOCK`. It
may decide that a closed phase must be revisited, but the existing phase owner performs the formal
`REOPEN` after operator direction.

Normal communication is `Operator <-> Master Control Room`. The Master Control Room contacts a phase
owner only when the operator explicitly instructs it to deliver that directive. No phase owner,
executor, worker, readiness reviewer, Terra reviewer, or Sol Advisor uses it as a direct authority
channel; their artifacts are evidence only.

The Master Control Room may invoke `$sol-consult` on its own judgement when another Sol-level
reasoning pass is materially useful and the existing Sol Consult contract permits it. It never
invokes native `sol_advisor`.

Master sign-off uses `MASTER SIGN-OFF: PASS|CHANGES|BLOCK` with an exact scope and a diagnostic
`QUALITY SCORE: 0-100` against a `TARGET: 90+`. The target is a quality signal, not a gate; verdict
and score are independent. Master sign-off is never a mandatory phase step.

One Master Control Room lineage is intentionally long-lived. Continuation is health-based, with no
turn, token, age, phase, or compaction limit, and it does not use the phase `$handoff` skill.

`$master-control-room` owns the detailed procedure. This file owns only authority and topology.

### External Sol Consult advisory lane

`sol_consult` is an external advisory role available to the active phase owner in either native
topology. It runs in the repository's dedicated ChatGPT Project using standard Chat with GPT-5.6
Sol and High reasoning. It is not a native child, writer, reviewer, gate, phase owner, or
continuation lineage.

Use Sol Consult when a meaningful design, diagnosis, plan, implementation review, remediation, or
trade-off would benefit from another Sol-level reasoning pass and the needed context can be supplied
explicitly. It may receive substantial files, diffs, logs, tests, plans, and other evidence and may
reason deeply; do not artificially restrict it to small questions. Routine obvious work does not
need a consultation.

The Codex-side `$sol-consult` skill owns question framing, context selection, evidence preparation,
and transport. The dedicated ChatGPT Project owns the Sol Consult instructions, persistent core files,
and decision-chat history. The active phase owner remains responsible for the decision and all
implementation.

Sol Consult is supplied-context reasoning, not repository self-grounding. Treat every material claim
about current repository state as advisory until the active Codex owner verifies it against the live
tree. If the answer requires broad or unknown repository exploration, hidden caller/dependency
discovery, local commands, or other evidence that is not cheaply bounded, use native Sol Advisor in
a Luna-owned phase. In a Sol-owned critical phase, the Sol Owner/Orchestrator already owns
repo-grounded consequential decisions and may still use Sol Consult as an external second reasoning
pass.

Use one advisory lane for one decision. An escalation to native Sol Advisor replaces the Sol Consult
recommendation for that decision. Do not run both lanes on the same decision at the same time, and do
not count two advisory opinions as corroboration.

This lane rule governs phase-level decisions. Master Control Room use of Sol Consult is separate
project-level decision support and never gives Sol Consult master-plan authority.

Sol Consult never substitutes for a formal Sol Advisor convergence escalation, Luna Readiness, Terra
review, or phase closure. It must not issue workflow `READINESS`, Terra `VERDICT`, or
`CLOSE|REOPEN|BLOCK` decisions. Transport failure is non-blocking unless the accepted phase contract
explicitly requires the consultation.

## 3. Phase sequence

1. Re-ground from the live tree and accepted phase contract.
2. State the smallest acceptance proof and named deterministic gates.
3. Implement with one active owner for each changed file. The active owner may use Sol Consult for
   high-leverage supplied-context reasoning. Use bounded workers only for clearly disjoint work.
4. Run targeted verification during implementation and required phase gates before review.
5. Stop writers and freeze the review candidate.
6. Run Luna Readiness until its first `PASS`.
7. Start one fresh isolated Terra reviewer for the initial independent review.
8. On `CHANGES`, remediate in the owner/executor lane and return to the same Terra review lineage.
9. On `PASS`, the phase owner verifies the current candidate and gates, then issues `CLOSE` or `REOPEN`.
10. `BLOCK` is reserved for the narrow conditions in the review contract below.

A review result never authorizes commit, push, deploy, spend, secrets, destructive actions, or
external changes.

## 4. Candidate

A frozen candidate is the current in-scope project state after writers stop.

Record only what review needs:

- accepted phase/contract;
- current changed paths;
- relevant base/HEAD or worktree identity when available;
- gates and results;
- known exclusions or protected dirt;
- optional deterministic digest when critical work or project policy requires it.

Do not build manual chains of packet hashes, review-manifest hashes, or copied digests. If a digest
is needed, derive it mechanically from final bytes.

If the review surface changes while a reviewer is evaluating it, that verdict is stale. Freeze the
new candidate revision and re-enter the existing reviewer lineage with the delta.

Review infrastructure is evidence, not a product deliverable, unless the accepted phase explicitly
says otherwise.

## 5. Luna Readiness

Readiness is a pre-Terra filter, not the independent phase-end authority.

Create one isolated Luna/Max readiness lineage after the first candidate is frozen and reuse that
one lineage until its first PASS; then retire it for the rest of the phase. It receives the
accepted contract, candidate, named gates, and evidence needed to answer one question:

**Is this candidate ready to spend an independent Terra review on?**

Readiness checks acceptance coverage, obvious candidate/gate inconsistencies, and material omissions.
It must not duplicate a full Terra audit, add new requirements, or redesign the solution.

- `CHANGES` → owner/executor remediates, then the same readiness lineage rechecks.
- `BLOCK` → owner resolves the unreviewable/missing-critical-evidence condition, then the same lineage rechecks.
- first `PASS` → readiness retires for the rest of that phase lineage.

After the first readiness `PASS`, every later remediation goes directly to Terra. Do not recreate or
re-run readiness.

## 6. Terra review

Normal route: Terra/High. Use Terra/Max only for money, security, release, consequential data
integrity, trading truth, major architecture, cross-repository contracts, or explicit critical review.

The initial Terra R1 reviewer is fresh, isolated from builder history, read-only, and independent.
Later targeted rechecks reuse the same Terra lineage/thread; they do not create a replacement reviewer.

### Initial review

Review the complete accepted phase scope once. Report all substantiated material findings together.

A blocking finding must be:

1. inside accepted scope;
2. reachable or realistically possible;
3. material to correctness, safety, data, contract, or acceptance; and
4. require a code/design change to satisfy the accepted contract.

Anything else is a non-blocking `NOTE`.

### Rechecks

Reuse the same Terra review lineage. Rechecks are targeted to:

- prior findings;
- remediation delta;
- immediate affected callers/consumers; and
- necessary regression gates.

Do not silently turn a recheck into another full repository audit.

A new material defect caused or exposed by remediation is `NEW_FINDING`.
A defect that existed unchanged and was reasonably reviewable in the initial pass is `LATE_FINDING`.
A late finding can still be material, but it does not reset the review scope or authorize unrelated
re-audit.

A resolved finding reopens only on evidence of incomplete remediation or regression.

## 7. Review convergence

There is no automatic round cap and no endless ordinary patch loop.

- R1 is the full Terra review.
- R2 and later are targeted rechecks.
- If R3 is still non-PASS, emit `CONVERGENCE_ALERT`. This is a warning, not a block and not an automatic Sol call.
- If one bounded remediation is clearly sufficient, perform it and use R4 normally.

For a Luna-owned phase, invoke Sol Advisor for convergence when any of these is true:

- R3 and R4 are consecutive `BLOCK` verdicts;
- the phase is still non-PASS after R6;
- the same material root cause survives two genuine remediation attempts; or
- Luna identifies structural ambiguity where stronger reasoning is likely to change the outcome.

The native Sol Advisor consultation is bounded: diagnose the root cause, compare options, recommend
the smallest durable correction, and state what evidence would change the recommendation. Luna remains
owner and implements the decision. Earlier or informal Sol Consult use does not satisfy this formal
convergence escalation.

In a Sol-owned critical phase, the Sol Owner/Orchestrator performs the convergence decision directly.
Do not create a `sol_advisor` child merely to duplicate the phase owner.

A convergence decision may choose a root-cause remediation, review-scope correction, contract/design
amendment within existing authority, or operator escalation when scope/risk/authority must change.
Never force PASS or suppress a genuine defect.

## 8. Verdicts and closure

Terra ends with exactly one verdict:

`VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

- `PASS` — no material accepted-contract violation remains on the reviewed candidate.
- `CHANGES` — material defects are remediable inside the accepted phase.
- `BLOCK` — candidate is invalid/unreviewable, a structural impossibility or authority conflict exists,
  or critical evidence required by the accepted contract cannot be repaired in-lane.

`BLOCK` does not mean "many rounds happened."

After Terra `PASS`, the phase owner verifies that the reviewed candidate is still current and required
gates remain satisfied. Only then may the owner issue `CLOSE`.

Any material candidate change after PASS requires an appropriate Terra recheck in the same review
lineage before closure.

## 9. Context and continuation

Follow the global Context Continuity policy. Compaction count is not phase authority and is not by
itself a handoff trigger.

Use `.agents/skills/handoff/SKILL.md` when a role can no longer recover its current state reliably.
A continuation remains the same phase and role lineage; it is not a new review round or phase.

## 10. Native child completion

For a child created by the native multi-agent spawn path, keep the parent active and use one direct
child wait with the platform-supported long timeout. If the wait is wrapped in a running execution
cell, resume that same cell until the original wait returns.

An outer execution yield is not a child timeout. Do not terminate the wrapper, poll transcripts,
spawn duplicate children, create a fallback merely because a wait yielded, or restart the same role
merely because the outer cell yielded.

If native child creation itself fails for the limitations named above, use at most one fallback
principal for that logical role, record the reason once, and preserve the same authority/lifecycle.
Never create both the native child and fallback principal. A child wait failure is not a new child
creation failure; reconcile the existing child identity first.

If the actual child wait times out or becomes unavailable, preserve the child identity and current
phase state, then stop or use the supported continuation/callback path. Do not create a replacement
child until the existing child state is reconciled.
