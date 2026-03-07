import { generateDecisions } from '../../pipeline/generateDecisions'

export async function decisionsCommand(markdown: string): Promise<void> {
  const outputPath = generateDecisions(markdown)
  process.stdout.write(`Generated decisions: ${outputPath}\n`)
}
