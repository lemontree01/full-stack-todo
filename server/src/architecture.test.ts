// Enforces the dependency rules: layers only import inward, and routes stay pure wiring.
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { test } from 'node:test'

const SRC = import.meta.dirname

interface Rule {
  /** Folders (relative to src/) this folder may import from. */
  allowed: string[]
  /** npm packages it may import: all, none, or a list. */
  packages: boolean | string[]
}

const RULES: Record<string, Rule> = {
  domain: { allowed: ['domain'], packages: false },
  application: { allowed: ['application', 'domain'], packages: false },
  infrastructure: { allowed: ['infrastructure', 'application', 'domain', 'generated'], packages: true },
  presentation: { allowed: ['presentation', 'application', 'domain'], packages: true },
  'presentation/http/routes': {
    allowed: ['presentation/http/routes', 'presentation/http/controllers', 'presentation/http/middlewares'],
    packages: ['express'],
  },
}

const sourceFiles = (dir: string) =>
  readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
    .map((f) => join(dir, f))

const importsOf = (file: string) =>
  [...readFileSync(file, 'utf8').matchAll(/(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g)].map((m) => m[1]!)

const isInside = (path: string, folder: string) => path === folder || path.startsWith(`${folder}/`)

for (const [folder, rule] of Object.entries(RULES)) {
  test(`${folder}/ imports only ${rule.allowed.join(', ')}`, () => {
    const files = sourceFiles(join(SRC, folder))
    assert.ok(files.length > 0, `no files found in ${folder}/`)
    for (const file of files) {
      for (const spec of importsOf(file)) {
        const where = `${relative(SRC, file)} imports "${spec}"`
        if (!spec.startsWith('.')) {
          const ok = Array.isArray(rule.packages) ? rule.packages.includes(spec) : rule.packages
          assert.ok(ok, `${where}: ${folder}/ must not depend on this package`)
          continue
        }
        const target = relative(SRC, resolve(dirname(file), spec)).split(sep).join('/')
        assert.ok(
          rule.allowed.some((allowed) => isInside(target, allowed)),
          `${where}: ${folder}/ must not depend on ${dirname(target)}/`,
        )
      }
    }
  })
}
