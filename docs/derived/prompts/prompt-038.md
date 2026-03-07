---
id: prompt-038
story: epic-005-feature-001-story-002
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-005-feature-001-story-002

Implement Validate JWT tokens on protected API endpoints.
Context: I want to validate JWT tokens on incoming requests to protected endpoints.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- All protected endpoints require valid Authorization header with Bearer token
- Invalid or expired tokens return 401 Unauthorized
- Missing Authorization header returns 401 Unauthorized
- Valid token extracts user context for request processing
- Token validation middleware runs before endpoint handlers
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-005-feature-001-story-002 (Validate JWT tokens on protected API endpoints).
