---
id: prompt-013
story: epic-002-feature-002-story-001
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-002-feature-002-story-001

Implement Document access based on user role permissions.
Context: access documents only within my role's permission scope.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- User with 'viewer' role can access GET /documents/{documentId} for documents they have permission to view
- User with 'admin' role can access all documents via GET endpoints
- User receives 403 Forbidden when attempting to access documents outside their role permissions
- User receives 401 Unauthorized when not authenticated
- Document metadata endpoint respects the same role-based access rules as document content
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-002-feature-002-story-001 (Document access based on user role permissions).
