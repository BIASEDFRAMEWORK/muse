---
id: prompt-026
story: epic-003-feature-003-story-002
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-003-feature-003-story-002

Implement Configure automated audit trail retention policies.
Context: set retention periods for different types of audit records.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- System provides POST /audit/retention-policy endpoint to configure retention rules
- Retention policies can be set by audit event type (document access, user management, system changes)
- Retention periods can be specified in days, months, or years
- System automatically marks records for deletion based on retention policies
- GET /audit/retention-policy returns current active retention policies
- Retention policy changes are logged in the audit trail
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-003-feature-003-story-002 (Configure automated audit trail retention policies).
