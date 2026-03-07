# Muse Developer Guide (CLI-first)

## Overview

Muse is a CLI-first governance-to-artifact pipeline. It converts governance documents into markdown, derives software artifacts, and produces traceable outputs for engineering execution.

## Prerequisites

- Node.js 20+
- npm
- Python 3 (for MarkItDown conversion)

Optional for AI-backed generation:
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL`

## Setup

```bash
npm install
npm run build
```

Initialize a default config:

```bash
node dist/cli/index.js init
```

This creates `muse.yaml` when missing.

## Core Commands

```bash
# Convert source governance document to markdown
node dist/cli/index.js convertMD path/to/governance.docx

# Derive epics/features/user-stories/prompts from governance markdown
node dist/cli/index.js deriveArtifacts specs/governance/<file>.md

# Produce decisions and TODO prioritization
node dist/cli/index.js decisions specs/governance/<file>.md
node dist/cli/index.js todo specs/governance/<file>.md

# Run full declarative pipeline from muse.yaml
node dist/cli/index.js apply

# Explain an artifact and trace lineage
node dist/cli/index.js explain specs/stories/epic-001-feature-001-story-001.md
node dist/cli/index.js trace epic-001-feature-001-story-001

# Stage and commit generated artifacts
node dist/cli/index.js commit
```

## Declarative Pipeline (`muse.yaml`)

`muse apply` reads `muse.yaml` and runs configured stages in order.

Typical flow:
- Convert governance source to markdown (skipped if source already `.md`)
- Derive artifacts (`specs/epics`, `specs/capabilities`, `specs/stories`, `work-items/prompts/stories`)
- Generate decisions (`specs/decisions`)
- Generate prioritized TODO (`work-items/tasks/TODO.md`)

## Directory Map

Primary implementation paths:
- `src/cli` — command parsing and handlers
- `src/config` — config loading/defaults
- `src/markdown` — MarkItDown conversion wrapper
- `src/pipeline` — artifact derivation, decisions, todo, explain, trace
- `src/ai` — model client and prompts
- `scripts/validate-traceability.mjs` — traceability checks

Generated outputs:
- `specs/governance`
- `specs/epics`
- `specs/capabilities`
- `specs/stories`
- `work-items/prompts/stories`
- `specs/decisions`
- `work-items/tasks`

## Validation Loop

Use this loop during development:

```bash
npm run build
node dist/cli/index.js apply
npm run traceability:check
```

If no API key is configured, generation remains deterministic via fallback behavior.

## Engineering Constraints

- Keep CLI parsing separate from business logic.
- Preserve front matter traceability metadata.
- Keep deterministic outputs when no API key is configured.
- Do not modify `/contracts` unless explicitly requested.
