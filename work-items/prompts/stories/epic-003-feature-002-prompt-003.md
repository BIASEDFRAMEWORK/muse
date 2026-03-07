---
id: epic-003-feature-002-prompt-003
prompt_id: epic-003-feature-002-prompt-003
story: epic-003-feature-002-story-003
feature: epic-003-feature-002
epic: epic-003
source: specs/governance/original-document-system-of-record.digital.md
---
# AI Implementation Prompt: epic-003-feature-002-prompt-003

## Objective
Implement Context-aware permission evaluation engine.

## Repo Context
- Primary code paths: src/cli/, src/pipeline/, src/config/
- Generated artifacts: specs/capabilities/, specs/epics/, specs/features/, specs/stories/, work-items/prompts/stories/
- Story linkage: epic-003-feature-002-story-003 -> epic-003-feature-002 -> epic-003

## Required Changes
1. Implement Context-aware permission evaluation engine.
2. Implement context collection middleware to gather request attributes
3. Design policy decision point (PDP) architecture for rule evaluation
4. Support external context providers (HR systems, device management)
5. Implement policy information point (PIP) for attribute retrieval

## Constraints
- Preserve traceability metadata and naming conventions for generated artifacts.
- Do not modify files under /docs/organizational-contracts without explicit instruction.
- Keep changes scoped to the requested objective and avoid unrelated refactors.
- Use governance source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/specs/governance/original-document-system-of-record.digital.md

## Acceptance Criteria
- Permission evaluation considers user attributes (role, department, clearance level)
- Permission evaluation considers environmental context (time, IP address, device type)
- Permission evaluation considers document attributes (classification, owner, creation date)
- System supports conditional permission rules based on multiple context factors
- Permission decisions are explainable and include reasoning in audit logs
- Outcome focus for this story: The API exposes read-only access:.

## Validation
- `npm run build`
- `node scripts/validate-traceability.mjs`

## Deliverable
Return a patch plus a short summary of modified files and validation results.

## Implementation Brief
Implement Context-aware permission evaluation engine.
Context: I want the permission engine to evaluate access based on contextual factors.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Permission evaluation considers user attributes (role, department, clearance level)
- Permission evaluation considers environmental context (time, IP address, device type)
- Permission evaluation considers document attributes (classification, owner, creation date)
- System supports conditional permission rules based on multiple context factors
- Permission decisions are explainable and include reasoning in audit logs
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-003-feature-002-story-003 (Context-aware permission evaluation engine).
