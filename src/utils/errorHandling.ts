import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

/**
 * Error handling utilities for Muse scripts
 * Provides consistent error handling, validation, and graceful degradation
 */

export class MuseError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly recoverable: boolean = false,
    public readonly suggestions?: string[]
  ) {
    super(message)
    this.name = 'MuseError'
  }
}

export class ValidationError extends MuseError {
  constructor(message: string, suggestions?: string[]) {
    super(message, 'VALIDATION_ERROR', true, suggestions)
  }
}

export class FileSystemError extends MuseError {
  constructor(message: string, public readonly path: string, suggestions?: string[]) {
    super(message, 'FILESYSTEM_ERROR', true, suggestions)
  }
}

export class ConfigurationError extends MuseError {
  constructor(message: string, suggestions?: string[]) {
    super(message, 'CONFIG_ERROR', true, suggestions)
  }
}

/**
 * Safely reads a file with comprehensive error handling
 */
export function safeReadFile(filePath: string, encoding: BufferEncoding = 'utf8'): string {
  const absolutePath = path.resolve(filePath)

  try {
    if (!fs.existsSync(absolutePath)) {
      throw new FileSystemError(
        `File not found: ${absolutePath}`,
        absolutePath,
        [
          'Check if the file path is correct',
          'Ensure the file exists and is accessible',
          'Run muse init if this is a configuration file'
        ]
      )
    }

    const stats = fs.statSync(absolutePath)
    if (!stats.isFile()) {
      throw new FileSystemError(
        `Path is not a file: ${absolutePath}`,
        absolutePath,
        ['Ensure the path points to a file, not a directory']
      )
    }

    return fs.readFileSync(absolutePath, encoding)
  } catch (error) {
    if (error instanceof MuseError) {
      throw error
    }

    throw new FileSystemError(
      `Failed to read file ${absolutePath}: ${error instanceof Error ? error.message : String(error)}`,
      absolutePath,
      [
        'Check file permissions',
        'Ensure the file is not corrupted',
        'Verify disk space and file system integrity'
      ]
    )
  }
}

/**
 * Safely writes a file with comprehensive error handling
 */
export function safeWriteFile(filePath: string, content: string, encoding: BufferEncoding = 'utf8'): void {
  const absolutePath = path.resolve(filePath)
  const directory = path.dirname(absolutePath)

  try {
    // Ensure directory exists
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }

    // Check if directory is writable
    const dirStats = fs.statSync(directory)
    if (!dirStats.isDirectory()) {
      throw new FileSystemError(
        `Parent path is not a directory: ${directory}`,
        directory,
        ['Ensure the parent path is a valid directory']
      )
    }

    fs.writeFileSync(absolutePath, content, encoding)
  } catch (error) {
    if (error instanceof MuseError) {
      throw error
    }

    throw new FileSystemError(
      `Failed to write file ${absolutePath}: ${error instanceof Error ? error.message : String(error)}`,
      absolutePath,
      [
        'Check write permissions for the directory',
        'Ensure sufficient disk space',
        'Verify the file is not locked by another process'
      ]
    )
  }
}

/**
 * Safely parses YAML with comprehensive error handling and validation
 */
export function safeParseYAML<T = any>(yamlString: string, filePath?: string): T {
  try {
    const parsed = YAML.parse(yamlString)

    if (parsed === null || parsed === undefined) {
      throw new ValidationError(
        `YAML file is empty or null${filePath ? ` (${filePath})` : ''}`,
        ['Ensure the file contains valid YAML content']
      )
    }

    return parsed as T
  } catch (error) {
    if (error instanceof MuseError) {
      throw error
    }

    const yamlError = error as any
    let message = `Failed to parse YAML${filePath ? ` in ${filePath}` : ''}`

    if (yamlError.message) {
      message += `: ${yamlError.message}`
    }

    if (yamlError.linePos) {
      message += ` at line ${yamlError.linePos[0]?.line || 'unknown'}`
    }

    throw new ValidationError(message, [
      'Check YAML syntax and indentation',
      'Ensure all required fields are present',
      'Validate against the expected schema',
      'Use a YAML validator tool'
    ])
  }
}

/**
 * Safely parses JSON with comprehensive error handling
 */
export function safeParseJSON<T = any>(jsonString: string, filePath?: string): T {
  try {
    return JSON.parse(jsonString) as T
  } catch (error) {
    const jsonError = error as SyntaxError
    let message = `Failed to parse JSON${filePath ? ` in ${filePath}` : ''}`

    if (jsonError.message) {
      message += `: ${jsonError.message}`
    }

    throw new ValidationError(message, [
      'Check JSON syntax',
      'Ensure all brackets and braces are properly closed',
      'Validate against the expected schema',
      'Use a JSON validator tool'
    ])
  }
}

