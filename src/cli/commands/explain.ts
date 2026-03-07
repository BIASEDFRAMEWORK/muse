import { explainArtifact } from '../../pipeline/explainArtifact'

export async function explainCommand(artifact: string): Promise<void> {
  const explanation = explainArtifact(artifact)
  process.stdout.write(`${explanation}\n`)
}
