---
id: prompt-033
story: epic-004-feature-002-story-003
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-004-feature-002-story-003

Implement Include integrity hash in metadata API responses.
Context: receive the integrity hash value along with document metadata.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- GET /documents/{documentId}/metadata includes 'integrity_hash' field
- Hash value is returned as hexadecimal string
- Hash field is always present for documents with metadata
- Response schema includes hash field in API documentation
- Hash format follows consistent 64-character SHA-256 pattern
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-004-feature-002-story-003 (Include integrity hash in metadata API responses).
