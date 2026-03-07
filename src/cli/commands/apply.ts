import { loadConfig } from '../../config/loadConfig'
import { convertDocumentToMarkdown } from '../../markdown/convert'
import { deriveArtifacts } from '../../pipeline/deriveArtifacts'
import { generateDecisions } from '../../pipeline/generateDecisions'
import { generateTodo } from '../../pipeline/generateTodo'
import { filterDigitalContent } from '../../pipeline/filterDigitalContent'
import { extractCapabilities } from '../../pipeline/extractCapabilities'

export interface ApplyCommandOptions {
  fast?: boolean
  demo?: boolean
}

export async function applyCommand(options: ApplyCommandOptions = {}): Promise<void> {
  const config = loadConfig('muse.yaml')
  let governanceMarkdown = config.governance.source

  if (config.pipeline.convert_markdown && !config.governance.source.toLowerCase().endsWith('.md')) {
    governanceMarkdown = convertDocumentToMarkdown(config.governance.source)
  }

  if (!governanceMarkdown.toLowerCase().endsWith('.digital.md')) {
    const filtered = filterDigitalContent(governanceMarkdown, { verbose: false })
    governanceMarkdown = filtered.outputPath
  }
  process.stdout.write(`Using digital-only governance source: ${governanceMarkdown}\n`)

  if (config.pipeline.derive_artifacts) {
    extractCapabilities(governanceMarkdown)

    if (options.demo) {
      process.stdout.write('Demo mode enabled for apply: fastest profile with progressive output.\n')
    } else if (options.fast) {
      process.stdout.write('Fast mode enabled for apply: reduced token budget and parallel story generation.\n')
    }
    await deriveArtifacts({
      sourceMarkdownPath: governanceMarkdown,
      ai: config.ai,
      mode: options.demo ? 'demo' : options.fast ? 'fast' : 'standard',
    })
  }

  if (config.pipeline.decisions) {
    generateDecisions(governanceMarkdown)
  }

  if (config.pipeline.todo) {
    generateTodo()
  }

  process.stdout.write('muse apply completed.\n')
}
