import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'

function ensureGovernanceDir(): string {
  const dir = path.resolve('docs/derived/governance')
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

function resolvePythonCommand(): string {
  const explicit = process.env.MUSE_PYTHON?.trim()
  if (explicit) {
    return explicit
  }

  const candidates = [
    path.resolve('.venv/bin/python'),
    path.resolve('.venv/Scripts/python.exe'),
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  return 'python3'
}

export function convertDocumentToMarkdown(inputFile: string): string {
  const absoluteInput = path.resolve(inputFile)
  if (!fs.existsSync(absoluteInput)) {
    throw new Error(`Input file not found: ${absoluteInput}`)
  }

  const governanceDir = ensureGovernanceDir()
  const outputName = `${path.parse(absoluteInput).name}.md`
  const outputPath = path.join(governanceDir, outputName)

  const pythonCommand = resolvePythonCommand()
  const attempt = spawnSync(pythonCommand, ['-m', 'markitdown', absoluteInput], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  })

  if (attempt.status !== 0 || !attempt.stdout.trim()) {
    const stderr = attempt.stderr?.trim() || 'markitdown execution failed'
    throw new Error(`MarkItDown conversion failed (python: ${pythonCommand}). Install with '${pythonCommand} -m pip install markitdown[pdf]'. ${stderr}`)
  }

  const content = attempt.stdout.endsWith('\n') ? attempt.stdout : `${attempt.stdout}\n`
  fs.writeFileSync(outputPath, content, 'utf8')

  return outputPath
}
