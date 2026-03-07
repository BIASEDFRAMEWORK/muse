import { traceArtifact } from '../../pipeline/traceArtifact'

export async function traceCommand(artifact: string): Promise<void> {
  const trace = traceArtifact(artifact)
  process.stdout.write(`${trace}\n`)
}
