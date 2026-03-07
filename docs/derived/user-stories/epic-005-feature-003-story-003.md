---
id: epic-005-feature-003-story-003
story_id: epic-005-feature-003-story-003
epic: epic-005
feature: epic-005-feature-003
derived_from_epic: epic-005
derived_from_feature: epic-005-feature-003
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/original-document-system-of-record.digital.md
---
# Query audit trail by user

## User Story
As a Security Analyst, I want to I want to retrieve all document access events for a specific user, so that I can so that I can investigate user activity patterns and detect potential security issues.

## Acceptance Criteria
- New endpoint GET /audit/users/{userId} returns all document access events for that user
- Results are paginated with configurable page size (default 50, max 500)
- Results are sorted by timestamp in descending order (most recent first)
- Response includes: timestamp, document ID, endpoint accessed, IP address, success/failure status
- Endpoint requires appropriate authorization to access audit data
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Index audit logs by user_id for efficient queries
- Implement same pagination pattern as document audit queries
- Add query filters for date ranges and document types
- Consider rate limiting on audit endpoints to prevent abuse
- Return empty array if user has no access events
- Implementation should prioritize The API exposes read-only access:.
