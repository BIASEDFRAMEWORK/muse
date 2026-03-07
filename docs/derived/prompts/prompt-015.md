---
id: prompt-015
story: epic-002-feature-002-story-003
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-002-feature-002-story-003

Implement Audit logging for role-based document access.
Context: track all document access attempts with user role information.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- All GET /documents/{documentId} requests are logged with user ID, role, timestamp, and access result
- All GET /documents/{documentId}/metadata requests are logged with same detail level
- Failed access attempts (401, 403) are logged with denial reason
- Audit logs include document ID, user role, and permission check results
- Logs are stored in structured format suitable for compliance reporting
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-002-feature-002-story-003 (Audit logging for role-based document access).
