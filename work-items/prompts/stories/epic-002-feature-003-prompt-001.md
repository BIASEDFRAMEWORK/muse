---
id: epic-002-feature-003-prompt-001
prompt_id: epic-002-feature-003-prompt-001
story: epic-002-feature-003-story-001
feature: epic-002-feature-003
epic: epic-002
source: specs/governance/original-document-system-of-record.digital.md
---
# AI Implementation Prompt: epic-002-feature-003-prompt-001

## Objective
Implement As a compliance officer, I want the system to automatically scan document metadata for missing required fields so that I can identify non-compliant documents.

## Repo Context
- Primary code paths: src/cli/, src/pipeline/, src/config/
- Generated artifacts: specs/capabilities/, specs/epics/, specs/features/, specs/stories/, work-items/prompts/stories/
- Story linkage: epic-002-feature-003-story-001 -> epic-002-feature-003 -> epic-002

## Required Changes
1. Implement As a compliance officer, I want the system to automatically scan document metadata for missing required fields so that I can identify non-compliant documents.
2. Implement metadata validation rules engine
3. Required fields configuration should be externalized
4. Use GET /documents/{documentId}/metadata endpoint for validation
5. Store violations with foreign key to document record

## Constraints
- Preserve traceability metadata and naming conventions for generated artifacts.
- Do not modify files under /docs/organizational-contracts without explicit instruction.
- Keep changes scoped to the requested objective and avoid unrelated refactors.
- Use governance source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md

## Acceptance Criteria
- System scans all document metadata on ingestion for required fields
- Missing required fields are flagged as compliance violations
- Violation details include document ID, missing field name, and timestamp
- Violations are stored in a queryable compliance violations table
- System generates violation events for downstream processing
- Outcome focus for this story: The API exposes read-only access:.

## Validation
- `npm run build`
- `node scripts/validate-traceability.mjs`

## Deliverable
Return a patch plus a short summary of modified files and validation results.

## Implementation Brief
Implement As a compliance officer, I want the system to automatically scan document metadata for missing required fields so that I can identify non-compliant documents.
Context: automatically scan document metadata for missing required fields.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- System scans all document metadata on ingestion for required fields
- Missing required fields are flagged as compliance violations
- Violation details include document ID, missing field name, and timestamp
- Violations are stored in a queryable compliance violations table
- System generates violation events for downstream processing
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-002-feature-003-story-001 (As a compliance officer, I want the system to automatically scan document metadata for missing required fields so that I can identify non-compliant documents).
