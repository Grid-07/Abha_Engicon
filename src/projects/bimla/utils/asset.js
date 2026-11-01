// Resolves a public/ asset path against the configured Vite base so the site
// works from a sub-path (GitHub Pages) as well as from the domain root.
//
// Merged into the parent, this project's media lives under
// public/projects/bimla/. The prefix is applied here — the single point every
// path already flows through — rather than at forty-odd call sites.
const ROOT = 'projects/bimla'

export const asset = (path) => {
  if (!path) return ''
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return `${base}/${ROOT}/${String(path).replace(/^\//, '')}`
}

export const formatNumber = (n) => new Intl.NumberFormat('en-IN').format(n)
