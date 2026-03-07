---
id: prompt-016
story: epic-002-feature-003-story-001
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-002-feature-003-story-001

Implement Log document access attempts with user identification.
Context: automatically capture and store audit records whenever a user attempts to access a document through the API.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Every GET request to /documents/{documentId} generates an audit log entry
- Every GET request to /documents/{documentId}/metadata generates an audit log entry
- Audit log includes user ID, timestamp, document ID, and request outcome (success/failure)
- Failed access attempts are logged with failure reason
- Audit logs are stored persistently and cannot be modified by regular users
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-002-feature-003-story-001 (Log document access attempts with user identification).
