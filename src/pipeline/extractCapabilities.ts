import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { CapabilityArtifact } from '../artifacts/capability'

type CapabilityArea = {
  key: string
  name: string
  description: string
  keywords: string[]
}

const CAPABILITY_AREAS: CapabilityArea[] = [
  {
    key: 'audit-logging',
    name: 'Digital Audit Logging',
    description: 'System capability enforcing governance audit logging requirements.',
    keywords: ['audit', 'logging', 'log', 'evidence', 'traceability'],
  },
  {
    key: 'access-control',
    name: 'Access Control Enforcement',
    description: 'System capability enforcing authenticated and authorized access to protected operations.',
    keywords: ['access', 'authorization', 'auth', 'least privilege', 'role'],
  },
  {
    key: 'monitoring',
    name: 'Security Monitoring and Alerting',
    description: 'System capability for monitoring, alerting, and operational detection of policy violations.',
    keywords: ['monitor', 'alert', 'incident', 'detection', 'response'],
  },
  {
    key: 'identity-attribution',
    name: 'Identity Attribution and Accountability',
    description: 'System capability to attribute system actions to identities for accountability and investigations.',
    keywords: ['identity', 'actor', 'user', 'principal', 'attribution'],
  },
  {
    key: 'data-protection',
    name: 'Data Protection and Integrity',
    description: 'System capability protecting sensitive data through encryption, integrity controls, and secure handling.',
    keywords: ['encrypt', 'encryption', 'integrity', 'confidential', 'data protection'],
  },
  {
    key: 'retention-lifecycle',
    name: 'Retention and Lifecycle Governance',
    description: 'System capability implementing retention, archival, and lifecycle controls for governance evidence.',
    keywords: ['retention', 'archive', 'lifecycle', 'deletion', 'record'],
  },
]

function capabilityId(index: number): string {
  return `CAP-${String(index + 1).padStart(3, '0')}`
}

function capabilityFileName(index: number): string {
  return `cap-${String(index + 1).padStart(3, '0')}.md`
}

function scoreCapability(markdown: string, area: CapabilityArea): number {
  const text = markdown.toLowerCase()
  return area.keywords.reduce((sum, keyword) => {
    let matches = 0
    let start = 0
    const needle = keyword.toLowerCase()
    while (start < text.length) {
      const index = text.indexOf(needle, start)
      if (index === -1) {
        break
      }
      matches += 1
      start = index + needle.length
    }
    return sum + matches
  }, 0)
}

function ensureCapabilitiesDir(): string {
  const directory = path.resolve('specs/capabilities')
  fs.mkdirSync(directory, { recursive: true })

  for (const name of fs.readdirSync(directory)) {
    if (!name.endsWith('.md')) {
      continue
    }
    fs.rmSync(path.join(directory, name), { force: true })
  }

  return directory
}

function resolveDocumentId(markdownPath: string, raw: string): string | undefined {
  const parsed = matter(raw)
  if (typeof parsed.data.document_id === 'string' && parsed.data.document_id.trim()) {
    return parsed.data.document_id.trim()
  }

  const sourcePath = typeof parsed.data.source_path === 'string' ? parsed.data.source_path.trim() : ''
  if (!sourcePath) {
    return undefined
  }

  const sourceAbsolute = path.isAbsolute(sourcePath) ? sourcePath : path.resolve(sourcePath)
  if (!fs.existsSync(sourceAbsolute)) {
    return undefined
  }

  const sourceRaw = fs.readFileSync(sourceAbsolute, 'utf8')
  const sourceParsed = matter(sourceRaw)
  if (typeof sourceParsed.data.document_id === 'string' && sourceParsed.data.document_id.trim()) {
    return sourceParsed.data.document_id.trim()
  }

  const markdownAbsolute = path.resolve(markdownPath)
  const markdownParsed = matter(fs.readFileSync(markdownAbsolute, 'utf8'))
  if (typeof markdownParsed.data.document_id === 'string' && markdownParsed.data.document_id.trim()) {
    return markdownParsed.data.document_id.trim()
  }

  return undefined
}

function writeCapability(directory: string, capability: CapabilityArtifact, index: number): void {
  const frontMatter = [
    '---',
    `id: ${capability.id}`,
    `capability_id: ${capability.id}`,
    `name: ${capability.name}`,
    `governance_source: ${capability.governanceSource}`,
    `source_path: ${capability.sourcePath}`,
    ...(capability.documentId ? [`derived_from_document_id: ${capability.documentId}`] : []),
    '---',
    '',
  ].join('\n')

  const body = [
    `# ${capability.name}`,
    '',
    '## Description',
    capability.description,
    '',
    '## Governance Source',
    capability.governanceSource,
    '',
  ].join('\n')

  const outputPath = path.join(directory, capabilityFileName(index))
  fs.writeFileSync(outputPath, `${frontMatter}${body}`.trimEnd() + '\n', 'utf8')
}

export function extractCapabilities(governanceMarkdownPath: string): CapabilityArtifact[] {
  const absolute = path.resolve(governanceMarkdownPath)
  if (!fs.existsSync(absolute)) {
    throw new Error(`Governance markdown not found: ${absolute}`)
  }

  const raw = fs.readFileSync(absolute, 'utf8')
  const parsed = matter(raw)
  const markdown = parsed.content
  const documentId = resolveDocumentId(absolute, raw)
  const capabilitiesDir = ensureCapabilitiesDir()

  const scored = CAPABILITY_AREAS.map((area) => ({ area, score: scoreCapability(markdown, area) }))
  const selectedAreas = scored.filter((item) => item.score > 0).map((item) => item.area)
  const orderedAreas = (selectedAreas.length > 0 ? selectedAreas : CAPABILITY_AREAS.slice(0, 4)).slice(0, 6)

  const capabilities = orderedAreas.map((area, index) => ({
    id: capabilityId(index),
    name: area.name,
    description: area.description,
    governanceSource: absolute,
    sourcePath: absolute,
    ...(documentId ? { documentId } : {}),
  }))

  capabilities.forEach((capability, index) => writeCapability(capabilitiesDir, capability, index))
  return capabilities
}

export function loadCapabilities(governanceMarkdownPath?: string): CapabilityArtifact[] {
  const directory = path.resolve('specs/capabilities')
  if (!fs.existsSync(directory)) {
    return []
  }

  const sourceFilter = governanceMarkdownPath ? path.resolve(governanceMarkdownPath) : null

  const capabilities = fs
    .readdirSync(directory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const raw = fs.readFileSync(path.join(directory, name), 'utf8')
      const parsed = matter(raw)
      const data = parsed.data as Record<string, unknown>
      const governanceSource = typeof data.governance_source === 'string' ? data.governance_source : ''
      const sourcePath = typeof data.source_path === 'string' ? data.source_path : governanceSource
      return {
        id: typeof data.id === 'string' ? data.id : path.parse(name).name.toUpperCase(),
        name: typeof data.name === 'string' ? data.name : path.parse(name).name,
        description: parsed.content.split(/\r?\n/).slice(0, 4).join(' ').trim(),
        governanceSource,
        sourcePath,
        documentId: typeof data.derived_from_document_id === 'string' ? data.derived_from_document_id : undefined,
      } as CapabilityArtifact
    })
    .filter((capability) => {
      if (!sourceFilter) {
        return true
      }
      const capabilitySource = capability.sourcePath ? path.resolve(capability.sourcePath) : ''
      return capabilitySource === sourceFilter
    })
    .sort((a, b) => a.id.localeCompare(b.id))

  return capabilities
}
