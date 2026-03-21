import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { safeReadFile, safeWriteFile, safeParseYAML, safeFileExists, ConfigurationError, ValidationError } from '../utils/errorHandling'

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
  if (safeFileExists(configPath)) {
    return
  }

  try {
    safeWriteFile(configPath, YAML.stringify(defaultConfig), 'utf8')
  } catch (error) {
    throw new ConfigurationError(
      `Failed to create initial config file at ${configPath}`,
      [
        'Check write permissions for the directory',
        'Ensure sufficient disk space',
        'Verify the path is valid'
      ]
    )
  }
}

export function loadConfig(configPath = 'muse.yaml'): MuseConfig {
  const absolutePath = path.resolve(configPath)

  if (!safeFileExists(absolutePath)) {
    throw new ConfigurationError(
      `Config file not found: ${absolutePath}`,
      [
        'Run "muse init" to create the initial configuration file',
        'Check if the file path is correct',
        'Ensure you are in the correct project directory'
      ]
    )
  }

  let raw: string
  try {
    raw = safeReadFile(absolutePath, 'utf8')
  } catch (error) {
    if (error instanceof ConfigurationError) {
      throw error
    }
    throw new ConfigurationError(
      `Failed to read config file: ${absolutePath}`,
      [
        'Check file permissions',
        'Ensure the file is not corrupted',
        'Verify the file is accessible'
      ]
    )
  }

  let parsed: Partial<MuseConfig>
  try {
    parsed = safeParseYAML<Partial<MuseConfig>>(raw, absolutePath)
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error
    }
    throw new ValidationError(
      `Invalid configuration format in ${absolutePath}`,
      [
        'Ensure the file contains valid YAML syntax',
        'Check indentation and structure',
        'Refer to the documentation for correct config format'
      ]
    )
  }

  // Validate required fields
  if (!parsed.project || typeof parsed.project !== 'string') {
    throw new ValidationError(
      'Configuration missing required "project" field or field is not a string',
      [
        'Add a "project" field with a string value to your muse.yaml',
        'Example: project: "your-project-name"'
      ]
    )
  }

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
