import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { LlmClient } from '../ai/llmClient'
import { epicPrompt, featurePrompt, storyPrompt } from '../ai/prompts/templates'
import { EpicArtifact } from '../artifacts/epic'
import { FeatureArtifact } from '../artifacts/feature'
import { UserStoryArtifact } from '../artifacts/userStory'
import { AIPromptArtifact } from '../artifacts/aiPrompt'

export interface DeriveArtifactsOptions {
  sourceMarkdownPath: string
  ai: {
    provider: string
    model: string
  }
  mode?: 'standard' | 'fast'
}

interface GenerationProfile {
  epicLimit: number
  featureLimitPerEpic: number
  storyLimitPerFeature: number
  maxTokens: number
  storyConcurrency: number
}

const STANDARD_PROFILE: GenerationProfile = {
  epicLimit: 10,
  featureLimitPerEpic: 6,
  storyLimitPerFeature: 5,
  maxTokens: 3500,
  storyConcurrency: 1,
}

const FAST_PROFILE: GenerationProfile = {
  epicLimit: 5,
  featureLimitPerEpic: 3,
  storyLimitPerFeature: 3,
  maxTokens: 2200,
  storyConcurrency: 4,
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let nextIndex = 0

  async function runner(): Promise<void> {
    while (nextIndex < items.length) {
      const current = nextIndex
      nextIndex += 1
      results[current] = await worker(items[current], current)
    }
  }

  const runners = Array.from({ length: Math.max(1, Math.min(concurrency, items.length)) }, () => runner())
  await Promise.all(runners)
  return results
}

function id(prefix: string, index: number): string {
  return `${prefix}-${String(index + 1).padStart(3, '0')}`
}

function ordinal(index: number): string {
  return String(index + 1).padStart(3, '0')
}

function featureId(epicId: string, featureIndexWithinEpic: number): string {
  return `${epicId}-feature-${ordinal(featureIndexWithinEpic)}`
}

function storyId(featureIdValue: string, storyIndexWithinFeature: number): string {
  return `${featureIdValue}-story-${ordinal(storyIndexWithinFeature)}`
}

function ensureDirs(): void {
  const dirs = [
    'docs/derived/epics',
    'docs/derived/features',
    'docs/derived/user-stories',
    'docs/derived/prompts',
  ]
  for (const directory of dirs) {
    const absoluteDir = path.resolve(directory)
    fs.mkdirSync(absoluteDir, { recursive: true })

    for (const name of fs.readdirSync(absoluteDir)) {
      if (!name.endsWith('.md')) {
        continue
      }
      fs.rmSync(path.join(absoluteDir, name), { force: true })
    }
  }
}

function writeArtifact(filePath: string, body: string): void {
  fs.writeFileSync(path.resolve(filePath), body.trimEnd() + '\n', 'utf8')
}

function readGovernanceMarkdown(markdownPath: string): string {
  const absolute = path.resolve(markdownPath)
  if (!fs.existsSync(absolute)) {
    throw new Error(`Governance markdown not found: ${absolute}`)
  }
  return fs.readFileSync(absolute, 'utf8')
}

