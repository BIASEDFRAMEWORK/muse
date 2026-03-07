# Muse Documentation (CLI-first)

Muse now operates as a pure CLI pipeline. This documentation focuses on command usage, pipeline behavior, and generated artifacts.

## Start Here

- [Developer Guide](./guides/developer-guide.md) — install, build, run, and command reference
- [Validation Guide](./guides/validation-guide.md) — troubleshooting common CLI and pipeline issues
- [Examples](./examples/end-to-end-workflow.md) — end-to-end workflow examples

## Generated Artifacts

- [derived governance](./derived/governance)
- [derived epics](./derived/epics)
- [derived features](./derived/features)
- [derived user-stories](./derived/user-stories)
- [derived prompts](./derived/prompts)
- [decisions](./decisions)
- [derived todo](./derived/todo)

## Project-Specific Plans

- [projects](./projects)

## Boundaries

- `docs/derived/governance` contains governance markdown content used to derive software artifacts.
- `organizational_contracts/` contains stable product and AI guardrails (vision, persona, format, policy constraints).
- Keep these separate: governance is source content, while organizational contracts are operating constraints.

## Notes

- Legacy web/API architecture documentation has been removed as part of the CLI-first refactor.
- Artifact generation and traceability behavior is now implemented in `src/cli`, `src/pipeline`, and `scripts/validate-traceability.mjs`.
