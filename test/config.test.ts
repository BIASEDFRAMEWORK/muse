import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs'
import path from 'path'
import { loadConfig, createInitialConfigFile, MuseConfig } from '../src/config/loadConfig'

describe('loadConfig', () => {
  const testConfigPath = 'test-muse.yaml'
  const testDir = path.dirname(testConfigPath)

  beforeEach(() => {
    // Clean up any existing test files
    if (fs.existsSync(testConfigPath)) {
      fs.unlinkSync(testConfigPath)
    }
  })

  afterEach(() => {
    // Clean up test files
    if (fs.existsSync(testConfigPath)) {
      fs.unlinkSync(testConfigPath)
    }
  })

  it('should throw error when config file does not exist', () => {
    expect(() => loadConfig(testConfigPath)).toThrow(
      'Config file not found'
    )
  })

  it('should load default config when file exists with minimal content', () => {
    const minimalConfig = { project: 'test-project' }
    fs.writeFileSync(testConfigPath, JSON.stringify(minimalConfig), 'utf8')

    const config = loadConfig(testConfigPath)

    expect(config.project).toBe('test-project')
    expect(config.governance.source).toBe('docs/governance/original-document-system-of-record.md')
    expect(config.pipeline.convert_markdown).toBe(true)
    expect(config.ai.provider).toBe('anthropic')
  })

  it('should merge partial config with defaults', () => {
    const partialConfig = {
      project: 'custom-project',
      ai: {
        model: 'custom-model'
      }
    }
    fs.writeFileSync(testConfigPath, JSON.stringify(partialConfig), 'utf8')

    const config = loadConfig(testConfigPath)

    expect(config.project).toBe('custom-project')
    expect(config.ai.model).toBe('custom-model')
    expect(config.ai.provider).toBe('anthropic') // default preserved
    expect(config.governance.source).toBe('docs/governance/original-document-system-of-record.md') // default preserved
  })

  it('should handle YAML format', () => {
    const yamlConfig = `
project: yaml-test-project
ai:
  model: yaml-model
`
    fs.writeFileSync(testConfigPath, yamlConfig, 'utf8')

    const config = loadConfig(testConfigPath)

    expect(config.project).toBe('yaml-test-project')
    expect(config.ai.model).toBe('yaml-model')
    expect(config.ai.provider).toBe('anthropic')
  })
})

describe('createInitialConfigFile', () => {
  const testConfigPath = 'test-init-muse.yaml'

  beforeEach(() => {
    if (fs.existsSync(testConfigPath)) {
      fs.unlinkSync(testConfigPath)
    }
  })

  afterEach(() => {
    if (fs.existsSync(testConfigPath)) {
      fs.unlinkSync(testConfigPath)
    }
  })

  it('should create config file with default values', () => {
    createInitialConfigFile(testConfigPath)

    expect(fs.existsSync(testConfigPath)).toBe(true)

    const config = loadConfig(testConfigPath)
    expect(config.project).toBe('system-access-logging')
    expect(config.governance.source).toBe('docs/governance/original-document-system-of-record.md')
    expect(config.pipeline.convert_markdown).toBe(true)
    expect(config.ai.provider).toBe('anthropic')
  })

  it('should not overwrite existing config file', () => {
    const existingConfig = { project: 'existing-project' }
    fs.writeFileSync(testConfigPath, JSON.stringify(existingConfig), 'utf8')

    createInitialConfigFile(testConfigPath)

    const config = loadConfig(testConfigPath)
    expect(config.project).toBe('existing-project')
  })
})