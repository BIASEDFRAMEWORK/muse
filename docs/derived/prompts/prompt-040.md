---
id: prompt-040
story: epic-005-feature-002-story-001
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-005-feature-002-story-001

Implement Rate limit API requests per client.
Context: configure rate limiting rules for API endpoints.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Rate limiting is applied to both GET /documents/{documentId} and GET /documents/{documentId}/metadata endpoints
- Rate limit violations return HTTP 429 status code with appropriate headers
- Rate limit counters reset according to configured time windows
- Different rate limits can be configured per endpoint
- Rate limit status is included in response headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset)
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-005-feature-002-story-001 (Rate limit API requests per client).
