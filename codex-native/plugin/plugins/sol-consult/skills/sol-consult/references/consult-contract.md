# Sol Consult contract

## Purpose

Sol Consult is the external, supplied-context GPT-5.6 Sol/High reasoning lane for Codex-native work.
It increases decision quality without changing phase authority, implementation ownership, readiness,
independent review, or closure.

## Role boundary

| Role | Surface | Context acquisition | Authority |
|---|---|---|---|
| Sol Consult | ChatGPT standard Chat | Project core + explicitly supplied evidence | Advisory only |
| Sol Advisor | Codex native Sol/High | Independent live-repository exploration | Advisory only |
| Sol Owner/Orchestrator | Codex native Sol/High | Independent live-repository exploration | Critical phase owner/orchestrator |

Sol Consult and Sol Advisor are not intelligence tiers. They use Sol-level reasoning for different
context-acquisition modes.

## Transport

The primary transport is the official Codex built-in browser, which drives the repository's ChatGPT
Project directly. The fallback transport is the `prepare_consult.py` packet, and only when browser
transport is genuinely unavailable or blocked. A transport failure is never a reason to call native
Sol Advisor.

## Standing authorization

The operator authorizes `$sol-consult` to use the official Codex built-in browser, with no per-consult
confirmation, to:

- open ChatGPT and the repository's `Sol Consult · <Project>` Project;
- create or continue the correct decision chat;
- select or verify GPT-5.6 Sol with High reasoning;
- upload the bounded non-secret evidence selected for that consultation;
- submit the consultation prompt, wait for the response, and read it back into Codex.

The grant covers that exact action and that exact target only. It does not authorize `.env`,
credentials, auth tokens, private keys, secrets, or unrelated private data; other websites or
recipients; other external messages; purchases, financial actions, deploys, publication, deletion, or
destructive actions; or a bypass of a browser or site permission prompt.

Stop and ask the operator only when:

- the selected material creates a genuine secret or private-data doubt;
- the expected ChatGPT Project cannot be verified;
- authentication needs operator credentials;
- the necessary action is more than this grant.

## Context hierarchy

For a consultation, interpret context in this order when sources conflict:

1. Current consultation prompt and explicit accepted phase/decision contract.
2. Current per-consult attachments/evidence.
3. Current project `AGENTS.md` and repository-local instructions.
4. Current `.codex/WORKFLOW.md` for workflow authority and lifecycle.
5. Persistent ChatGPT Project core files.
6. `CONTEXT.md` and `MEMORY.md` as context, never as authority over the live tree.
7. Earlier consultation-chat history.

A current attachment supersedes an older persistent project copy of the same source.

## Normal output contract

Ask ChatGPT Sol to return:

```text
CONSULT: RECOMMEND | CAUTION | INSUFFICIENT_CONTEXT — <one-line conclusion>

RECOMMENDATION:
<best path>

WHY:
<decision-relevant reasoning>

TRADEOFFS:
<material trade-offs only>

RISKS:
<material failure modes / uncertainty>

MISSING_CONTEXT:
<only evidence that could materially change the answer>

LOCAL_VERIFICATION:
<repository claims Codex should verify before acting>

NATIVE_SOL_ADVISOR:
YES | NO — <reason>
```

Do not ask Sol Consult for workflow `PASS`, `CHANGES`, `BLOCK`, `READINESS`, Terra `VERDICT`, or phase
closure. Those belong to existing Codex-native roles.

## Escalation rule

Stay in Sol Consult when missing evidence is known and cheaply bounded, such as two additional source
files, one test, one schema, or a fresh diff.

Escalate to native Sol Advisor when the answer depends on discovering unknown repository structure,
all callers/consumers, hidden dependencies, local runtime behavior, broad cross-cutting invariants, or
other evidence that Sol must locate itself.

Formal convergence escalation remains exactly as defined by `.codex/WORKFLOW.md`; prior Sol Consult
work does not satisfy or bypass a required native Sol Advisor call.

## Freshness rule

Persistent ChatGPT Project files are convenience context, not proof of current repository state.
Whenever exact current wording matters and freshness is uncertain, attach a fresh local copy in the
consultation. After receiving the answer, Codex verifies material local claims against the live tree.

## Convenience invariant

Sol Consult must reduce cognitive and operational load. Prefer one obvious invocation, one compact
consult pack, one visible ChatGPT decision chat, and one actionable answer. Do not add workflow gates,
round counters, synchronization databases, transcript mirrors, polling, or duplicate authority.
