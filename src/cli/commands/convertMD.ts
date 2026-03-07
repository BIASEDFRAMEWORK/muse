import path from 'path'
import { convertDocumentToMarkdown } from '../../markdown/convert'

export async function convertMDCommand(file: string): Promise<void> {
  const outputPath = convertDocumentToMarkdown(file)
  process.stdout.write(`Converted to markdown: ${path.relative(process.cwd(), outputPath)}\n`)
}
