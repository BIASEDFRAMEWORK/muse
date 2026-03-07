# Copilot instructions — Muse (CLI-first)

Purpose
- Help coding agents implement and maintain the CLI-first Muse pipeline.

Quick start
- Install dependencies: `npm install`
- Build CLI: `npm run build`
- Initialize config: `node dist/cli/index.js init` (or `muse init` after install/link)
- Run declarative pipeline: `node dist/cli/index.js apply`

Primary architecture
- `src/cli/` — commander entrypoint and command handlers
- `src/config/` — `muse.yaml` loading/defaults
- `src/markdown/` — Microsoft MarkItDown conversion wrapper
- `src/pipeline/` — derivation, decisions, todo, explain, trace logic
- `src/ai/` — LLM client and prompts
- `src/artifacts/` — artifact interfaces

Generated outputs
- `specs/governance/`
- `specs/epics/`
- `specs/capabilities/`
- `specs/stories/`
- `work-items/prompts/stories/`
- `specs/decisions/`
- `work-items/tasks/`

Engineering constraints
- Keep CLI command parsing separate from business logic.
- Keep outputs deterministic when no API key is configured.
- Preserve traceability metadata in artifact front matter.
- Do NOT modify files under `/docs/organizational-contracts` without explicit instruction.
