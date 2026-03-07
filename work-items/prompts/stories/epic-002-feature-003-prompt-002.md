---
id: epic-002-feature-003-prompt-002
prompt_id: epic-002-feature-003-prompt-002
story: epic-002-feature-003-story-002
feature: epic-002-feature-003
epic: epic-002
source: specs/governance/original-document-system-of-record.digital.md
---
# AI Implementation Prompt: epic-002-feature-003-prompt-002

## Objective
Implement As a system administrator, I want to configure compliance rules for document retention periods so that I can automatically detect retention policy violations.

## Repo Context
- Primary code paths: src/cli/, src/pipeline/, src/config/
- Generated artifacts: specs/capabilities/, specs/epics/, specs/features/, specs/stories/, work-items/prompts/stories/
- Story linkage: epic-002-feature-003-story-002 -> epic-002-feature-003 -> epic-002

## Required Changes
1. Implement As a system administrator, I want to configure compliance rules for document retention periods so that I can automatically detect retention policy violations.
2. Create retention_rules configuration table with document_type and retention_days
3. Implement scheduled job to check document ages against rules
4. Calculate age using metadata creation timestamp
5. Store retention violations with violation_type = 'RETENTION_EXCEEDED'

## Constraints
- Preserve traceability metadata and naming conventions for generated artifacts.
- Do not modify files under /docs/organizational-contracts without explicit instruction.
- Keep changes scoped to the requested objective and avoid unrelated refactors.
- Use governance source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md

## Acceptance Criteria
- Admin can define retention period rules by document type via API
- System calculates document age from creation timestamp in metadata
- Documents exceeding retention period are flagged as violations
- Retention violations include document ID, creation date, and retention period
- Rules can be updated without system restart
- Outcome focus for this story: The API exposes read-only access:.

## Validation
- `npm run build`
- `node scripts/validate-traceability.mjs`

## Deliverable
Return a patch plus a short summary of modified files and validation results.

## Implementation Brief
Implement As a system administrator, I want to configure compliance rules for document retention periods so that I can automatically detect retention policy violations.
Context: configure compliance rules for document retention periods.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Admin can define retention period rules by document type via API
- System calculates document age from creation timestamp in metadata
- Documents exceeding retention period are flagged as violations
- Retention violations include document ID, creation date, and retention period
- Rules can be updated without system restart
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-002-feature-003-story-002 (As a system administrator, I want to configure compliance rules for document retention periods so that I can automatically detect retention policy violations).
