# WF10 review-evaluation ledger

This provider-local ledger is append-only and evidence-bound. It measures whether the non-authoritative
Luna readiness gate improves the authoritative Terra gate; it never changes Terra authority or creates
new requirements.

## Five evaluation phases

1. `LUNA_READINESS` records the candidate-bound readiness result, validated Luna findings, and Luna
   false negatives later substantiated by Terra.
2. `TERRA_INITIAL` records the first complete accepted-invariant/coverage matrix, all substantiated
   material findings reported in one pass, and the initial Terra precision evidence.
3. `TERRA_RECHECK` records only prior findings, changed surfaces, immediate callers/consumers, and
   regression gates, plus Terra cycles to PASS.
4. `CONVERGENCE` records late findings on unchanged code and repeated invariant clusters. A second
   recurrence in one cluster or three consecutive Terra `CHANGES` entries is `CONVERGENCE_BLOCK`;
   ordinary patching stops and Sol must approve invariant/architecture redesign.
5. `CLOSURE_LEARNING` records time evidence and the pre-gate retention decision. Retain the pre-gate
   only when it measurably reduces Terra cycles against the baseline and has zero escapes.

The record names `validated_luna_findings`, `luna_false_negatives`, `terra_precision`,
`terra_cycles_to_pass`, `late_findings_on_unchanged_code`, `repeated_invariant_clusters`,
`time_evidence`, `token_evidence`, and `escapes`. Token evidence is optional and must be omitted when
the provider does not expose a supported measurement; no zero-token or inferred token value is valid.
Ledger validators reject `pre_gate.retain=true` unless observed Terra cycles are lower than baseline and
escapes are zero; time/token evidence objects reject invented fields.

State machines, crash recovery, and transactional workflows require an explicit state-transition and
fault-injection matrix before the LLM phase-end review. Mutation testing may satisfy the required
failure evidence where the accepted contract names it. Terra may not broaden the accepted contract.

Schema: `review-evaluation-ledger.schema.json`.
