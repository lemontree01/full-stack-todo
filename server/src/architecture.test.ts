// Enforces the onion dependency rule: layers may only import inward.
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { test } from 'node:test'

const SRC = import.meta.dirname

const RULES: Record<string, { layers: string[]; packages: boolean }> = {
  domain: { layers: [], packages: false },
  application: { layers: ['domain'], packages: false },
  infrastructure: { layers: ['domain', 'application', 'generated'], packages: true },
  presentation: { layers: ['domain', 'application'], packages: true },
}

const sourceFiles = (dir: string) =>
  readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
    .map((f) => join(dir, f))

const importsOf = (file: string) =>
  [...readFileSync(file, 'utf8').matchAll(/(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g)].map((m) => m[1]!)

for (const [layer, rule] of Object.entries(RULES)) {
  test(`${layer}/ imports only ${[layer, ...rule.layers].join(', ')}${rule.packages ? ' and packages' : ''}`, () => {
    const files = sourceFiles(join(SRC, layer))
    assert.ok(files.length > 0, `no files found in ${layer}/`)
    for (const file of files) {
      for (const spec of importsOf(file)) {
        const where = `${relative(SRC, file)} imports "${spec}"`
        if (!spec.startsWith('.')) {
          assert.ok(rule.packages, `${where}: ${layer}/ must not depend on packages`)
          continue
        }
        const target = relative(SRC, resolve(dirname(file), spec)).split(sep)[0]!
        assert.ok(target === layer || rule.layers.includes(target), `${where}: ${layer}/ must not depend on ${target}/`)
      }
    }
  })
}
