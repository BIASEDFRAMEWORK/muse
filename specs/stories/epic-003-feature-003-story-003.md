---
id: epic-003-feature-003-story-003
story_id: epic-003-feature-003-story-003
epic: epic-003
feature: epic-003-feature-003
derived_from_epic: epic-003
derived_from_feature: epic-003-feature-003
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
---
# Search audit trail by user activity

## User Story
As a security analyst, I want to query all document access attempts by a specific user across all documents, so that I can I can investigate suspicious user behavior and enforce access policies.

## Acceptance Criteria
- GET /audit/users/{userId}/access-history returns all document access attempts by the user
- Response includes document ID, timestamp, access type, and outcome for each entry
- Support date range filtering and pagination
- Include document metadata (title, classification level) in response when available
- Handle cases where user ID doesn't exist in audit logs gracefully
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Index audit logs by user_id for efficient user-based queries
- Join audit logs with document metadata table for enriched responses
- Consider rate limiting for audit queries to prevent abuse
- Implement proper access controls - users should only see their own audit history unless they have admin privileges
- Implementation should prioritize The API exposes read-only access:.
