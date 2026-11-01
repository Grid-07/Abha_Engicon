// The parent site owns its own hero film.
//
// It once read the hero derivatives out of the Bimla project folder, which
// meant deleting the film there silently blanked the parent hero as well, and
// made this repo depend on a checkout it no longer shares a directory with.
// The film now lives here: this script only fingerprints whatever is sitting
// in public/media + public/images, renames each file to match its content
// hash, and writes src/data/flagship.json.
//
// Because the URLs are content-addressed, dropping a new hero-loop.mp4 (with no
// hash in the name) is enough to publish a replacement — the next build gives it
// a new filename, so neither the browser nor the CDN can serve a stale copy.
//
//   npm run hero      refresh the manifest by hand
//   npm run build     runs it automatically before vite

import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outJson = join(root, 'src', 'data', 'flagship.json')

// field -> [folder inside public/, base name, extension]
const FIELDS = {
  heroLoop: ['media', 'hero-loop', 'mp4'],
  heroLoopMobile: ['media', 'hero-loop-mobile', 'mp4'],
  heroPoster: ['images', 'hero-poster', 'jpg'],
  heroPosterMobile: ['images', 'hero-poster-mobile', 'jpg'],
}

const sha1 = (path) => createHash('sha1').update(readFileSync(path)).digest('hex').slice(0, 8)

const out = {}
let found = 0

for (const [field, [folder, base, ext]] of Object.entries(FIELDS)) {
  const dir = join(root, 'public', folder)
  if (!existsSync(dir)) continue

  const plain = `${base}.${ext}`
  const pattern = new RegExp(`^${base}\\.([0-9a-f]{8})\\.${ext}$`)
  const names = readdirSync(dir)

  // Prefer an un-hashed file — that is how a replacement is dropped in.
  let current = names.includes(plain) ? plain : names.find((n) => pattern.test(n))
  if (!current) continue

  const hash = sha1(join(dir, current))
  const target = `${base}.${hash}.${ext}`
  if (current !== target) {
    const to = join(dir, target)
    if (existsSync(to)) unlinkSync(join(dir, current))
    else renameSync(join(dir, current), to)
    console.log(`hero: ${current} → ${target}`)
  }

  // Sweep the older generation of this same file.
  for (const name of readdirSync(dir)) {
    const m = name.match(pattern)
    if (m && name !== target) {
      unlinkSync(join(dir, name))
      console.log(`hero: removed stale ${name}`)
    }
  }

  out[field] = `${folder}/${target}`
  found += 1
}

const missing = Object.keys(FIELDS).filter((f) => !out[f])
const manifest = {
  hash: found ? sha1(join(root, 'public', out[Object.keys(FIELDS).find((f) => out[f])])) : null,
  available: missing.length === 0,
  ...out,
}

writeFileSync(outJson, JSON.stringify(manifest, null, 2) + '\n')

if (missing.length) {
  console.warn(`hero: missing ${missing.join(', ')} — the hero will fall back to a still`)
} else {
  console.log(`hero: manifest written [${manifest.hash}]`)
}
