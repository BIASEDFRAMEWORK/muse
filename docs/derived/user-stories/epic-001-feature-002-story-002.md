---
id: epic-001-feature-002-story-002
story_id: epic-001-feature-002-story-002
epic: epic-001
feature: epic-001-feature-002
derived_from_epic: epic-001
derived_from_feature: epic-001-feature-002
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
---
# Retrieve Document Metadata with Authorization

## User Story
As a authenticated user, I want to I want to retrieve document metadata by document ID through the GET /documents/{documentId}/metadata endpoint, so that I can so that I can access document information without downloading the full document if I have proper authorization.

## Acceptance Criteria
- Given a valid document ID and proper authorization, when I call GET /documents/{documentId}/metadata, then I receive the persisted metadata in JSON format
- Given an invalid document ID, when I call GET /documents/{documentId}/metadata, then I receive a 404 Not Found response
- Given a valid document ID but insufficient authorization, when I call GET /documents/{documentId}/metadata, then I receive a 403 Forbidden response
- Given an unauthenticated request, when I call GET /documents/{documentId}/metadata, then I receive a 401 Unauthorized response
- Given a valid authorized request, when I call GET /documents/{documentId}/metadata, then the response includes metadata fields like file size, upload date, content type, and checksum
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Return metadata as JSON with consistent schema
- Include standard metadata fields: documentId, fileName, fileSize, contentType, uploadDate, checksum
- Implement same authorization checks as document retrieval endpoint
- Cache metadata responses to improve performance
- Validate document ID format before database lookup
- Implementation should prioritize The API exposes read-only access:.
