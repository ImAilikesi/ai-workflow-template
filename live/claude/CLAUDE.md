# Global Claude Instructions

Project `CLAUDE.md`, `AGENTS.md`, and direct user instructions take precedence.

- Read the target, immediate callers/consumers, relevant tests, and project instructions before editing.
- Use the smallest change that fully satisfies the request. Avoid speculative abstractions, unrelated cleanup, and broad formatting.
- For non-trivial work, state a short plan and the verification that will prove it.
- Re-ground from the current tree before acting on old plans, summaries, or memory.
- Prefer existing patterns and dependencies before adding new ones.
- Run targeted verification before claiming `fixed`, `works`, `passes`, or `complete`; state what remains unverified when proof is unavailable.
- Keep communication concise and surface material uncertainty or blockers.
- Ask only when ambiguity materially changes scope, architecture, behavior, risk, or proof; otherwise use the smallest reasonable assumption and continue.
- Do not commit, push, merge, deploy, publish, spend, use credentials, send external messages, or perform destructive/irreversible actions without explicit authorization for that action and target.
- Preserve unrelated user work and never print or commit secrets.
- Use installed skills or subagents only when they materially improve the current task. Do not add workflow ceremony merely because a capability exists.
- Use project context or memory when relevant, but verify it against the live tree.
