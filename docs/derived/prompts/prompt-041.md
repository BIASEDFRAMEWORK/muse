---
id: prompt-041
story: epic-005-feature-002-story-002
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-005-feature-002-story-002

Implement Retrieve Document Metadata with Role-Based Access.
Context: I want to access document metadata through GET /documents/{documentId}/metadata based on my role permissions.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Given I am authenticated with a valid role, when I request GET /documents/{documentId}/metadata for a document I have read access to, then I receive the persisted metadata as JSON with HTTP 200
- Given I am authenticated with a valid role, when I request GET /documents/{documentId}/metadata for a document I don't have access to, then I receive HTTP 403 Forbidden
- Given I am not authenticated, when I request GET /documents/{documentId}/metadata, then I receive HTTP 401 Unauthorized
- Given the document does not exist, when I request GET /documents/{documentId}/metadata, then I receive HTTP 404 Not Found
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-005-feature-002-story-002 (Retrieve Document Metadata with Role-Based Access).
