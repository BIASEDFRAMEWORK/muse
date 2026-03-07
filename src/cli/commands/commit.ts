import { spawnSync } from 'child_process'
import fs from 'fs'

const GENERATED_ARTIFACT_DIRS = ['specs', 'work-items']

function existingArtifactDirs(): string[] {
  return GENERATED_ARTIFACT_DIRS.filter((directory) => fs.existsSync(directory))
}

export async function commitCommand(openPr: boolean): Promise<void> {
  const directories = existingArtifactDirs()
  if (directories.length === 0) {
    throw new Error('No generated artifact directories found (expected specs/ or work-items/).')
  }

  const add = spawnSync('git', ['add', ...directories], { stdio: 'inherit' })
  if (add.status !== 0) {
    throw new Error(`git add failed for: ${directories.join(', ')}`)
  }

  const commit = spawnSync('git', ['commit', '-m', 'muse: generated backlog artifacts'], {
    stdio: 'inherit',
  })
  if (commit.status !== 0) {
    throw new Error('git commit failed')
  }

  if (openPr) {
    const pr = spawnSync('gh', ['pr', 'create', '--fill'], { stdio: 'inherit' })
    if (pr.status !== 0) {
      throw new Error('gh pr create failed')
    }
  }
}
