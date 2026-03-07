---
id: prompt-008
story: epic-001-feature-003-story-002
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-001-feature-003-story-002

Implement Access document metadata with integrity information.
Context: retrieve document metadata including integrity verification details.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- GET /documents/{documentId}/metadata includes content hash in response
- Metadata response includes hash algorithm type (e.g., SHA-256)
- Response includes timestamp of last integrity verification
- Metadata endpoint performs integrity check and reports status
- API returns metadata even if integrity check fails, but flags the issue
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-001-feature-003-story-002 (Access document metadata with integrity information).