/**
 * Safely checks if a file exists and is accessible
 */
export function safeFileExists(filePath: string): boolean {
  try {
    const absolutePath = path.resolve(filePath)
    return fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile()
  } catch {
    return false
  }
}

/**
 * Safely checks if a directory exists and is accessible
 */
export function safeDirectoryExists(dirPath: string): boolean {
  try {
    const absolutePath = path.resolve(dirPath)
    return fs.existsSync(absolutePath) && fs.statSync(absolutePath).isDirectory()
  } catch {
    return false
  }
}

/**
 * Creates directories recursively with error handling
 */
export function safeEnsureDirectory(dirPath: string): void {
  const absolutePath = path.resolve(dirPath)

  try {
    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath, { recursive: true })
    } else if (!fs.statSync(absolutePath).isDirectory()) {
      throw new FileSystemError(
        `Path exists but is not a directory: ${absolutePath}`,
        absolutePath,
        ['Remove or rename the existing file', 'Choose a different directory path']
      )
    }
  } catch (error) {
    if (error instanceof MuseError) {
      throw error
    }

    throw new FileSystemError(
      `Failed to create directory ${absolutePath}: ${error instanceof Error ? error.message : String(error)}`,
      absolutePath,
      [
        'Check write permissions for parent directories',
        'Ensure sufficient disk space',
        'Verify the path is valid'
      ]
    )
  }
}

/**
 * Recursively walks directories with error handling
 */
export function safeWalkFiles(
  targetDirs: string[],
  extensions: string[],
  options: { excludePatterns?: RegExp[] } = {}
): string[] {
  const files: string[] = []
  const validExtensions = new Set(extensions.map(ext => ext.startsWith('.') ? ext : `.${ext}`))

  for (const dir of targetDirs) {
    const absoluteDir = path.resolve(dir)

    if (!safeDirectoryExists(absoluteDir)) {
      console.warn(`Warning: Directory not found, skipping: ${absoluteDir}`)
      continue
    }

    try {
      const stack = [absoluteDir]

      while (stack.length > 0) {
        const current = stack.pop()!

        let entries: fs.Dirent[]
        try {
          entries = fs.readdirSync(current, { withFileTypes: true })
        } catch (error) {
          console.warn(`Warning: Failed to read directory ${current}: ${error instanceof Error ? error.message : String(error)}`)
          continue
        }

        for (const entry of entries) {
          const absolutePath = path.join(current, entry.name)

          if (entry.isDirectory()) {
            stack.push(absolutePath)
          } else if (entry.isFile() && validExtensions.has(path.extname(entry.name))) {
            // Check exclude patterns
            const shouldExclude = options.excludePatterns?.some(pattern => pattern.test(absolutePath))
            if (!shouldExclude) {
              files.push(absolutePath)
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Warning: Failed to walk directory ${absoluteDir}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return files
}

/**
 * Graceful error handler that logs errors and provides user-friendly messages
 */
export function handleError(error: unknown, context: string = 'operation'): void {
  if (error instanceof MuseError) {
    console.error(`❌ ${error.name} in ${context}: ${error.message}`)

    if (error.suggestions && error.suggestions.length > 0) {
      console.error('\n💡 Suggestions:')
      error.suggestions.forEach(suggestion => console.error(`   • ${suggestion}`))
    }

    if (!error.recoverable) {
      console.error('\n🔴 This error is not recoverable. Please fix the issue and try again.')
      process.exit(1)
    }
  } else if (error instanceof Error) {
    console.error(`❌ Unexpected error in ${context}: ${error.message}`)
    console.error('🔴 This appears to be a bug. Please report this issue.')
    process.exit(1)
  } else {
    console.error(`❌ Unknown error in ${context}: ${String(error)}`)
    console.error('🔴 This appears to be a bug. Please report this issue.')
    process.exit(1)
  }
}

/**
 * Wraps async operations with comprehensive error handling
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context: string = 'operation'
): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    handleError(error, context)
    throw error // Re-throw for caller to handle if needed
  }
}

/**
 * Wraps sync operations with comprehensive error handling
 */
export function withSyncErrorHandling<T>(
  operation: () => T,
  context: string = 'operation'
): T {
  try {
    return operation()
  } catch (error) {
    handleError(error, context)
    throw error // Re-throw for caller to handle if needed
  }
}