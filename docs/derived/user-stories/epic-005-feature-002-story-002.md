---
id: epic-005-feature-002-story-002
story_id: epic-005-feature-002-story-002
epic: epic-005
feature: epic-005-feature-002
derived_from_epic: epic-005
derived_from_feature: epic-005-feature-002
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
---
# Retrieve Document Metadata with Role-Based Access

## User Story
As a authenticated user, I want to I want to access document metadata through GET /documents/{documentId}/metadata based on my role permissions, so that I can so that I can view document information and properties for documents I'm authorized to access.

## Acceptance Criteria
- Given I am authenticated with a valid role, when I request GET /documents/{documentId}/metadata for a document I have read access to, then I receive the persisted metadata as JSON with HTTP 200
- Given I am authenticated with a valid role, when I request GET /documents/{documentId}/metadata for a document I don't have access to, then I receive HTTP 403 Forbidden
- Given I am not authenticated, when I request GET /documents/{documentId}/metadata, then I receive HTTP 401 Unauthorized
- Given the document does not exist, when I request GET /documents/{documentId}/metadata, then I receive HTTP 404 Not Found
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Apply same authorization middleware as document content endpoint
- Metadata response should include fields like document ID, upload timestamp, file size, content type, and checksum
- Return metadata as structured JSON with consistent schema
- Consider caching metadata responses for frequently accessed documents
- Implementation should prioritize The API exposes read-only access:.
