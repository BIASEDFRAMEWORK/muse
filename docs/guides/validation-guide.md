# Muse Validation Guide (CLI-first)

## Quick Checks

Run these in order:

```bash
npm run build
node dist/cli/index.js apply
npm run traceability:check
```

## Common Issues

### 1) `muse apply` fails on markdown conversion

Cause:
- MarkItDown is not installed in Python.

Fix:

```bash
python3 -m pip install markitdown
```

Then rerun:

```bash
node dist/cli/index.js convertMD path/to/file.pdf
```

### 2) `traceability:check` fails

Cause:
- Missing lineage metadata or orphan artifacts.

Fix:
- Regenerate artifacts from governance markdown:

```bash
node dist/cli/index.js deriveArtifacts docs/derived/governance/<file>.md
node dist/cli/index.js decisions docs/derived/governance/<file>.md
node dist/cli/index.js todo docs/derived/governance/<file>.md
npm run traceability:check
```

### 3) `muse explain` or `muse trace` cannot find artifact

Cause:
- ID/path mismatch.

Fix:
- Use a valid path (example):
  - `node dist/cli/index.js explain docs/derived/user-stories/epic-001-feature-001-story-001.md`
- Or use an existing ID:
  - `node dist/cli/index.js trace epic-001-feature-001-story-001`

### 4) `muse commit` fails

Cause:
- No changes staged, or `gh` not installed for PR creation.

Fix:

```bash
git status
node dist/cli/index.js commit
```

For PR mode, install and auth GitHub CLI first:

```bash
gh auth status
node dist/cli/index.js commit --pr
```

## Expected Output Directories

After a successful `muse apply`:

- `docs/derived/governance/`
- `docs/derived/epics/`
- `docs/derived/features/`
- `docs/derived/user-stories/`
- `docs/derived/prompts/`
- `docs/decisions/`
- `docs/derived/todo/`

## CI Validation

Workflow `.github/workflows/muse-pipeline.yml` runs:

- dependency install
- build
- `muse apply`
- commit + PR automation
