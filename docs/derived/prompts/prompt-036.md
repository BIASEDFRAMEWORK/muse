---
id: prompt-036
story: epic-004-feature-003-story-003
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-004-feature-003-story-003

Implement Enforce consistent access control across metadata and content endpoints.
Context: configure role-based permissions that apply uniformly.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- When user has read access to document content, they automatically have access to its metadata
- When user lacks access to document content, they are also denied access to its metadata
- Permission checks use the same authorization logic for both /documents/{documentId} and /documents/{documentId}/metadata endpoints
- Response times for authorization checks are consistent between both endpoints
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-004-feature-003-story-003 (Enforce consistent access control across metadata and content endpoints).
