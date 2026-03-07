---
id: epic-004-feature-002-story-003
story_id: epic-004-feature-002-story-003
epic: epic-004
feature: epic-004-feature-002
derived_from_epic: epic-004
derived_from_feature: epic-004-feature-002
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/governance/original-document-system-of-record.md
---
# Include integrity hash in metadata API responses

## User Story
As a API consumer, I want to receive the integrity hash value along with document metadata, so that I can perform client-side verification or audit trails.

## Acceptance Criteria
- GET /documents/{documentId}/metadata includes 'integrity_hash' field
- Hash value is returned as hexadecimal string
- Hash field is always present for documents with metadata
- Response schema includes hash field in API documentation
- Hash format follows consistent 64-character SHA-256 pattern
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Add integrity_hash field to metadata response DTO
- Format hash as lowercase hexadecimal string
- Update OpenAPI specification to include integrity_hash field
- Validate hash field format in response serialization
- Implementation should prioritize The API exposes read-only access:.
