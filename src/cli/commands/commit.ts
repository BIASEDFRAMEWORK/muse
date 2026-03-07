import { spawnSync } from 'child_process'

export async function commitCommand(openPr: boolean): Promise<void> {
  const add = spawnSync('git', ['add', 'docs'], { stdio: 'inherit' })
  if (add.status !== 0) {
    throw new Error('git add docs failed')
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
