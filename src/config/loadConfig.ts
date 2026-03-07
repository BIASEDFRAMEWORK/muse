import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

export interface MuseConfig {
  project: string
  governance: {
    source: string
  }
  pipeline: {
    convert_markdown: boolean
    derive_artifacts: boolean
    decisions: boolean
    todo: boolean
  }
  ai: {
    provider: string
    model: string
  }
}

const defaultConfig: MuseConfig = {
  project: 'system-access-logging',
  governance: {
    source: 'docs/governance/original-document-system-of-record.md',
  },
  pipeline: {
    convert_markdown: true,
    derive_artifacts: true,
    decisions: true,
    todo: true,
  },
  ai: {
    provider: 'anthropic',
    model: 'claude-sonnet-4-20250514',
  },
}

export function createInitialConfigFile(configPath = 'muse.yaml'): void {
  if (fs.existsSync(configPath)) {
    return
  }
  fs.writeFileSync(configPath, YAML.stringify(defaultConfig), 'utf8')
}

export function loadConfig(configPath = 'muse.yaml'): MuseConfig {
  const absolutePath = path.resolve(configPath)
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Config file not found: ${absolutePath}. Run muse init first.`)
  }

  const raw = fs.readFileSync(absolutePath, 'utf8')
  const parsed = YAML.parse(raw) as Partial<MuseConfig>

  return {
    ...defaultConfig,
    ...parsed,
    governance: {
      ...defaultConfig.governance,
      ...(parsed.governance || {}),
    },
    pipeline: {
      ...defaultConfig.pipeline,
      ...(parsed.pipeline || {}),
    },
    ai: {
      ...defaultConfig.ai,
      ...(parsed.ai || {}),
    },
  }
}
