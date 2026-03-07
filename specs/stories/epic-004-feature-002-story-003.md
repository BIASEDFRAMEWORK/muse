---
id: epic-004-feature-002-story-003
story_id: epic-004-feature-002-story-003
epic: epic-004
feature: epic-004-feature-002
derived_from_epic: epic-004
derived_from_feature: epic-004-feature-002
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
---
# As an authenticated user, I can only retrieve document metadata my role has permission to access

## User Story
As a Authenticated User, I want to I receive document metadata when calling GET /documents/{documentId}/metadata only if my assigned role has read permission for that document, so that I can preventing information leakage through metadata exposure.

## Acceptance Criteria
- GET /documents/{documentId}/metadata returns 403 Forbidden when user lacks permission
- GET /documents/{documentId}/metadata returns metadata when user has valid role permission
- Metadata endpoint uses same permission validation as document content endpoint
- Permission checks are applied consistently across both retrieval endpoints
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Reuse authorization middleware from document content endpoint
- Apply same role-based permission checking logic
- Ensure metadata access control matches document access control
- Consider partial metadata filtering for different permission levels
- Implementation should prioritize The API exposes read-only access:.
