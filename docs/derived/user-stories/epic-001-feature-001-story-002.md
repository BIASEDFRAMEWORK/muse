---
id: epic-001-feature-001-story-002
story_id: epic-001-feature-001-story-002
epic: epic-001
feature: epic-001-feature-001
derived_from_epic: epic-001
derived_from_feature: epic-001-feature-001
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
---
# Retrieve document metadata by ID

## User Story
As a API consumer, I want to request metadata for a document without downloading the full content, so that I can I can inspect document properties and make decisions before retrieving the full document.

## Acceptance Criteria
- GET /documents/{documentId}/metadata returns HTTP 200 with JSON metadata when document exists
- Response includes document size, content type, upload timestamp, and checksum
- GET /documents/{documentId}/metadata returns HTTP 404 when document does not exist
- Response time is consistently fast regardless of document size
- Metadata includes immutable properties that cannot be modified after creation
- Response follows consistent JSON schema structure
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Store metadata separately from document content for fast retrieval
- Include fields like: id, filename, content_type, size_bytes, created_at, checksum
- Implement proper JSON serialization with consistent date formats
- Consider adding ETag header based on document checksum for caching
- Validate that metadata retrieval doesn't require loading document content
- Implementation should prioritize The API exposes read-only access:.
