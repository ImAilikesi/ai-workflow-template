---
name: phase-gate
description: Execute and close a Codex-native project phase using the repository's .codex/WORKFLOW.md.
---

# Codex-native phase gate

Use this skill only when the project workflow or accepted plan calls for phase-gated execution.
`.codex/WORKFLOW.md` is authoritative for topology, review, convergence, and closure.

## Procedure

1. **Re-ground**
   - Read project `AGENTS.md`, `.codex/WORKFLOW.md`, the accepted phase contract, relevant `CONTEXT.md`,
     and the live tree.
   - State the phase, selected topology, acceptance proof, named gates, and reserved decisions.

2. **Select topology**
   - Default: Luna/Max parent owns orchestration + execution.
   - Critical: Sol/High Control Room owns orchestration and uses native children when supported.
   - Do not create extra principals because work is merely large.

3. **Implement**
   - Keep file ownership clear.
   - Use external `$sol-consult` when a meaningful design, diagnosis, review, or trade-off would benefit
     from another Sol-level reasoning pass and the needed context can be supplied explicitly.
   - Use `volume_worker` only for disjoint bounded slices.
   - Prefer Sol Consult for supplied-context reasoning. In Luna-owned phases, use native `sol_advisor`
     when independent repository grounding is part of the task, Sol Consult exposes a material context
     gap that is not cheaply bounded, or the workflow's formal convergence conditions require it.
   - Run targeted verification while building.

4. **Freeze**
   - Run required gates.
   - Stop writers.
   - Record the current changed paths, candidate/worktree identity, gate results, and exclusions.
   - Do not create manual digest chains.

5. **Readiness**
   - If this phase lineage has never received readiness PASS, create or continue the one
     `pre_terra_readiness_reviewer`.
   - `CHANGES|BLOCK` → remediate, then continue the same readiness child.
   - first `PASS` → mark readiness complete and never invoke it again for this phase.

6. **Terra**
   - If no Terra review lineage exists, create one fresh `independent_reviewer` or allowed
     `critical_reviewer`.
   - R1 is full accepted-scope review.
   - After remediation, continue the same reviewer ID/context for targeted recheck.
   - Never create a replacement reviewer merely because the candidate changed.

7. **Remediate**
   - Fix accepted material findings as one coherent batch where practical.
   - Re-run affected gates.
   - Freeze the next candidate revision.
   - Return directly to Terra after readiness has passed.

8. **Convergence**
   - R3 non-PASS → record `CONVERGENCE_ALERT`.
   - If a bounded fix is clear, allow R4 normally.
   - In Luna-owned phases, invoke Sol Advisor when the workflow escalation conditions are met.
   - In Sol Control Room phases, Sol handles the convergence decision directly.
   - Never force PASS or hide findings.

9. **Close**
   - On Terra PASS, verify the reviewed candidate is still current and required gates remain green.
   - The active phase owner issues `CLOSE|REOPEN|BLOCK`.
   - Closure does not authorize commit, push, deploy, spend, secrets, destructive, or external actions.

## External Sol Consult handling

Sol Consult is an external advisory interaction, not a native child/subagent. It creates no writer,
reviewer, readiness, convergence, continuation, or closure lineage. Native child creation and wait
rules below do not apply to it.

Invoke `$sol-consult` to frame the question, select current evidence, and run the consultation in the
repository's dedicated ChatGPT Project. Sol Consult may analyze substantial supplied context and reason
deeply. The active owner consumes the recommendation, verifies material repository claims against the
live tree, and decides whether to implement, reject, request bounded additional evidence, or escalate
to native Sol Advisor. Use one advisory lane for one decision: an escalation replaces the Sol Consult
recommendation and does not keep two advisory opinions active for the same decision.

The skill owns transport and its own fallback. If the consultation cannot be completed on either
transport, continue without Sol Consult unless the accepted contract explicitly requires it. Do not
create a native Sol Advisor merely as a transport fallback; invoke it only when its own
reasoning/repository-grounding threshold is met. Sol Consult never replaces Luna Readiness, Terra, or
formal convergence escalation.

## Native child handling

Native child/subagent routing is preferred in both topologies when supported:

- A Luna-owned parent uses native `pre_terra_readiness_reviewer`, Terra `independent_reviewer` or
  `critical_reviewer`, `sol_advisor`, and bounded `volume_worker` children.
- A Sol Control Room parent uses native `luna_executor`, readiness, Terra reviewer, and bounded
  worker children. It does not create `sol_advisor`; Sol is already the Control Room.

“Fresh” means a fresh isolated child context, not a separate principal Codex thread. Reviewer
independence comes from isolated context and role boundaries, not principal-thread status. Terra R1
is fresh; later targeted rechecks reuse the same Terra lineage/thread. Readiness reuses one lineage
until first PASS, then retires.

If native child creation actually fails because of registration, runtime, platform, or supported-tool
limitations, a separate visible principal thread is an acceptable fallback. Record the reason once,
preserve the exact same role authority/lifecycle, and never create both for the same logical role.
Fallback does not change phase ownership, convergence, review independence, or closure authority.

Give every child a role-bound label:

- `<Phase> · Luna Max · Readiness`
- `<Phase> · Terra High · Review`
- `<Phase> · Terra Max · Critical Review`
- `<Phase> · Sol High · Advisor`
- `<Phase> · Luna Max · Executor`
- `<Phase> · Luna Max · Worker`

For native spawned children, use one direct long child wait. If the wait runs inside a wrapper cell
that yields while still active, resume that same cell until the original child wait returns. The outer
yield is not a child timeout.

Do not poll transcripts, duplicate children, start fallback reviewers, or create a second role lineage
because a wait yielded. A wait failure is not native creation failure; preserve the child identity and
reconcile its state before any replacement. Use a fallback only when native child creation itself
failed for the limitations above, and never create both paths.

## Context

Compaction is not a review or handoff boundary. Follow global Context Continuity. If the active role
can no longer recover its phase state reliably, invoke the `handoff` skill at a safe checkpoint.
