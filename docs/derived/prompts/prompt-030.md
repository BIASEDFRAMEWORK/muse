---
id: prompt-030
story: epic-004-feature-001-story-003
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-004-feature-001-story-003

Implement Retrieve document metadata with schema validation status.
Context: request document metadata and receive validation status information.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Given a valid document ID, when requesting metadata via GET /documents/{documentId}/metadata, then return metadata with validation status
- Given a document with valid metadata, when retrieved, then validation_status field shows 'valid'
- Given a document with invalid metadata, when retrieved, then validation_status shows 'invalid' with error details
- Given a non-existent document ID, when requested, then return 404 error
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-004-feature-001-story-003 (Retrieve document metadata with schema validation status).
