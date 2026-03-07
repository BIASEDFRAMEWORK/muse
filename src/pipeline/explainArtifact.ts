import { resolveArtifactByIdOrPath } from './deriveArtifacts'

export function explainArtifact(artifact: string): string {
  const result = resolveArtifactByIdOrPath(artifact)
  const id = String(result.data.id || 'unknown')
  const source = String(result.data.source || 'unknown')

  return [
    'Explain:',
    '',
    `purpose: ${id} defines implementation-ready behavior derived from governance.`,
    `governance origin: ${source}`,
    `implementation guidance: use the artifact acceptance intent to create testable tasks and code changes.`,
    `security implications: preserve traceability links and implement least-privilege and audit logging controls where applicable.`,
  ].join('\n')
}
