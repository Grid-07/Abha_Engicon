import { ref } from 'vue'

/**
 * Shared state for the banner hand-off.
 *
 * This lives outside every component on purpose. Clicking a banner changes the
 * route, and the group page — the only place the cover used to be rendered —
 * is torn down by that very change. The cover has to outlive it: it stays up
 * while the project page settles on its hero, then dissolves into it, which is
 * only seamless because the banner and the hero are the same photograph.
 *
 * So the state is a module singleton and the overlay is rendered by
 * HandOff.vue, which sits at the root of the app and is never unmounted.
 */

export const KEY = 'abha:handoff'

/** The lifted banner: { name, img, rect } — rect is the frame in viewport px. */
export const hand = ref(null)
/** Frame at full bleed. */
export const handOpen = ref(false)
/** Fading out. */
export const handGone = ref(false)
/** Arrived: scrim, veil and caption are off and the photo is back at 1:1. */
export const handLanded = ref(false)
/** 'forward' while pushing into a project, 'reverse' while coming back. */
export const phase = ref(null)

/** Dims and shrinks the page behind the cover; see style.css. */
export function setReceding(on) {
  document.body.classList.toggle('is-handing', on)
}

export function remember(slug) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ slug, y: Math.round(window.scrollY) }))
  } catch {
    /* private mode — the forward transition still works */
  }
}

/** Non-destructive: the router asks this before the page remounts. */
export function hasPending() {
  try {
    return Boolean(sessionStorage.getItem(KEY))
  } catch {
    return false
  }
}

export function takePending() {
  let raw = ''
  try {
    raw = sessionStorage.getItem(KEY) || ''
    if (raw) sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (parsed && parsed.slug) return parsed
  } catch {
    /* older plain-string value */
  }
  return { slug: raw, y: null }
}

export function reset() {
  hand.value = null
  handOpen.value = false
  handGone.value = false
  handLanded.value = false
  phase.value = null
  setReceding(false)
  document.documentElement.style.scrollBehavior = ''
}
