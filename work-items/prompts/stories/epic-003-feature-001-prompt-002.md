---
id: epic-003-feature-001-prompt-002
prompt_id: epic-003-feature-001-prompt-002
story: epic-003-feature-001-story-002
feature: epic-003-feature-001
epic: epic-003
source: specs/governance/original-document-system-of-record.digital.md
---
# AI Implementation Prompt: epic-003-feature-001-prompt-002

## Objective
Implement Retrieve document metadata with role-based access control.

## Repo Context
- Primary code paths: src/cli/, src/pipeline/, src/config/
- Generated artifacts: specs/capabilities/, specs/epics/, specs/features/, specs/stories/, work-items/prompts/stories/
- Story linkage: epic-003-feature-001-story-002 -> epic-003-feature-001 -> epic-003

## Required Changes
1. Implement Retrieve document metadata with role-based access control.
2. Apply same role-based access control as document content retrieval
3. Return metadata in consistent JSON format with standard fields
4. Ensure metadata does not expose sensitive information not authorized for the user role
5. Cache metadata responses where appropriate for performance

## Constraints
- Preserve traceability metadata and naming conventions for generated artifacts.
- Do not modify files under /docs/organizational-contracts without explicit instruction.
- Keep changes scoped to the requested objective and avoid unrelated refactors.
- Use governance source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md

## Acceptance Criteria
- Given I have read permissions for a document, when I call GET /documents/{documentId}/metadata, then I receive the persisted metadata as JSON
- Given I do not have read permissions for a document, when I call GET /documents/{documentId}/metadata, then I receive a 403 Forbidden response
- Given the document does not exist, when I call GET /documents/{documentId}/metadata, then I receive a 404 Not Found response
- Given I am not authenticated, when I call GET /documents/{documentId}/metadata, then I receive a 401 Unauthorized response
- Outcome focus for this story: The API exposes read-only access:.

## Validation
- `npm run build`
- `node scripts/validate-traceability.mjs`

## Deliverable
Return a patch plus a short summary of modified files and validation results.

## Implementation Brief
Implement Retrieve document metadata with role-based access control.
Context: I want to retrieve document metadata via GET /documents/{documentId}/metadata.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Given I have read permissions for a document, when I call GET /documents/{documentId}/metadata, then I receive the persisted metadata as JSON
- Given I do not have read permissions for a document, when I call GET /documents/{documentId}/metadata, then I receive a 403 Forbidden response
- Given the document does not exist, when I call GET /documents/{documentId}/metadata, then I receive a 404 Not Found response
- Given I am not authenticated, when I call GET /documents/{documentId}/metadata, then I receive a 401 Unauthorized response
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-003-feature-001-story-002 (Retrieve document metadata with role-based access control).
