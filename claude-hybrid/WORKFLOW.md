# Claude-hybrid phase workflow

This file is the normative Claude-hybrid phase contract. Project `CLAUDE.md` defines project facts
and local rules. Skills define procedure. Codex role presets define independent review/advisory roles.

## 1. Core model

Claude is the implementation environment. Codex supplies independent review and optional bounded
advisory reasoning.

Keep labels readable:

`<Phase> · <Model> · <Role>`

Add `· C<N>` only for a continuation.

Normal non-phase work does not require this lifecycle.

## 2. Topology

One Opus parent owns phase orchestration, implementation, integration, remediation, verification,
candidate freeze, and `CLOSE|REOPEN|BLOCK`.

Codex-side roles:

- Luna/Max Readiness — one pre-Terra lineage until first PASS.
- Terra/High — normal independent review.
- Terra/Max — critical review only for the named critical categories.
- Sol/High Advisor — optional and less readily invoked than in Luna-native workflow.

There is no default Sol Owner/Orchestrator in the Claude workflow.

Sol Advisor is reserved for unresolved material architectural/strategic ambiguity, repeated review
convergence problems, or explicit operator request. Opus should decide routine and ordinary difficult
implementation questions itself.

## 3. Phase sequence

1. Re-ground from the live tree and accepted contract.
2. State the smallest acceptance proof and deterministic gates.
3. Opus implements and verifies the phase.
4. Stop writers and freeze the candidate.
5. Send a bounded candidate packet to one Luna/Max Readiness lineage until its first `PASS`.
6. Start one fresh Terra reviewer for the initial independent review.
7. On `CHANGES`, Opus remediates and returns to the same Terra review lineage.
8. On `PASS`, Opus verifies the candidate and gates, then issues `CLOSE` or `REOPEN`.

Provider boundaries do not change authority. Do not copy builder transcripts into Codex reviewer
contexts.

## 4. Candidate

A frozen candidate is the current in-scope project state after writers stop.

The cross-provider packet should contain only:

- accepted phase/contract;
- current changed paths;
- relevant base/HEAD or worktree identity when available;
- named gates and results;
- known exclusions/protected dirt; and
- optional mechanically derived digest when critical work or project policy requires it.

Do not create manual digest chains or workflow-owned evidence graphs.

If project bytes change during review, the verdict is stale. Freeze the new candidate revision and
return to the same reviewer lineage with the delta.

## 5. Luna Readiness

Readiness asks only whether the candidate is ready to spend an independent Terra review on.

Use one isolated Luna/Max readiness lineage:

- `CHANGES` or `BLOCK` → Opus remediates, same readiness lineage rechecks.
- first `PASS` → readiness retires for that phase.

After first readiness PASS, every later remediation goes directly to Terra.

Readiness is non-authoritative. It must not duplicate Terra's full audit, redesign the solution, or
add requirements.

## 6. Terra review

Terra/High is normal. Terra/Max is only for money, security, release, consequential data integrity,
trading truth, major architecture, cross-repository contracts, or explicit critical review.

The initial Terra context is fresh, read-only, independent, and receives no builder transcript.

R1 is a full accepted-scope review. A blocking finding must be in scope, realistically reachable,
material to the accepted contract, and require a code/design change to satisfy it. Everything else is
a non-blocking `NOTE`.

R2+ reuses the same Terra lineage and is targeted to prior findings, remediation delta, immediate
affected callers/consumers, and necessary regression gates. Do not repeat a whole-repository audit.

Use `NEW_FINDING` for a material defect caused or exposed by remediation.
Use `LATE_FINDING` when the defect existed unchanged and was reasonably reviewable in R1.

## 7. Review convergence

R3 non-PASS produces `CONVERGENCE_ALERT`, not an automatic block.

If one bounded remediation is clearly sufficient, Opus performs it and proceeds to R4.

Sol Advisor becomes appropriate only when stronger reasoning is likely to change the outcome. Normal
late-stage triggers are:

- R3 and R4 are consecutive `BLOCK` verdicts;
- the phase remains non-PASS after R6;
- the same material root cause survives two genuine remediation attempts; or
- Opus identifies a structural contradiction it cannot resolve confidently.

Because Opus is already the primary high-capability thinker, do not invoke Sol for routine architecture,
ordinary rechecks, or merely because R3 emitted an alert.

The consultation is bounded and advisory. Opus decides and implements.

## 8. Verdicts and closure

Terra ends:

`VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

`BLOCK` is reserved for invalid/unreviewable candidate state, structural impossibility, authority
conflict, or critical accepted evidence that cannot be repaired in-lane. It is not a round-count verdict.

After PASS, Opus verifies the current candidate and gates before `CLOSE`. Any material change after
PASS requires a targeted Terra recheck in the same lineage.

Review never authorizes commit, push, deploy, spend, secrets, destructive actions, or external changes.

## 9. Cross-provider communication

Keep messages bounded to the contract, candidate state, evidence, findings, decisions, and next action.
Do not relay full transcripts.

Reuse the same Codex readiness/reviewer task for rechecks when the provider path supports it. If a role
must continue in a new session because context is genuinely degraded or unavailable, use the handoff
skill and preserve the same logical role lineage and review scope.

Do not emulate unsupported polling, callback, or task-control primitives. Use only provider-supported
messaging and completion mechanisms.

## 10. Context and continuation

Follow the global Context Continuity policy. Compaction count does not by itself require a handoff.
Use the hybrid handoff skill only when the active role cannot recover its state reliably.
