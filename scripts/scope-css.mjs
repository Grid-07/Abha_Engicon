/**
 * Scopes a merged project stylesheet to its own body class.
 *
 * All three sites were written as standalone apps, so each one sets its
 * palette on `:root` — and they disagree. Abha Engicon's --ink-900 is #141418,
 * Shri Ganesh Arpan's is #101013; both define --gold-*, and all three use
 * .nav, .hero, .footer and .dock as class names. Loaded together unscoped,
 * the last stylesheet wins and repaints the other two sites.
 *
 * So every rule in src/projects/<name>/style.css is rewritten to hang off
 * `body.site-<name>`, and the router puts that class on <body> for the
 * duration of the visit. Scoping to <body> rather than a wrapper <div> is
 * deliberate: both projects teleport their drawers and lightboxes to <body>,
 * so a wrapper would leave that markup outside the scope with no variables
 * and no rules at all.
 *
 *   :root        -> body.site-bimla      (tokens land where teleports inherit)
 *   html         -> html.site-bimla      (scroll padding, text sizing)
 *   body         -> body.site-bimla
 *   .no-scroll   -> left alone           (the class goes on <body> itself)
 *   anything     -> body.site-bimla <selector>
 *
 * Keyframe blocks are skipped — @keyframes has no selector to prefix, and the
 * three sites happen to use disjoint names (pulse/fadeIn/nudge, rise/heroDrift/
 * scrollDot, statIn/scrollCue/ping/kenburns), so nothing collides there.
 */

const PROJECTS = {
  bimla: { body: 'site-bimla' },
  sga: { body: 'site-sga' },
}

export function scopeSelector(selector, bodyClass) {
  const s = selector.trim()
  if (!s) return s

  // Applied to <body> by the drawer and the lightbox, so it has to stay global
  // or it never matches anything.
  if (s === '.no-scroll') return s

  if (s === ':root') return `body.${bodyClass}`
  if (s === 'html') return `html.${bodyClass}`
  if (s === 'body') return `body.${bodyClass}`

  // `html.dark .x` / `body.locked .y` keep their anchor, just gain the class.
  if (/^html\b/.test(s)) return s.replace(/^html\b/, `html.${bodyClass}`)
  if (/^body\b/.test(s)) return s.replace(/^body\b/, `body.${bodyClass}`)

  return `body.${bodyClass} ${s}`
}

export function scopeProjectCss() {
  return {
    postcssPlugin: 'abha-scope-project-css',
    OnceExit(root, { result }) {
      const from = String(result.opts.from || '').replace(/\\/g, '/')
      const match = from.match(/src\/projects\/([^/]+)\/style\.css$/)
      if (!match) return

      const project = PROJECTS[match[1]]
      if (!project) return

      root.walkRules((rule) => {
        const parent = rule.parent
        if (parent && parent.type === 'atrule' && /keyframes$/i.test(parent.name)) return
        rule.selectors = rule.selectors.map((s) => scopeSelector(s, project.body))
      })
    },
  }
}

scopeProjectCss.postcss = true
