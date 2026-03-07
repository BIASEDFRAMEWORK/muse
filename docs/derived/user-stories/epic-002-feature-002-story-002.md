---
id: epic-002-feature-002-story-002
story_id: epic-002-feature-002-story-002
epic: epic-002
feature: epic-002-feature-002
derived_from_epic: epic-002
derived_from_feature: epic-002-feature-002
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
---
# Authorized user can retrieve document metadata with role filtering

## User Story
As a Document Consumer, I want to I want to retrieve document metadata via GET /documents/{documentId}/metadata, so that I can so that I can view document properties and verify access permissions.

## Acceptance Criteria
- GET /documents/{documentId}/metadata returns 200 with metadata JSON when authorized
- GET /documents/{documentId}/metadata returns 403 when user lacks metadata read permissions
- Metadata response excludes sensitive fields based on user role restrictions
- Response includes standard fields: id, filename, content_type, size, created_date
- Response format is consistent JSON structure
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Filter metadata fields based on user role permissions
- Implement field-level access control for sensitive metadata
- Use consistent JSON schema for metadata responses
- Cache authorization decisions for performance
- Implementation should prioritize The API exposes read-only access:.
