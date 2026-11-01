import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// GitHub Pages serves 404.html for any unknown path. Copying the built shell
// there lets deep links such as /about survive a refresh.
const root = process.cwd()
const docs = join(root, 'docs')
const index = join(docs, 'index.html')
const notFound = join(docs, '404.html')

if (existsSync(index)) {
  copyFileSync(index, notFound)
  console.log('postbuild: wrote docs/404.html')
} else {
  console.warn('postbuild: docs/index.html missing — did the build run?')
}

// A .nojekyll file stops GitHub Pages from running Jekyll over the output,
// which would otherwise drop files whose names begin with an underscore.
const nojekyll = join(docs, '.nojekyll')
if (existsSync(docs) && !existsSync(nojekyll)) {
  writeFileSync(nojekyll, '')
  console.log('postbuild: wrote docs/.nojekyll')
}

mkdirSync(docs, { recursive: true })
