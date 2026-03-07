import path from 'path'
import { convertDocumentToMarkdown } from '../../markdown/convert'
import { loadConfig } from '../../config/loadConfig'
import { deriveArtifacts } from '../../pipeline/deriveArtifacts'
import { generateDecisions } from '../../pipeline/generateDecisions'
import { generateTodo } from '../../pipeline/generateTodo'

export async function runCommand(file: string): Promise<void> {
  const config = loadConfig()
  let markdownPath = file

  if (!file.toLowerCase().endsWith('.md')) {
    markdownPath = convertDocumentToMarkdown(file)
  }

  await deriveArtifacts({ sourceMarkdownPath: markdownPath, ai: config.ai })
  generateDecisions(markdownPath)
  generateTodo()

  process.stdout.write(`Pipeline completed for ${path.relative(process.cwd(), markdownPath)}\n`)
}
