---
id: prompt-029
story: epic-004-feature-001-story-002
source: docs/derived/governance/original-document-system-of-record.digital.md
---
# Implementation Prompt for epic-004-feature-001-story-002

Implement Configure document metadata schema definitions.
Context: define and update metadata schema rules for document validation.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- Given a valid JSON schema definition, when uploaded via configuration endpoint, then the schema is stored and applied to subsequent validations
- Given an invalid schema definition, when uploaded, then the system returns validation errors
- Given multiple schema versions, when retrieving current schema, then the most recent active version is returned
- Given a schema update, when applied, then existing documents remain unaffected but new uploads use the updated schema
- Outcome focus for this story: The API exposes read-only access:.
- Implementation outcome is unique to epic-004-feature-001-story-002 (Configure document metadata schema definitions).
