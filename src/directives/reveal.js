/**
 * v-reveal — fades an element up once it enters the viewport.
 * Usage: v-reveal  or  v-reveal="120" (delay in ms)
 */
const supported = typeof window !== 'undefined' && 'IntersectionObserver' in window

let observer = null

function ensureObserver() {
  if (observer || !supported) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )
  return observer
}

export default {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (!supported) {
      el.classList.add('is-revealed')
      return
    }
    const delay = Number(binding.value) || 0
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)
    ensureObserver().observe(el)
  },
  unmounted(el) {
    if (observer) observer.unobserve(el)
  },
}
