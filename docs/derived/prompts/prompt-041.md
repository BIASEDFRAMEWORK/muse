---
id: prompt-041
story: epic-005-feature-002-story-002
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-005-feature-002-story-002

Implement Detect and block DDoS attack patterns.
Context: automatically identify and mitigate distributed denial of service attacks.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- System detects abnormal traffic patterns indicating potential DDoS attacks
- Automatic blocking of suspicious IP addresses or ranges occurs within 30 seconds
- Legitimate traffic continues to be served during attack mitigation
- Attack detection logs are generated with sufficient detail for analysis
- Blocked IPs are automatically unblocked after configurable cooldown period
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-005-feature-002-story-002 (Detect and block DDoS attack patterns).
