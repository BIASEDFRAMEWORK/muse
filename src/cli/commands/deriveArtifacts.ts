import { loadConfig } from '../../config/loadConfig'
import { deriveArtifacts } from '../../pipeline/deriveArtifacts'
import { filterDigitalContent } from '../../pipeline/filterDigitalContent'
import { extractCapabilities } from '../../pipeline/extractCapabilities'

interface DeriveArtifactsCliOptions {
  fast?: boolean
}

export async function deriveArtifactsCommand(markdown: string, options: DeriveArtifactsCliOptions = {}): Promise<void> {
  const config = loadConfig()
  const sourceMarkdownPath = markdown.toLowerCase().endsWith('.digital.md')
    ? markdown
    : filterDigitalContent(markdown, { verbose: false }).outputPath

  process.stdout.write(`Using digital-only governance source: ${sourceMarkdownPath}\n`)
  if (options.fast) {
    process.stdout.write('Fast mode enabled: reduced token budget and parallel story generation.\n')
  }

  extractCapabilities(sourceMarkdownPath)

  await deriveArtifacts({
    sourceMarkdownPath,
    ai: config.ai,
    mode: options.fast ? 'fast' : 'standard',
  })
  process.stdout.write('Generated capabilities, epics, features, user stories, and prompts.\n')
}
