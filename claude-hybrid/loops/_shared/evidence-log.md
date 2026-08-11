# Evidence log format

Append-only log of what was tried and what actually happened. Maps to the vault `LOG.md`.
This is the audit trail behind the handoff's "Verified" line — claims here must be backed by
real output (command, metric, test result), not assertion.

Append; never rewrite history. Keep entries compressed.

## Entry template

```md
## <YYYY-MM-DD HH:MM> — <short label>
- Tried:    <what was attempted>
- Result:   <what happened — pass / fail / partial>
- Evidence: <command run + key output, metric value, test name, or file:line>
- Note:     <decision made or follow-up; optional>
```

## Example

```md
## 2026-06-10 14:22 — repro auth timeout
- Tried:    ran failing test added in tests/auth_test.py::test_expired_token
- Result:   fail (as expected) — reproduces the bug
- Evidence: `pytest tests/auth_test.py::test_expired_token` → 1 failed, AssertionError line 41
- Note:     root cause is clock skew handling in auth/session.py:88
```

## Rules

- Every entry cites evidence. No evidence → it didn't happen.
- A failure is a valid, valuable entry. Log it; do not bury it.
- One entry per meaningful step, not per keystroke.
