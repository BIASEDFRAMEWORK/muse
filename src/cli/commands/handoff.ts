import { spawnSync } from 'child_process'
import fs from 'fs'
import { loadConfig } from '../../config/loadConfig'
import { resolveArtifactByIdOrPath } from '../../pipeline/deriveArtifacts'
import { commandExists, createPullRequest } from './pr'

export interface HandoffOptions {
  pr?: boolean
  dryRun?: boolean
}

function resolveHandoffCommand(provider: string): string {
  const fromEnv = process.env.MUSE_CODEX_COMMAND?.trim() || process.env.MUSE_HANDOFF_COMMAND?.trim()
  if (fromEnv) {
    return fromEnv
  }

  if (provider === 'anthropic') {
    return 'claude'
  }

  if (provider === 'openai') {
    return 'codex'
  }

  return 'codex'
}

export function handoffCommand(prompt: string, options: HandoffOptions = {}): void {
  const promptRef = prompt.trim()
  if (!promptRef) {
    throw new Error('A prompt artifact is required.')
  }

  const config = loadConfig('muse.yaml')
  const resolved = resolveArtifactByIdOrPath(promptRef)
  const handoffCommandName = resolveHandoffCommand(config.ai.provider)

  if (options.dryRun) {
    process.stdout.write(`Resolved prompt: ${resolved.path}\n`)
    process.stdout.write(`AI provider: ${config.ai.provider}\n`)
    process.stdout.write(`AI model: ${config.ai.model}\n`)
    process.stdout.write(`Would run: ${handoffCommandName} < ${resolved.path}\n`)
    if (options.pr) {
      process.stdout.write(`Would then run: muse pr ${promptRef}\n`)
    }
    return
  }

  if (!commandExists(handoffCommandName)) {
    throw new Error(
      `Required handoff command not found: ${handoffCommandName} (provider: ${config.ai.provider}). ` +
        `Install the matching CLI or set MUSE_HANDOFF_COMMAND to the executable you want Muse to use.`,
    )
  }

  const promptBody = fs.readFileSync(resolved.path, 'utf8')
  process.stdout.write(`Handing off prompt to ${handoffCommandName}: ${resolved.path}\n`)

  const handoffProcess = spawnSync(handoffCommandName, [], {
    input: promptBody,
    stdio: ['pipe', 'inherit', 'inherit'],
  })

  if (handoffProcess.status !== 0) {
    throw new Error(`${handoffCommandName} exited with status ${handoffProcess.status ?? 'unknown'}`)
  }

  if (options.pr) {
    createPullRequest(promptRef)
  }
}
