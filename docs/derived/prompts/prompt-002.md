---
id: prompt-002
story: epic-001-feature-001-story-002
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-001-feature-001-story-002

Implement User can only retrieve documents assigned to their role.
Context: I can access documents through the API only if my role has been granted read permission.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Given I have a role with read permission to a document, when I call GET /documents/{documentId}, then I receive the document bytes with 200 status
- Given I have a role without permission to a document, when I call GET /documents/{documentId}, then I receive 403 Forbidden status
- Given I have permission to access a document, when I call GET /documents/{documentId}/metadata, then I receive the metadata with 200 status
- Given my role permissions are revoked while I'm accessing documents, when I make subsequent requests, then the new permissions are enforced immediately
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-001-feature-001-story-002 (User can only retrieve documents assigned to their role).
