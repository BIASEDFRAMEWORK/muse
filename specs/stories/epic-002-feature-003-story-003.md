---
id: epic-002-feature-003-story-003
story_id: epic-002-feature-003-story-003
epic: epic-002
feature: epic-002-feature-003
derived_from_epic: epic-002
derived_from_feature: epic-002-feature-003
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
---
# As a compliance officer, I want to query all compliance violations by document ID so that I can review the compliance status of specific documents

## User Story
As a compliance officer, I want to query all compliance violations by document ID, so that I can review the compliance status of specific documents.

## Acceptance Criteria
- API endpoint returns all violations for a given document ID
- Response includes violation type, description, timestamp, and status
- Violations are sorted by timestamp descending
- Endpoint supports pagination for large violation sets
- Returns 404 if document ID does not exist
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Implement GET /compliance/violations?documentId={id} endpoint
- Join violations table with documents table to validate document existence
- Return JSON array of violation objects
- Include pagination headers (total count, page size, current page)
- Index violations table on document_id for query performance
- Implementation should prioritize The API exposes read-only access:.
