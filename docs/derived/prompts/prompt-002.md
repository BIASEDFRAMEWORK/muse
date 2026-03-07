---
id: prompt-002
story: epic-001-feature-001-story-002
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/Digital System Audit Logging and Governance Policy.digital.md
---
# Implementation Prompt for epic-001-feature-001-story-002

Implement Generate structured audit logs for security events.
Context: I want my application to automatically emit structured audit logs containing required fields for all security-relevant events.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- All authentication attempts generate audit logs with timestamp, user identity, IP address, and outcome
- Administrative actions log user identity, action performed, resource affected, and result
- API requests include timestamp, calling identity, endpoint, and response status
- Logs are emitted in JSON format with consistent field naming
- Privilege escalation and configuration changes generate immediate audit entries
- Outcome focus for this story: Digital System Audit Logging and.
- Implementation outcome is unique to epic-001-feature-001-story-002 (Generate structured audit logs for security events).
