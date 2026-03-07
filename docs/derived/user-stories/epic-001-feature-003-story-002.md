---
id: epic-001-feature-003-story-002
story_id: epic-001-feature-003-story-002
epic: epic-001
feature: epic-001-feature-003
derived_from_epic: epic-001
derived_from_feature: epic-001-feature-003
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
---
# Retrieve document metadata with integrity status

## User Story
As a API consumer, I want to I want to retrieve document metadata including integrity verification status, so that I can so that I can check document integrity without downloading the full document.

## Acceptance Criteria
- GET /documents/{documentId}/metadata returns metadata with HTTP 200
- Response includes stored hash value and algorithm
- Response includes integrity_verified boolean field
- Response includes last_verified_timestamp
- Returns HTTP 404 when document ID does not exist
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Include hash, hash_algorithm, integrity_verified, and last_verified fields in metadata response
- Run integrity check against stored document and update status fields
- Cache integrity verification results with appropriate TTL
- Return metadata even if integrity check fails, but mark as not verified
- Implementation should prioritize The API exposes read-only access:.
