# Security Policy

## Reporting

Do not open a public issue with secret or security-sensitive details. Use GitHub private vulnerability reporting when available.

## Supported surface

Only the current `main` branch is supported.

## Security scope

This repository stores public-safe instruction/workflow files, hand-maintained role definitions, manual project templates, and a small local sync script. It does not store provider credentials or full harness configuration.

Report privately if you find:

- an API key, token, credential, private URL, private data, or account-specific secret committed here;
- `sync.sh` behavior that can overwrite an unexpected path or expose user data;
- instruction wording that directs a compliant agent to take a destructive or external action without required authorization;
- installation guidance that can unexpectedly disclose or destroy local data.

Out of scope:

- a model ignoring instructions;
- vulnerabilities in third-party harnesses or providers;
- risks caused by unrelated local/provider configuration.

## Public-safe rule

Never commit credentials, `.env` contents, private project data, account identifiers, generated authenticated router files, or machine-specific secrets.
