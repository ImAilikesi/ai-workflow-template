---
name: sol-consult
description: Run an external GPT-5.6 Sol/High consultation in the repository's dedicated ChatGPT Project through the official Codex built-in browser when a meaningful design, diagnosis, plan, implementation review, remediation, or trade-off would benefit from another strong reasoning pass. Prefer this supplied-context lane over native Sol Advisor when the required evidence is known and bounded; do not use it for routine obvious work or as a workflow gate.
---

# Sol Consult

Use this skill to gain high-leverage Sol reasoning without moving phase authority or implementation out
of the active Codex owner lane.

Read `references/consult-contract.md` before the first consultation in a repository or whenever routing,
authority, transport authorization, context, or escalation is uncertain. Read
`references/chatgpt-project-instructions.md` only when creating or repairing the repository's ChatGPT
Project.

## Trigger

Use Sol Consult when another deep reasoning pass is likely to materially improve a non-trivial decision,
including architecture, design trade-offs, difficult diagnosis, plan critique, candidate/diff review,
Terra-finding analysis, remediation strategy, algorithm choices, or simplification.

Do not invoke it only because work is large, slow, or routine. It is optional advisory leverage, not a
mandatory gate.

## Route

1. Re-ground from the live tree, accepted contract/plan, current verification state, and the exact
   decision that needs help.
2. Prefer Sol Consult when the material evidence is known and can be supplied explicitly.
3. Use native `sol_advisor` in a Luna-owned phase when the task requires broad or unknown repository
   exploration, hidden caller/dependency discovery, local commands, a material context gap that is not
   cheaply bounded, or a formal workflow escalation that specifically requires Sol Advisor.
4. In a Sol Control Room phase, Sol Consult remains available as an external second reasoning pass, but
   it never duplicates or replaces Control Room authority.

## Build the consultation

Use the smallest evidence set that lets Sol answer well, not the smallest token count.

Treat the ChatGPT Project's persistent core files as baseline context. Add current per-consult evidence
as needed:

- exact source/config files;
- relevant tests and schemas;
- current diff or patch;
- logs, traces, or failure output;
- Terra/readiness findings when analyzing remediation;
- current accepted plan/phase contract;
- current `CONTEXT.md` or `MEMORY.md` when materially relevant;
- a fresh core file when its exact current wording matters or the persistent project copy may be stale.

Never upload `.env`, credentials, auth tokens, private keys, secrets, or unrelated private data. Check
`.gitignore` and project safety rules before you upload generated or ignored material.

Create a concise consultation prompt with:

- `IDENTITY`: `<Phase or workstream> · Sol High · Consult`;
- one explicit decision/question;
- objective and accepted constraints;
- what evidence is attached and why;
- known uncertainty;
- the requested output from `references/consult-contract.md`.

Do not artificially limit reasoning depth. The ChatGPT-side role may spend substantial time analyzing a
hard supplied-context problem.

## Run the consultation

Transport is automatic and needs no per-consult approval. Use the official Codex built-in browser under
the standing authorization in `references/consult-contract.md`. Do not ask the operator to open ChatGPT,
copy the prompt, attach files, or return the answer.

1. Open ChatGPT in the built-in browser and go to the repository's Project `Sol Consult · <Project>`.
2. Continue the existing decision chat for a direct follow-up on the same decision. Start a new chat in
   the same Project for a materially different decision.
3. Confirm the chat uses GPT-5.6 Sol with High reasoning before substantive analysis, and set it if the
   interface permits. Never silently substitute another model or a lower reasoning mode.
4. Upload the selected evidence and submit the prompt.
5. Wait until the response is complete, then read the complete response back into Codex.

Let the browser and the ChatGPT Project own authentication and chat history. Do not build persisted
browser state, a scraper, an API transport, polling, or a transcript mirror.

Stop and ask the operator only in the cases listed in `references/consult-contract.md`.

## Fallback transport

Use `scripts/prepare_consult.py` only when browser transport is genuinely unavailable or blocked, such
as login that needs operator interaction, a missing browser capability, a Project that cannot be
identified safely, a failed upload, or a model/reasoning mode that cannot be established.

The helper writes one temporary folder with `PROMPT.md`, the selected attachments, and a SHA-256
manifest, and can copy the prompt to the macOS clipboard and reveal the folder in Finder. It makes no
network call. The operator then completes that one consultation by hand.

A transport failure never invokes native Sol Advisor by itself. Use native `sol_advisor` only when its
own routing threshold is met.

## Consume the answer

The active Codex owner must:

1. Separate recommendation from repository facts.
2. Verify every material repository-state claim against the live tree before acting.
3. Accept, reject, or adapt the recommendation under the accepted contract.
4. Request bounded extra evidence in the same consultation chat when the missing context is known and
   small.
5. Escalate to native Sol Advisor when independent repository discovery is the real missing capability.

Sol Consult is never a writer, reviewer, readiness gate, Terra substitute, phase owner, or closure
authority. It must not be treated as having issued `READINESS`, Terra `VERDICT`, or
`CLOSE|REOPEN|BLOCK` decisions.

If both transports fail, continue normally unless the accepted contract explicitly requires the
consultation. Do not create process overhead merely to preserve the advisory lane.
