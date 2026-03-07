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
node dist/cli/index.js deriveArtifacts docs/derived/governance/<file>.md

# Produce decisions and TODO prioritization
node dist/cli/index.js decisions docs/derived/governance/<file>.md
node dist/cli/index.js todo docs/derived/governance/<file>.md

# Run full declarative pipeline from muse.yaml
node dist/cli/index.js apply

# Explain an artifact and trace lineage
node dist/cli/index.js explain docs/derived/user-stories/epic-001-feature-001-story-001.md
node dist/cli/index.js trace epic-001-feature-001-story-001

# Stage and commit generated artifacts
node dist/cli/index.js commit
```

## Declarative Pipeline (`muse.yaml`)

`muse apply` reads `muse.yaml` and runs configured stages in order.

Typical flow:
- Convert governance source to markdown (skipped if source already `.md`)
- Derive artifacts (`docs/derived/epics`, `docs/derived/features`, `docs/derived/user-stories`, `docs/derived/prompts`)
- Generate decisions (`docs/decisions`)
- Generate prioritized TODO (`docs/derived/todo/TODO.md`)

## Directory Map

Primary implementation paths:
- `src/cli` — command parsing and handlers
- `src/config` — config loading/defaults
- `src/markdown` — MarkItDown conversion wrapper
- `src/pipeline` — artifact derivation, decisions, todo, explain, trace
- `src/ai` — model client and prompts
- `scripts/validate-traceability.mjs` — traceability checks

Generated outputs:
- `docs/derived/governance`
- `docs/derived/epics`
- `docs/derived/features`
- `docs/derived/user-stories`
- `docs/derived/prompts`
- `docs/decisions`
- `docs/derived/todo`

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
