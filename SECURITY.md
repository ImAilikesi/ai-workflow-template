# Security Policy

## Reporting a vulnerability

**Please do not open a public issue for a security-sensitive report.**

Report privately through GitHub:

1. Go to the **Security** tab of this repository.
2. Choose **Report a vulnerability** to open a private advisory.

That channel is visible only to the maintainers until an advisory is published.

If the Security tab does not offer that option, open a public issue containing **only** a request for a
private contact — no details, no reproduction steps, no affected paths. A maintainer will open a private
channel and you can send the report there.

Please include what the issue allows, which file or instruction produces it, and the agent and model
you observed it with. You should get an initial response within about a week. This is a small,
maintained-in-spare-time project, so please allow reasonable time before disclosing publicly.

## Supported surface

Only the current `main` branch is supported. There are no releases, tags, or maintained older
versions, and copies you have already installed into a project are not tracked or updated from here.

## What counts as a vulnerability here

This repository ships instruction content, not executable software. There is no server and no service,
and the only script here is standard-library and local-only. The instructions do, however, direct an
agent to act: the Sol Consult skill has the agent upload selected repository files to a ChatGPT Project
through Codex's browser. So the realistic risk surface is narrow but not empty:

**In scope**

- Wording that would lead a compliant agent to take a destructive, irreversible, or external action
  without the authorization the contract requires — for example weakening the external-action gate,
  the read-only reviewer boundary, or the Sol Consult standing grant.
- A path by which the Sol Consult skill or its fallback helper could transmit secrets, credentials, or
  private data, or send data to an unintended recipient.
- A defect in `prepare_consult.py` such as a path-traversal or a bypass of its sensitive-file refusal.
- Installation instructions that would overwrite or expose user data in a way a reader would not
  expect.

**Out of scope**

- An agent or model ignoring the instructions. These are agreements, not enforcement; nothing here can
  block a tool call.
- Vulnerabilities in Claude, Codex, ChatGPT, or any other third-party product. Report those to the
  respective vendor.
- Risks that follow from a user's own configuration, such as granting an agent broader permissions
  than this workflow assumes.

## Handling secrets

Nothing in this repository should ever contain a credential. If you find a key, token, or other secret
committed here, report it privately using the process above rather than opening an issue, so it can be
rotated before it is publicised.
