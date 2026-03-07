---
id: epic-005-feature-003-story-002
story_id: epic-005-feature-003-story-002
epic: epic-005
feature: epic-005-feature-003
derived_from_epic: epic-005
derived_from_feature: epic-005-feature-003
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
---
# Query audit trail by document

## User Story
As a Compliance Officer, I want to I want to retrieve all access events for a specific document, so that I can so that I can review who has accessed sensitive documents for compliance reporting.

## Acceptance Criteria
- New endpoint GET /audit/documents/{documentId} returns all access events for that document
- Results are paginated with configurable page size (default 50, max 500)
- Results are sorted by timestamp in descending order (most recent first)
- Response includes: timestamp, user ID, endpoint accessed, IP address, success/failure status
- Endpoint requires appropriate authorization to access audit data
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Index audit logs by document_id for efficient queries
- Implement cursor-based or offset-based pagination
- Add query filters for date ranges and event types
- Consider caching frequently accessed audit queries
- Return 404 if document doesn't exist, empty array if no access events
- Implementation should prioritize The API exposes read-only access:.
