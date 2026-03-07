---
id: epic-004-feature-002-prompt-002
prompt_id: epic-004-feature-002-prompt-002
story: epic-004-feature-002-story-002
feature: epic-004-feature-002
epic: epic-004
source: specs/governance/original-document-system-of-record.digital.md
---
# AI Implementation Prompt: epic-004-feature-002-prompt-002

## Objective
Implement As an authenticated user, I can only retrieve documents my role has permission to access.

## Repo Context
- Primary code paths: src/cli/, src/pipeline/, src/config/
- Generated artifacts: specs/capabilities/, specs/epics/, specs/features/, specs/stories/, work-items/prompts/stories/
- Story linkage: epic-004-feature-002-story-002 -> epic-004-feature-002 -> epic-004

## Required Changes
1. Implement As an authenticated user, I can only retrieve documents my role has permission to access.
2. Add authorization middleware before document retrieval logic
3. Implement user role lookup from authentication token/session
4. Check role permissions against document access control list
5. Return appropriate HTTP status codes and error messages

## Constraints
- Preserve traceability metadata and naming conventions for generated artifacts.
- Do not modify files under /docs/organizational-contracts without explicit instruction.
- Keep changes scoped to the requested objective and avoid unrelated refactors.
- Use governance source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md

## Acceptance Criteria
- GET /documents/{documentId} returns 403 Forbidden when user lacks permission
- GET /documents/{documentId} returns document bytes when user has valid role permission
- User authentication is validated before checking role permissions
- Error responses include clear messaging about insufficient permissions
- Outcome focus for this story: The API exposes read-only access:.

## Validation
- `npm run build`
- `node scripts/validate-traceability.mjs`

## Deliverable
Return a patch plus a short summary of modified files and validation results.

## Implementation Brief
Implement As an authenticated user, I can only retrieve documents my role has permission to access.
Context: I receive document content when calling GET /documents/{documentId} only if my assigned role has read permission for that document.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- GET /documents/{documentId} returns 403 Forbidden when user lacks permission
- GET /documents/{documentId} returns document bytes when user has valid role permission
- User authentication is validated before checking role permissions
- Error responses include clear messaging about insufficient permissions
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-004-feature-002-story-002 (As an authenticated user, I can only retrieve documents my role has permission to access).
