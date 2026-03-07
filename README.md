# Muse (CLI-first)

Muse is a CLI pipeline that converts governance documents into engineering artifacts.

## What it does

1. Converts governance documents to markdown
2. Derives epics, features, user stories, and AI prompts
3. Generates architecture/product decision documents
4. Builds a prioritized TODO backlog
5. Supports explainability and traceability from CLI

## Install

```bash
npm install
npm run build
```

Microsoft MarkItDown is required for document conversion:

```bash
python3 -m pip install markitdown
```

## CLI commands

```bash
muse init
muse apply
muse convertMD <file>
muse deriveArtifacts <markdown>
muse decisions <markdown>
muse todo <markdown>
muse run <file>
muse explain <artifact>
muse trace <artifact>
muse commit [--pr]
```

## Declarative config

Create `muse.yaml` with:

```yaml
project: system-access-logging

governance:
  source: docs/governance/policy.pdf

pipeline:
  convert_markdown: true
  derive_artifacts: true
  decisions: true
  todo: true

ai:
  provider: anthropic
  model: claude-sonnet-4-20250514
```

## Generated outputs

- `specs/governance/`
- `specs/epics/`
- `specs/capabilities/`
- `specs/stories/`
- `work-items/prompts/stories/`
- `specs/decisions/`
- `work-items/tasks/`

## Notes

- Keep business logic in `src/pipeline/` and keep CLI parsing in `src/cli/`.
- Do not modify files in `docs/organizational-contracts/` unless explicitly requested.
