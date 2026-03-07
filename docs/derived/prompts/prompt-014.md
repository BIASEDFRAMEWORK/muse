---
id: prompt-014
story: epic-002-feature-002-story-002
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-002-feature-002-story-002

Implement Role-based document metadata filtering.
Context: configure which document metadata fields are visible to different user roles.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Admin can define metadata field visibility rules per role through configuration
- GET /documents/{documentId}/metadata returns only role-appropriate metadata fields
- Sensitive metadata fields are filtered out for lower-privilege roles
- Metadata filtering rules are consistently applied across all document access endpoints
- Configuration changes take effect immediately without service restart
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-002-feature-002-story-002 (Role-based document metadata filtering).
