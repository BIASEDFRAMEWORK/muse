---
id: prompt-029
story: epic-004-feature-001-story-002
source: /Users/dustingaspard/Documents/Excella/Workspace/Muse/docs/derived/governance/Digital System Audit Logging and Governance Policy.digital.md
---
# Implementation Prompt for epic-004-feature-001-story-002

Implement Create API request logging middleware for service endpoints.
Context: implement middleware that automatically logs all API requests with required audit fields.
Return production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.

## Implementation Checklist
- All API endpoints log request timestamp, calling identity, endpoint, outcome, and response status
- Middleware can be enabled/disabled per endpoint via configuration
- Sensitive data in request/response bodies is automatically redacted
- Log entries are generated for both successful and failed requests
- Performance impact is less than 5ms per request
- Outcome focus for this story: Audit records must be structured so they can be consumed by automated monitoring and analysis.
- Implementation outcome is unique to epic-004-feature-001-story-002 (Create API request logging middleware for service endpoints).
