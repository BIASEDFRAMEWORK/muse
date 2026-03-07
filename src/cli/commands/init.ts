import { createInitialConfigFile } from '../../config/loadConfig'

export async function initCommand(): Promise<void> {
  createInitialConfigFile('muse.yaml')
  process.stdout.write('Initialized muse.yaml\n')
}
