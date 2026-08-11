# WF10 continuation wake-race known limitation

Status: platform-limited; operator-supplied pre-WF10 incident record.

The operator reported that sending a CONTINUE_ACK to a predecessor through the exposed task-message
API can create a new user turn and reactivate that predecessor. Current exposed APIs provide no passive
ACK, passive stop, or atomic continuation primitive. This record is provenance only: it is not a live
reproduction, test result, or acceptance evidence, and no live task or repository artifact was
inspected.

WF10 therefore uses the one-way sealed handoff: the predecessor ends its turn after one pointer-only
CONTINUE_REQUEST; Control proves quiescence with at most one bounded cursor observation, records the
ACK in its own registry/ledger, and passes ACK facts only to the successor. Archive is not stop proof.
The protocol may change only after a replacement primitive is acceptance-proven.

