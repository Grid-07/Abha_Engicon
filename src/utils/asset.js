const BASE = import.meta.env.BASE_URL || '/'

/**
 * Resolve a path inside `public/` against the deployed base path, so the same
 * string works at `/` in dev and at `/Abha_Engicon/` on GitHub Pages.
 */
export function asset(path) {
  return BASE + String(path).replace(/^\/+/, '')
}

/** The brochure lattice, exposed to CSS as `--lattice`. */
export const latticeUrl = `url('${asset('images/brand/lattice-sand.jpg')}')`
