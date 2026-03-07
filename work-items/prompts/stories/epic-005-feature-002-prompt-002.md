---
id: epic-005-feature-002-prompt-002
prompt_id: epic-005-feature-002-prompt-002
story: epic-005-feature-002-story-002
feature: epic-005-feature-002
epic: epic-005
source: specs/governance/original-document-system-of-record.digital.md
---
# AI Implementation Prompt: epic-005-feature-002-prompt-002

## Objective
Implement Enforce adaptive rate limiting on document retrieval endpoints.

## Repo Context
- Primary code paths: src/cli/, src/pipeline/, src/config/
- Generated artifacts: specs/capabilities/, specs/epics/, specs/features/, specs/stories/, work-items/prompts/stories/
- Story linkage: epic-005-feature-002-story-002 -> epic-005-feature-002 -> epic-005

## Required Changes
1. Implement Enforce adaptive rate limiting on document retrieval endpoints.
2. Implement rate limiting middleware that runs before endpoint handlers
3. Use user authentication context to determine tier assignment
4. Implement token bucket or sliding window counter in Redis
5. Include rate limit information in response headers per RFC 6585

## Constraints
- Preserve traceability metadata and naming conventions for generated artifacts.
- Do not modify files under /docs/organizational-contracts without explicit instruction.
- Keep changes scoped to the requested objective and avoid unrelated refactors.
- Use governance source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md

## Acceptance Criteria
- GET /documents/{documentId} endpoint enforces user's tier-specific rate limits
- GET /documents/{documentId}/metadata endpoint enforces user's tier-specific rate limits
- Rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset) are included in responses
- HTTP 429 status returned with Retry-After header when limits exceeded
- Outcome focus for this story: The API exposes read-only access:.

## Validation
- `npm run build`
- `node scripts/validate-traceability.mjs`

## Deliverable
Return a patch plus a short summary of modified files and validation results.

## Implementation Brief
Implement Enforce adaptive rate limiting on document retrieval endpoints.
Context: I want to automatically apply appropriate rate limits to users based on their assigned tier when they access document endpoints.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- GET /documents/{documentId} endpoint enforces user's tier-specific rate limits
- GET /documents/{documentId}/metadata endpoint enforces user's tier-specific rate limits
- Rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset) are included in responses
- HTTP 429 status returned with Retry-After header when limits exceeded
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-005-feature-002-story-002 (Enforce adaptive rate limiting on document retrieval endpoints).
