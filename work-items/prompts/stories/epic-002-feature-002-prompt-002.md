---
id: epic-002-feature-002-prompt-002
prompt_id: epic-002-feature-002-prompt-002
story: epic-002-feature-002-story-002
feature: epic-002-feature-002
epic: epic-002
source: specs/governance/original-document-system-of-record.digital.md
---
# AI Implementation Prompt: epic-002-feature-002-prompt-002

## Objective
Implement Retrieve document metadata with role-based filtering.

## Repo Context
- Primary code paths: src/cli/, src/pipeline/, src/config/
- Generated artifacts: specs/capabilities/, specs/epics/, specs/features/, specs/stories/, work-items/prompts/stories/
- Story linkage: epic-002-feature-002-story-002 -> epic-002-feature-002 -> epic-002

## Required Changes
1. Implement Retrieve document metadata with role-based filtering.
2. Implement field-level access control for metadata responses
3. Create metadata filtering service that maps user roles to allowed metadata fields
4. Store role-based metadata permissions in configuration or database
5. Return consistent metadata schema regardless of user role (omit restricted fields)

## Constraints
- Preserve traceability metadata and naming conventions for generated artifacts.
- Do not modify files under /docs/organizational-contracts without explicit instruction.
- Keep changes scoped to the requested objective and avoid unrelated refactors.
- Use governance source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md

## Acceptance Criteria
- GET /documents/{documentId}/metadata returns 200 with metadata JSON when user has read permission
- GET /documents/{documentId}/metadata returns 403 when user lacks metadata read permission
- Response includes only metadata fields the user's role is permitted to view
- Metadata includes document ID, upload timestamp, file size, content type, and custom properties
- Sensitive metadata fields are filtered out based on user role permissions
- Outcome focus for this story: The API exposes read-only access:.

## Validation
- `npm run build`
- `node scripts/validate-traceability.mjs`

## Deliverable
Return a patch plus a short summary of modified files and validation results.

## Implementation Brief
Implement Retrieve document metadata with role-based filtering.
Context: I want to fetch document metadata via GET /documents/{documentId}/metadata endpoint.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- GET /documents/{documentId}/metadata returns 200 with metadata JSON when user has read permission
- GET /documents/{documentId}/metadata returns 403 when user lacks metadata read permission
- Response includes only metadata fields the user's role is permitted to view
- Metadata includes document ID, upload timestamp, file size, content type, and custom properties
- Sensitive metadata fields are filtered out based on user role permissions
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-002-feature-002-story-002 (Retrieve document metadata with role-based filtering).
