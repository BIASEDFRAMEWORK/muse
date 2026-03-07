---
id: prompt-032
story: epic-004-feature-002-story-002
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-004-feature-002-story-002

Implement Verify metadata integrity hash on retrieval.
Context: automatically verify metadata integrity hash when retrieving document metadata.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Hash verification occurs on every metadata retrieval request
- System recalculates hash from current metadata and compares with stored hash
- Verification status is included in GET /documents/{documentId}/metadata response
- Request fails with 409 status if hash verification fails
- Successful verification returns metadata with integrity_verified: true
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-004-feature-002-story-002 (Verify metadata integrity hash on retrieval).
