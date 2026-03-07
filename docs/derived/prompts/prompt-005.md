---
id: prompt-005
story: epic-001-feature-002-story-002
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-001-feature-002-story-002

Implement Retrieve Document Metadata with Authorization.
Context: I want to retrieve document metadata by document ID through the GET /documents/{documentId}/metadata endpoint.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Given a valid document ID and proper authorization, when I call GET /documents/{documentId}/metadata, then I receive the persisted metadata in JSON format
- Given an invalid document ID, when I call GET /documents/{documentId}/metadata, then I receive a 404 Not Found response
- Given a valid document ID but insufficient authorization, when I call GET /documents/{documentId}/metadata, then I receive a 403 Forbidden response
- Given an unauthenticated request, when I call GET /documents/{documentId}/metadata, then I receive a 401 Unauthorized response
- Given a valid authorized request, when I call GET /documents/{documentId}/metadata, then the response includes metadata fields like file size, upload date, content type, and checksum
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-001-feature-002-story-002 (Retrieve Document Metadata with Authorization).
