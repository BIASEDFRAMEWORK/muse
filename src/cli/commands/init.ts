import { createInitialConfigFile } from '../../config/loadConfig'
import { handleError, withSyncErrorHandling } from '../../utils/errorHandling'

export async function initCommand(): Promise<void> {
  withSyncErrorHandling(() => {
    createInitialConfigFile('muse.yaml')
    process.stdout.write('Initialized muse.yaml\n')
  }, 'initializing configuration')
}
