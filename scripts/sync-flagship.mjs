// The parent site's hero plays the same film as the flagship microsite, so it
// must not keep its own stale copy. This pulls the current hero derivatives
// straight out of ../Arpan_Vilas using that project's media manifest.
//
//   npm run flagship     copy the latest film + posters across
//   npm run build        runs it automatically before vite

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const source = join(root, '..', 'Arpan_Vilas')

const manifestPath = join(source, 'src', 'data', 'media.json')
const outJson = join(root, 'src', 'data', 'flagship.json')

const FIELDS = {
  heroLoop: 'heroLoop',
  heroLoopMobile: 'heroLoopMobile',
  heroPoster: 'heroPoster',
  heroPosterMobile: 'heroPosterMobile',
}

function fallback(reason) {
  console.warn(`flagship: ${reason}`)
  if (!existsSync(outJson)) {
    // Nothing has ever been synced — the hero will fall back to a still.
    writeFileSync(
      outJson,
      JSON.stringify({ hash: null, available: false }, null, 2) + '\n'
    )
    console.warn('flagship: wrote an empty manifest — hero will use the poster only')
  }
}

if (!existsSync(manifestPath)) {
  fallback('no Arpan_Vilas project found next to this one; keeping the existing copy')
  process.exit(0)
}

const src = JSON.parse(readFileSync(manifestPath, 'utf8'))
const out = { hash: src.hash, available: true }
let copied = 0

for (const [field, key] of Object.entries(FIELDS)) {
  const rel = src[key]
  if (!rel) continue
  const from = join(source, 'public', rel)
  const to = join(root, 'public', rel)
  if (!existsSync(from)) {
    console.warn(`flagship: missing ${from}`)
    out[field] = null
    continue
  }
  mkdirSync(dirname(to), { recursive: true })
  copyFileSync(from, to)
  out[field] = rel
  copied += 1
}

// Drop derivatives from an older generation so the folder doesn't grow forever.
const prev = existsSync(outJson) ? JSON.parse(readFileSync(outJson, 'utf8')) : null
if (prev && prev.hash && prev.hash !== src.hash) {
  const { unlinkSync } = await import('node:fs')
  for (const [field] of Object.entries(FIELDS)) {
    const stale = prev[field]
    if (stale && stale !== out[field]) {
      const p = join(root, 'public', stale)
      if (existsSync(p)) {
        unlinkSync(p)
        console.log(`flagship: removed stale ${stale}`)
      }
    }
  }
}

writeFileSync(outJson, JSON.stringify(out, null, 2) + '\n')
console.log(`flagship: synced ${copied} file(s) from the Bimal Mangal Gardens build (${src.hash})`)
