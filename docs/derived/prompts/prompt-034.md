---
id: prompt-034
story: epic-004-feature-003-story-001
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-004-feature-003-story-001

Implement Validate user permissions for document metadata retrieval.
Context: request document metadata through the GET endpoint.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- When user has valid read permissions, GET /documents/{documentId}/metadata returns 200 with metadata
- When user lacks read permissions, GET /documents/{documentId}/metadata returns 403 Forbidden
- When document does not exist, GET /documents/{documentId}/metadata returns 404 Not Found
- When user is not authenticated, GET /documents/{documentId}/metadata returns 401 Unauthorized
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-004-feature-003-story-001 (Validate user permissions for document metadata retrieval).
