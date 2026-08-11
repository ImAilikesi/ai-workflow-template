# Loop modes

The same loop *content* (goal, steps, checks) can be **run** in different ways. Mode is about
the execution mechanism, not the loop itself.

> **Our templates are process loops by default.** `/loop`, hooks, and routines are **optional**
> execution mechanisms — not required, and not shipped here. Reach for them only when a loop
> genuinely needs to run on a schedule or unattended.

## The 5 modes

1. **Manual process loop** *(default)* — a human runs each step and decides whether to
   continue. No automation. This is how the templates are written.

2. **Checkpointed loop** — runs between defined checkpoints with review gates (see
   `checkpoint-and-escalation.md`). The model every loop here assumes: work proceeds, pauses for
   review, continues or stops.

3. **Scheduled `/loop` (Claude Code)** — optional. Claude Code's `/loop` re-fires a prompt on an
   interval or self-paced. Use to poll long-running external state. The loop's content is
   unchanged; `/loop` just re-enters it.

4. **Hook-assisted loop** — optional. Harness hooks fire scripts deterministically at set points
   (e.g. run tests on stop). **We ship no hooks** — adding them is a per-project choice in
   `settings.json`, outside these templates.

5. **Routine / external automation** — optional. A cron job or cloud routine runs the loop
   unattended and surfaces only high-signal results (e.g. a ready-to-merge PR) for human review.

## Choosing a mode

- Default to **manual / checkpointed** — most work wants a human at the gates.
- Use **scheduled / routine** only when the loop must run without you and has a hard
  verification surface (tests/metrics), so unattended runs can't silently pass on gut feeling.
- A loop with no machine-checkable verification surface should **not** run unattended.
