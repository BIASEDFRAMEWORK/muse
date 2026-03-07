---
id: prompt-039
story: epic-005-feature-001-story-003
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-005-feature-001-story-003

Implement Implement role-based access control for document retrieval.
Context: I want to access document endpoints based on my assigned role permissions.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- GET /documents/{documentId} requires 'document:read' permission
- GET /documents/{documentId}/metadata requires 'metadata:read' permission
- Users without required permissions receive 403 Forbidden
- Admin role has access to all document operations
- Role permissions are validated after JWT authentication
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-005-feature-001-story-003 (Implement role-based access control for document retrieval).
