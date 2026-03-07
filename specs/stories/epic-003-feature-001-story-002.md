---
id: epic-003-feature-001-story-002
story_id: epic-003-feature-001-story-002
epic: epic-003
feature: epic-003-feature-001
derived_from_epic: epic-003
derived_from_feature: epic-003-feature-001
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
source_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
derived_from_document_id: gov-original-document-system-of-record
origin_markdown_path: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md
---
# Retrieve document metadata with role-based access control

## User Story
As a authorized user, I want to I want to retrieve document metadata via GET /documents/{documentId}/metadata, so that I can so that I can view document properties and attributes for documents I have access to.

## Acceptance Criteria
- Given I have read permissions for a document, when I call GET /documents/{documentId}/metadata, then I receive the persisted metadata as JSON
- Given I do not have read permissions for a document, when I call GET /documents/{documentId}/metadata, then I receive a 403 Forbidden response
- Given the document does not exist, when I call GET /documents/{documentId}/metadata, then I receive a 404 Not Found response
- Given I am not authenticated, when I call GET /documents/{documentId}/metadata, then I receive a 401 Unauthorized response
- Outcome focus for this story: The API exposes read-only access:.

## Technical Notes
- Apply same role-based access control as document content retrieval
- Return metadata in consistent JSON format with standard fields
- Ensure metadata does not expose sensitive information not authorized for the user role
- Cache metadata responses where appropriate for performance
- Implementation should prioritize The API exposes read-only access:.