function headingCandidates(markdown: string): string[] {
  const lines = markdown.split(/\r?\n/)
  const headings = lines
    .filter((line) => /^#{1,3}\s+/.test(line.trim()))
    .map((line) => line.replace(/^#{1,3}\s+/, '').trim())
    .filter((line) => !/^digital governance extract$/i.test(line))
    .filter((line) => !/^source$/i.test(line))
    .filter(Boolean)
  return headings.slice(0, 8)
}

function thematicEpicCandidates(markdown: string): string[] {
  const text = markdown.toLowerCase()
  const themes: Array<{ title: string; pattern: RegExp }> = [
    { title: 'Access Control and Authorization', pattern: /\b(access|authorization|role[- ]based|least[- ]privilege)\b/ },
    { title: 'Audit Logging and Compliance Evidence', pattern: /\b(audit|logging|log retention|evidence|traceability)\b/ },
    { title: 'Data Protection and Encryption', pattern: /\b(encrypt|encryption|confidential|data protection|integrity)\b/ },
    { title: 'Digital Record Retention and Lifecycle', pattern: /\b(record retention|retention|lifecycle|archive|deletion)\b/ },
    { title: 'Security Monitoring and Incident Response', pattern: /\b(alert|monitor|incident|detection|response)\b/ },
    { title: 'Service and API Governance', pattern: /\b(api|service|integration|interface)\b/ },
    { title: 'Automation and Policy Enforcement', pattern: /\b(automation|automated|workflow|policy enforcement|orchestration)\b/ },
  ]

  return themes.filter((theme) => theme.pattern.test(text)).map((theme) => theme.title)
}

function fallbackEpics(markdown: string, source: string): EpicArtifact[] {
  const headings = headingCandidates(markdown)
  const thematic = thematicEpicCandidates(markdown)
  const base = [...new Set([...thematic, ...headings])]
  const selected = base.length > 0 ? base : ['Access Control and Authorization', 'Audit Logging and Compliance Evidence', 'Data Protection and Encryption']

  return selected.slice(0, 7).map((title, index) => ({
    id: id('epic', index),
    title,
    objective: `Deliver ${title.toLowerCase()} capabilities from governance requirements.`,
    outcomes: [
      `Engineering teams can implement ${title.toLowerCase()} with clear scope and ownership.`,
      'Controls are observable through logs, audits, and repeatable checks.',
    ],
    nonGoals: ['Physical-only controls and manual paper handling processes are out of scope.'],
    source,
  }))
}

function fallbackFeatures(epics: EpicArtifact[], source: string): FeatureArtifact[] {
  const streams = [
    'authorization enforcement',
    'audit telemetry and evidence capture',
    'policy-driven automation',
  ]
  const features: FeatureArtifact[] = []
  for (const epic of epics) {
    for (let i = 0; i < 2; i += 1) {
      const stream = streams[i % streams.length]
      features.push({
        id: featureId(epic.id, i),
        epic: epic.id,
        title: `${epic.title} — ${stream[0].toUpperCase()}${stream.slice(1)}`,
        capability: `Implement measurable controls supporting ${epic.title.toLowerCase()} with a focus on ${stream}.`,
        implementationNotes: [
          `Expose service boundaries for ${stream} with explicit interfaces.`,
          `Capture operational telemetry required for ${stream}.`,
        ],
        acceptanceCriteria: [
          `Given required ${stream} rules, protected operations enforce policy correctly.`,
          `Given violations in ${stream}, requests are blocked and evidence is recorded.`,
          `Automated tests cover success, failure, and observability for ${stream}.`,
        ],
        source,
      })
    }
  }
  return features
}

function fallbackStories(features: FeatureArtifact[], source: string): UserStoryArtifact[] {
  const stories: UserStoryArtifact[] = []
  for (const feature of features) {
    for (let i = 0; i < 2; i += 1) {
      const slice = i === 0 ? 'implementation path' : 'operational evidence path'
      stories.push({
        id: storyId(feature.id, i),
        epic: feature.epic,
        feature: feature.id,
        title: `${feature.title} — ${slice}`,
        role: 'platform engineer',
        behavior: `implement ${feature.title.toLowerCase()} for the ${slice}`,
        benefit: `satisfy governance requirements for the ${slice}`,
        acceptanceCriteria: [
          `Behavior for the ${slice} is implemented behind automated tests with deterministic outcomes.`,
          `Audit and security events for the ${slice} are emitted with identifiers and timestamps.`,
        ],
        technicalNotes: [
          `Apply least-privilege authorization checks for the ${slice}.`,
          `Ensure structured logs for the ${slice} are queryable for compliance evidence.`,
        ],
        source,
      })
    }
  }
  return stories
}

function fallbackPrompts(stories: UserStoryArtifact[], source: string): AIPromptArtifact[] {
  return stories.map((story, index) => ({
    id: id('prompt', index),
    story: story.id,
    title: `Implementation Prompt for ${story.id}`,
    prompt: `Implement ${story.title}.\nContext: ${story.behavior}.\nReturn production-ready code changes, unit tests, and integration tests with explicit acceptance-criteria mapping.`,
    checklist: [
      ...(story.acceptanceCriteria || []),
      `Implementation outcome is unique to ${story.id} (${story.title}).`,
    ],
    source,
  }))
}

function frontMatter(data: Record<string, string>): string {
  return ['---', ...Object.entries(data).map(([k, v]) => `${k}: ${v}`), '---', ''].join('\n')
}

function normalizeTitle(value: unknown, fallbackValue: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallbackValue
}

function normalizeList(value: unknown, fallbackValue: string[]): string[] {
  if (!Array.isArray(value)) {
    return fallbackValue
  }

  const normalized = value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)

  if (normalized.length === 0) {
    return fallbackValue
  }

  return Array.from(new Set(normalized)).slice(0, 8)
}

function markdownList(items: string[]): string {
  return items.map((item) => `- ${item}`).join('\n')
}

function normalizeForSignature(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function signature(parts: string[]): string {
  return parts.map((part) => normalizeForSignature(part)).join('|')
}

function focusForIndex(controlStatements: string[], index: number, fallback: string): string {
  if (controlStatements.length === 0) {
    return fallback
  }
  return controlStatements[index % controlStatements.length]
}

function extractControlStatements(markdown: string, limit = 10): string[] {
  const lines = markdown.split(/\r?\n/)
  const candidates = lines
    .map((line) => line.trim())
    .filter((line) => line.length > 30)
    .filter((line) => /\b(must|shall|required|requirement|ensure|enforce|log|audit|access|security)\b/i.test(line))
    .map((line) => line.replace(/^[-*]\s+/, ''))

  const unique = Array.from(new Set(candidates))
  return unique.slice(0, limit)
}

export async function deriveArtifacts(options: DeriveArtifactsOptions): Promise<void> {
  ensureDirs()
  const profile = options.mode === 'fast' ? FAST_PROFILE : STANDARD_PROFILE
  const source = options.sourceMarkdownPath
  const markdown = readGovernanceMarkdown(source)
  const controlStatements = extractControlStatements(markdown, 16)
  const llm = new LlmClient(options.ai)

  const epicFallback = fallbackEpics(markdown, source)
  const aiEpics = await llm.generateJsonArray<{
    title: string
    objective: string
    outcomes?: string[]
    non_goals?: string[]
  }>(
    epicPrompt(markdown),
    epicFallback.map((epic) => ({
      title: epic.title,
      objective: epic.objective,
      outcomes: epic.outcomes || [],
      non_goals: epic.nonGoals || [],
    })),
    { label: 'epics', maxTokens: profile.maxTokens },
  )
  const epicSeed = aiEpics.slice(0, profile.epicLimit).map((epic, index) => ({
    title: normalizeTitle(epic.title, epicFallback[index]?.title || `Epic ${index + 1}`),
    objective:
      normalizeTitle(epic.objective, epicFallback[index]?.objective || 'Define implementation objective.'),
    outcomes: normalizeList(epic.outcomes, epicFallback[index]?.outcomes || [
      'Deliver measurable software controls aligned to governance requirements.',
    ]),
    nonGoals: normalizeList(epic.non_goals, epicFallback[index]?.nonGoals || [
      'Exclude physical/manual governance controls from implementation scope.',
    ]),
  }))

  const seenEpicTitles = new Set(epicSeed.map((epic) => epic.title.toLowerCase()))
  for (const fallbackEpic of epicFallback) {
    if (epicSeed.length >= 5) {
      break
    }
    if (seenEpicTitles.has(fallbackEpic.title.toLowerCase())) {
      continue
    }
    epicSeed.push({
      title: fallbackEpic.title,
      objective: fallbackEpic.objective,
      outcomes: fallbackEpic.outcomes || [],
      nonGoals: fallbackEpic.nonGoals || [],
    })
    seenEpicTitles.add(fallbackEpic.title.toLowerCase())
  }

  const epics: EpicArtifact[] = epicSeed.map((epic, index) => ({
    id: id('epic', index),
    title: epic.title,
    objective: epic.objective,
    outcomes: normalizeList(
      [...(epic.outcomes || []), `Primary outcome focus: ${focusForIndex(controlStatements, index, `digital control area ${index + 1}`)}.`],
      [`Primary outcome focus: ${focusForIndex(controlStatements, index, `digital control area ${index + 1}`)}.`],
    ),
    nonGoals: epic.nonGoals,
    source,
  }))

  const seenFinalEpicTitles = new Set<string>()
  for (let index = 0; index < epics.length; index += 1) {
    const titleKey = normalizeForSignature(epics[index].title)
    if (seenFinalEpicTitles.has(titleKey)) {
      epics[index].title = `${epics[index].title} (Area ${index + 1})`
    }
    seenFinalEpicTitles.add(normalizeForSignature(epics[index].title))
  }

  const featureFallback = fallbackFeatures(epics, source)
  const featureResults: FeatureArtifact[] = []
  const seenFeatureSignatures = new Set<string>()
  const seenFeatureTitlesGlobal = new Set<string>()
  for (const epic of epics) {
    let featureIndexWithinEpic = 0
    const aiFeatures = await llm.generateJsonArray<{
      title: string
      capability: string
      implementation_notes?: string[]
      acceptance_criteria?: string[]
    }>(
      featurePrompt(epic.title, markdown),
      featureFallback
        .filter((feature) => feature.epic === epic.id)
        .map((feature) => ({
          title: feature.title,
          capability: feature.capability,
          implementation_notes: feature.implementationNotes || [],
          acceptance_criteria: feature.acceptanceCriteria || [],
        })),
      { label: `features:${epic.id}`, maxTokens: profile.maxTokens },
    )
    const featureSeed = aiFeatures.slice(0, profile.featureLimitPerEpic).map((rawFeature, index) => ({
      title: normalizeTitle(rawFeature.title, `Feature ${featureResults.length + index + 1}`),
      capability: normalizeTitle(rawFeature.capability, 'Deliver governance capability.'),
      implementationNotes: normalizeList(rawFeature.implementation_notes, [
        `Implement service-level controls for ${epic.title.toLowerCase()}.`,
        'Emit structured telemetry to support auditing and incident investigation.',
      ]),
      acceptanceCriteria: normalizeList(
        rawFeature.acceptance_criteria,
        controlStatements.slice(0, 3).map((statement) => `Implement: ${statement}`),
      ).slice(0, 6),
    }))

    const fallbackForEpic = featureFallback.filter((feature) => feature.epic === epic.id)
    const seenFeatureTitles = new Set(featureSeed.map((feature) => feature.title.toLowerCase()))
    for (const fallbackFeature of fallbackForEpic) {
      if (featureSeed.length >= 3) {
        break
      }
      if (seenFeatureTitles.has(fallbackFeature.title.toLowerCase())) {
        continue
      }
      featureSeed.push({
        title: fallbackFeature.title,
        capability: fallbackFeature.capability,
        implementationNotes: fallbackFeature.implementationNotes || [],
        acceptanceCriteria: fallbackFeature.acceptanceCriteria || [],
      })
      seenFeatureTitles.add(fallbackFeature.title.toLowerCase())
    }

    for (const rawFeature of featureSeed) {
      const focus = focusForIndex(controlStatements, featureResults.length, `${epic.title} control stream ${featureResults.length + 1}`)
      let title = rawFeature.title
      const titleKey = normalizeForSignature(title)
      if (seenFeatureTitlesGlobal.has(titleKey)) {
        title = `${title} (${epic.id}-${featureResults.length + 1})`
      }

      const implementationNotes = normalizeList(
        [...(rawFeature.implementationNotes || []), `Primary delivery slice: ${focus}.`],
        [`Primary delivery slice: ${focus}.`],
      )
      const acceptanceCriteria = normalizeList(
        [...(rawFeature.acceptanceCriteria || []), `Control focus for this feature: ${focus}.`],
        [`Control focus for this feature: ${focus}.`],
      )

      let capability = rawFeature.capability
      let itemSignature = signature([title, capability, implementationNotes.join(' '), acceptanceCriteria.join(' ')])
      if (seenFeatureSignatures.has(itemSignature)) {
        capability = `${capability} Focus this feature on ${focus}.`
        itemSignature = signature([title, capability, implementationNotes.join(' '), acceptanceCriteria.join(' ')])
      }

      featureResults.push({
        id: featureId(epic.id, featureIndexWithinEpic),
        epic: epic.id,
        title,
        capability,
        implementationNotes,
        acceptanceCriteria,
        source,
      })
      featureIndexWithinEpic += 1
      seenFeatureTitlesGlobal.add(normalizeForSignature(title))
      seenFeatureSignatures.add(itemSignature)
    }
  }

  const storiesFallback = fallbackStories(featureResults, source)
  const storyResults: UserStoryArtifact[] = []
  const seenStorySignatures = new Set<string>()
  const seenStoryTitlesGlobal = new Set<string>()
  const storiesByFeature = await mapWithConcurrency(
    featureResults,
    profile.storyConcurrency,
    async (feature) => {
      const aiStories = await llm.generateJsonArray<{
      title: string
      role: string
      behavior: string
      benefit: string
      acceptance_criteria?: string[]
      technical_notes?: string[]
    }>(
      storyPrompt(feature.title, markdown),
      storiesFallback
        .filter((story) => story.feature === feature.id)
        .map((story) => ({
          title: story.title,
          role: story.role,
          behavior: story.behavior,
          benefit: story.benefit,
          acceptance_criteria: story.acceptanceCriteria || [],
          technical_notes: story.technicalNotes || [],
        })),
      { label: `stories:${feature.id}`, maxTokens: profile.maxTokens },
    )

      return { feature, aiStories }
    },
  )

  for (const { feature, aiStories } of storiesByFeature) {
    let storyIndexWithinFeature = 0

    const storySeed = aiStories.slice(0, profile.storyLimitPerFeature).map((rawStory, index) => ({
      title: normalizeTitle(rawStory.title, `Story ${storyResults.length + index + 1}`),
      role: normalizeTitle(rawStory.role, 'developer'),
      behavior: normalizeTitle(rawStory.behavior, `implement ${feature.title.toLowerCase()}`),
      benefit: normalizeTitle(rawStory.benefit, 'meet governance obligations'),
      acceptanceCriteria: normalizeList(rawStory.acceptance_criteria, [
        'Implementation passes automated tests for success and failure paths.',
        'Security and audit events are logged with actor, action, and timestamp.',
      ]),
      technicalNotes: normalizeList(rawStory.technical_notes, [
        `Integrate with ${feature.title} control boundaries and interfaces.`,
        'Keep implementation idempotent and observable in logs/metrics.',
      ]),
    }))

    const fallbackForFeature = storiesFallback.filter((story) => story.feature === feature.id)
    const seenStoryTitles = new Set(storySeed.map((story) => story.title.toLowerCase()))
    for (const fallbackStory of fallbackForFeature) {
      if (storySeed.length >= 3) {
        break
      }
      if (seenStoryTitles.has(fallbackStory.title.toLowerCase())) {
        continue
      }
      storySeed.push({
        title: fallbackStory.title,
        role: fallbackStory.role,
        behavior: fallbackStory.behavior,
        benefit: fallbackStory.benefit,
        acceptanceCriteria: fallbackStory.acceptanceCriteria || [],
        technicalNotes: fallbackStory.technicalNotes || [],
      })
      seenStoryTitles.add(fallbackStory.title.toLowerCase())
    }

    for (const rawStory of storySeed) {
      const focus = focusForIndex(controlStatements, storyResults.length, `${feature.title} implementation slice ${storyResults.length + 1}`)
      let title = rawStory.title
      if (seenStoryTitlesGlobal.has(normalizeForSignature(title))) {
        title = `${title} (${feature.id}-${storyResults.length + 1})`
      }

      const acceptanceCriteria = normalizeList(
        [...(rawStory.acceptanceCriteria || []), `Outcome focus for this story: ${focus}.`],
        [`Outcome focus for this story: ${focus}.`],
      )
      const technicalNotes = normalizeList(
        [...(rawStory.technicalNotes || []), `Implementation should prioritize ${focus}.`],
        [`Implementation should prioritize ${focus}.`],
      )

      let behavior = rawStory.behavior
      let itemSignature = signature([title, behavior, acceptanceCriteria.join(' '), technicalNotes.join(' ')])
      if (seenStorySignatures.has(itemSignature)) {
        behavior = `${behavior} with emphasis on ${focus}`
        itemSignature = signature([title, behavior, acceptanceCriteria.join(' '), technicalNotes.join(' ')])
      }

      storyResults.push({
        id: storyId(feature.id, storyIndexWithinFeature),
        epic: feature.epic,
        feature: feature.id,
        title,
        role: rawStory.role,
        behavior,
        benefit: rawStory.benefit,
        acceptanceCriteria,
        technicalNotes,
        source,
      })
      storyIndexWithinFeature += 1
      seenStoryTitlesGlobal.add(normalizeForSignature(title))
      seenStorySignatures.add(itemSignature)
    }
  }

  const promptResults = fallbackPrompts(storyResults, source)

  for (const epic of epics) {
    const file = `docs/derived/epics/${epic.id}.md`
    writeArtifact(
      file,
      `${frontMatter({ id: epic.id, source: epic.source })}# ${epic.title}\n\n## Objective\n${epic.objective}\n\n## Outcomes\n${markdownList(epic.outcomes || ['Deliver measurable software controls aligned to governance requirements.'])}\n\n## Non-Goals\n${markdownList(epic.nonGoals || ['Physical/manual controls are out of implementation scope.'])}`,
    )
  }

  for (const feature of featureResults) {
    const file = `docs/derived/features/${feature.id}.md`
    writeArtifact(
      file,
      `${frontMatter({ id: feature.id, epic: feature.epic, source: feature.source })}# ${feature.title}\n\n## Capability\n${feature.capability}\n\n## Implementation Notes\n${markdownList(feature.implementationNotes || ['Implement secure service-level controls and observability hooks.'])}\n\n## Acceptance Criteria\n${markdownList(feature.acceptanceCriteria || ['Behavior is validated with automated tests and audit evidence.'])}`,
    )
  }

  for (const story of storyResults) {
    const file = `docs/derived/user-stories/${story.id}.md`
    writeArtifact(
      file,
      `${frontMatter({ id: story.id, epic: story.epic, feature: story.feature, source: story.source })}# ${story.title}\n\n## User Story\nAs a ${story.role}, I want to ${story.behavior}, so that I can ${story.benefit}.\n\n## Acceptance Criteria\n${markdownList(story.acceptanceCriteria || ['Implementation behavior is covered by automated tests.'])}\n\n## Technical Notes\n${markdownList(story.technicalNotes || ['Use secure defaults and emit structured operational telemetry.'])}`,
    )
  }

  for (const prompt of promptResults) {
    const file = `docs/derived/prompts/${prompt.id}.md`
    writeArtifact(
      file,
      `${frontMatter({ id: prompt.id, story: prompt.story, source: prompt.source })}# ${prompt.title}\n\n${prompt.prompt}\n\n## Implementation Checklist\n${markdownList(prompt.checklist || ['Map code changes to acceptance criteria and tests.'])}`,
    )
  }
}

export function resolveArtifactByIdOrPath(artifact: string): { path: string; data: Record<string, string>; content: string } {
  const asPath = path.resolve(artifact)
  if (fs.existsSync(asPath) && fs.statSync(asPath).isFile()) {
    const raw = fs.readFileSync(asPath, 'utf8')
    const parsed = matter(raw)
    return {
      path: asPath,
      data: parsed.data as Record<string, string>,
      content: parsed.content.trim(),
    }
  }

  const dirs = ['docs/derived/user-stories', 'docs/derived/features', 'docs/derived/epics', 'docs/derived/prompts']
  for (const directory of dirs) {
    const absoluteDir = path.resolve(directory)
    if (!fs.existsSync(absoluteDir)) {
      continue
    }
    for (const name of fs.readdirSync(absoluteDir)) {
      const candidate = path.join(absoluteDir, name)
      if (!candidate.endsWith('.md')) {
        continue
      }
      const raw = fs.readFileSync(candidate, 'utf8')
      const parsed = matter(raw)
      const data = parsed.data as Record<string, string>
      if (data.id === artifact || name === `${artifact}.md`) {
        return { path: candidate, data, content: parsed.content.trim() }
      }
    }
  }

  throw new Error(`Artifact not found: ${artifact}`)
}
