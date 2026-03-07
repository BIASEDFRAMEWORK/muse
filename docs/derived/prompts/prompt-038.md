---
id: prompt-038
story: epic-005-feature-001-story-002
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/Digital System Audit Logging and Governance Policy.digital.md
---
# Implementation Prompt for epic-005-feature-001-story-002

Implement Generate structured audit logs for security events (epic-005-feature-001-38).
Context: I want my application to automatically generate audit logs for all security-relevant events.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- System logs all authentication attempts with outcome and originating IP
- Administrative actions are logged with user identity and resource affected
- API requests include timestamp, caller identity, endpoint, and response status
- Configuration changes are logged with before/after values where applicable
- All log entries include unique event identifiers and structured timestamps
- Outcome focus for this story: monitoring, and security controls to support accountability, incident investigation, and regulatory.
- Implementation outcome is unique to epic-005-feature-001-story-002 (Generate structured audit logs for security events (epic-005-feature-001-38)).
