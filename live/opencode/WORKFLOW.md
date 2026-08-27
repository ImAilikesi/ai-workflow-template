# OpenCode Workflow

OpenCode is a direct coding cockpit. Keep its workflow lighter than the Codex control-plane workflow.

## Default

One primary agent owns the task, implementation, integration, verification, and final response. Ordinary work does not require subagents or review.

## Substantial work

1. Re-ground from project instructions and the live tree. State the requested outcome and smallest acceptance proof.
2. Implement in the primary lane. Use `worker` only for a genuinely independent write slice with named paths and a clear done-state.
3. Run relevant verification and stop writers.
4. For substantial, risky, or explicitly reviewed work, start one isolated `reviewer` with the requirements, current diff/candidate, and verification evidence.
5. On `CHANGES`, remediate in the primary lane and use the same reviewer lineage for a targeted recheck when possible.
6. On `PASS`, the primary agent confirms the candidate is still current and finishes.

Do not create phase names, readiness gates, ledgers, round counters, or cross-model review ceremonies. Add another lane only when it solves a concrete problem.

## Roles

- `worker` — bounded write slice; no delegation or landing actions.
- `reviewer` — isolated read-only review; no edits.

Multiple workers may run only when their ownership does not overlap.

## Verdict

Reviewer verdict:

`VERDICT: PASS|CHANGES|BLOCK — <one-line reason>`

A material finding must be in scope, realistically reachable, and consequential to correctness, safety, data, contract, or acceptance. Optional hardening is a note.

Review does not authorize commit, push, deploy, spend, credentials, destructive actions, or external changes.
