const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const { extractCapabilities, loadCapabilities } = require('../dist/pipeline/extractCapabilities.js')

test('extractCapabilities writes deterministic capability artifacts', () => {
  const originalCwd = process.cwd()
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'muse-capabilities-'))

  try {
    process.chdir(tempDir)
    fs.mkdirSync(path.join(tempDir, 'specs', 'governance'), { recursive: true })
    const governancePath = path.join(tempDir, 'specs', 'governance', 'policy.digital.md')
    const governanceMarkdown = [
      '---',
      'document_id: gov-test-policy',
      '---',
      '# Digital Governance Policy',
      '',
      'Systems must retain detailed audit logs for security investigations.',
      'All access to protected APIs must enforce role-based access control.',
      'Monitoring and alerting must detect anomalous activity.',
      'All privileged actions must be attributable to an authenticated identity.',
      '',
    ].join('\n')

    fs.writeFileSync(governancePath, governanceMarkdown, 'utf8')

    const extracted = extractCapabilities(governancePath)
    assert.ok(extracted.length >= 4)
    assert.equal(extracted[0].id, 'CAP-001')
    assert.equal(extracted[0].name, 'Digital Audit Logging')

    const files = fs.readdirSync(path.join(tempDir, 'specs', 'capabilities')).filter((name) => name.endsWith('.md')).sort()
    assert.equal(files[0], 'cap-001.md')

    const loaded = loadCapabilities(governancePath)
    assert.equal(loaded[0].id, 'CAP-001')
    assert.equal(loaded[0].name, 'Digital Audit Logging')
  } finally {
    process.chdir(originalCwd)
    fs.rmSync(tempDir, { recursive: true, force: true })
  }
})
