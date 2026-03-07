---
id: prompt-009
story: epic-001-feature-003-story-003
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-001-feature-003-story-003

Implement Handle corrupted documents gracefully.
Context: receive clear error responses when document integrity is compromised.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- API returns structured error response for integrity failures
- Error response includes original hash and calculated hash for comparison
- System logs detailed integrity failure information for investigation
- Corrupted documents are marked with corruption flag in database
- Error response includes timestamp of when corruption was detected
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-001-feature-003-story-003 (Handle corrupted documents gracefully).
