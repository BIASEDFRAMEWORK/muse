---
id: prompt-037
story: epic-005-feature-001-story-001
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-005-feature-001-story-001

Implement Generate JWT tokens for authenticated API access.
Context: I want to authenticate with the API and receive a JWT token.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- POST /auth/login endpoint accepts valid credentials and returns JWT token
- JWT token includes user ID, roles, and expiration timestamp
- JWT token is signed with secure algorithm (RS256 or HS256)
- Invalid credentials return 401 Unauthorized with error message
- Token expires after configurable duration (default 1 hour)
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-005-feature-001-story-001 (Generate JWT tokens for authenticated API access).
