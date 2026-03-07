---
id: epic-002-feature-003-prompt-003
prompt_id: epic-002-feature-003-prompt-003
story: epic-002-feature-003-story-003
feature: epic-002-feature-003
epic: epic-002
source: specs/governance/original-document-system-of-record.digital.md
---
# AI Implementation Prompt: epic-002-feature-003-prompt-003

## Objective
Implement As a compliance officer, I want to query all compliance violations by document ID so that I can review the compliance status of specific documents.

## Repo Context
- Primary code paths: src/cli/, src/pipeline/, src/config/
- Generated artifacts: specs/capabilities/, specs/epics/, specs/features/, specs/stories/, work-items/prompts/stories/
- Story linkage: epic-002-feature-003-story-003 -> epic-002-feature-003 -> epic-002

## Required Changes
1. Implement As a compliance officer, I want to query all compliance violations by document ID so that I can review the compliance status of specific documents.
2. Implement GET /compliance/violations?documentId={id} endpoint
3. Join violations table with documents table to validate document existence
4. Return JSON array of violation objects
5. Include pagination headers (total count, page size, current page)

## Constraints
- Preserve traceability metadata and naming conventions for generated artifacts.
- Do not modify files under /docs/organizational-contracts without explicit instruction.
- Keep changes scoped to the requested objective and avoid unrelated refactors.
- Use governance source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md

## Acceptance Criteria
- API endpoint returns all violations for a given document ID
- Response includes violation type, description, timestamp, and status
- Violations are sorted by timestamp descending
- Endpoint supports pagination for large violation sets
- Returns 404 if document ID does not exist
- Outcome focus for this story: The API exposes read-only access:.

## Validation
- `npm run build`
- `node scripts/validate-traceability.mjs`

## Deliverable
Return a patch plus a short summary of modified files and validation results.

## Implementation Brief
Implement As a compliance officer, I want to query all compliance violations by document ID so that I can review the compliance status of specific documents.
Context: query all compliance violations by document ID.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- API endpoint returns all violations for a given document ID
- Response includes violation type, description, timestamp, and status
- Violations are sorted by timestamp descending
- Endpoint supports pagination for large violation sets
- Returns 404 if document ID does not exist
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-002-feature-003-story-003 (As a compliance officer, I want to query all compliance violations by document ID so that I can review the compliance status of specific documents).
