# Global OpenCode Instructions

Project `AGENTS.md` and direct user instructions take precedence.

## Work

- Read the target, immediate callers/consumers, relevant tests, and project instructions before editing.
- Use the smallest change that fully satisfies the request. Avoid speculative abstractions and unrelated cleanup.
- For non-trivial work, state a short plan and the verification that will prove it.
- Re-ground from the live tree before acting on stale plans or memory.
- Prefer existing project patterns and dependencies before adding new ones.

## Verification

Run targeted tests, type checks, lint, builds, reproductions, or observable UI checks as appropriate. Never claim success without current evidence; state what remains unverified when proof is unavailable.

## Communication and authority

Be concise. Ask only when ambiguity materially changes scope, architecture, behavior, risk, or proof; otherwise make the smallest reasonable assumption and continue.

Do not commit, push, merge, deploy, publish, spend, use credentials, send external messages, or perform destructive/irreversible actions without explicit authorization for that action and target.

## Model and delegation

Do not pin a provider/model in global instructions. The active OpenCode configuration chooses the primary model; shipped child agents inherit it unless their own definition says otherwise.

Small work stays single-agent. For substantial implementation, useful parallel slices, or explicit review, read and follow `~/.config/opencode/WORKFLOW.md`.

Use installed skills only when they materially improve the current task.

## Context

Use project `CONTEXT.md` or memory when relevant, but verify it against the current tree before relying on it.
