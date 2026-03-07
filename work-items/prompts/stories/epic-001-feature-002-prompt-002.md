---
id: epic-001-feature-002-prompt-002
prompt_id: epic-001-feature-002-prompt-002
story: epic-001-feature-002-story-002
feature: epic-001-feature-002
epic: epic-001
source: specs/governance/original-document-system-of-record.digital.md
---
# AI Implementation Prompt: epic-001-feature-002-prompt-002

## Objective
Implement Implement role-based authorization for document access.

## Repo Context
- Primary code paths: src/cli/, src/pipeline/, src/config/
- Generated artifacts: specs/capabilities/, specs/epics/, specs/features/, specs/stories/, work-items/prompts/stories/
- Story linkage: epic-001-feature-002-story-002 -> epic-001-feature-002 -> epic-001

## Required Changes
1. Implement Implement role-based authorization for document access.
2. Implement role-permission mapping in database or configuration
3. Create authorization middleware that runs after authentication
4. Document metadata should include access control information
5. Use consistent error response format for authorization failures

## Constraints
- Preserve traceability metadata and naming conventions for generated artifacts.
- Do not modify files under /docs/organizational-contracts without explicit instruction.
- Keep changes scoped to the requested objective and avoid unrelated refactors.
- Use governance source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md

## Acceptance Criteria
- Each API key is associated with one or more roles (viewer, admin, etc.)
- Document access is restricted based on user role permissions
- Unauthorized access attempts return HTTP 403 Forbidden
- Role permissions are enforced on both GET /documents/{documentId} and GET /documents/{documentId}/metadata endpoints
- System supports hierarchical roles where higher roles inherit lower role permissions
- Outcome focus for this story: The API exposes read-only access:.

## Validation
- `npm run build`
- `node scripts/validate-traceability.mjs`

## Deliverable
Return a patch plus a short summary of modified files and validation results.

## Implementation Brief
Implement Implement role-based authorization for document access.
Context: configure role-based permissions to control which documents users can access.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Each API key is associated with one or more roles (viewer, admin, etc.)
- Document access is restricted based on user role permissions
- Unauthorized access attempts return HTTP 403 Forbidden
- Role permissions are enforced on both GET /documents/{documentId} and GET /documents/{documentId}/metadata endpoints
- System supports hierarchical roles where higher roles inherit lower role permissions
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-001-feature-002-story-002 (Implement role-based authorization for document access).
