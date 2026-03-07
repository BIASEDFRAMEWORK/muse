---
id: epic-004-feature-002-prompt-003
prompt_id: epic-004-feature-002-prompt-003
story: epic-004-feature-002-story-003
feature: epic-004-feature-002
epic: epic-004
source: specs/governance/original-document-system-of-record.digital.md
---
# AI Implementation Prompt: epic-004-feature-002-prompt-003

## Objective
Implement As an authenticated user, I can only retrieve document metadata my role has permission to access.

## Repo Context
- Primary code paths: src/cli/, src/pipeline/, src/config/
- Generated artifacts: specs/capabilities/, specs/epics/, specs/features/, specs/stories/, work-items/prompts/stories/
- Story linkage: epic-004-feature-002-story-003 -> epic-004-feature-002 -> epic-004

## Required Changes
1. Implement As an authenticated user, I can only retrieve document metadata my role has permission to access.
2. Reuse authorization middleware from document content endpoint
3. Apply same role-based permission checking logic
4. Ensure metadata access control matches document access control
5. Consider partial metadata filtering for different permission levels

## Constraints
- Preserve traceability metadata and naming conventions for generated artifacts.
- Do not modify files under /docs/organizational-contracts without explicit instruction.
- Keep changes scoped to the requested objective and avoid unrelated refactors.
- Use governance source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md

## Acceptance Criteria
- GET /documents/{documentId}/metadata returns 403 Forbidden when user lacks permission
- GET /documents/{documentId}/metadata returns metadata when user has valid role permission
- Metadata endpoint uses same permission validation as document content endpoint
- Permission checks are applied consistently across both retrieval endpoints
- Outcome focus for this story: The API exposes read-only access:.

## Validation
- `npm run build`
- `node scripts/validate-traceability.mjs`

## Deliverable
Return a patch plus a short summary of modified files and validation results.

## Implementation Brief
Implement As an authenticated user, I can only retrieve document metadata my role has permission to access.
Context: I receive document metadata when calling GET /documents/{documentId}/metadata only if my assigned role has read permission for that document.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- GET /documents/{documentId}/metadata returns 403 Forbidden when user lacks permission
- GET /documents/{documentId}/metadata returns metadata when user has valid role permission
- Metadata endpoint uses same permission validation as document content endpoint
- Permission checks are applied consistently across both retrieval endpoints
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-004-feature-002-story-003 (As an authenticated user, I can only retrieve document metadata my role has permission to access).
