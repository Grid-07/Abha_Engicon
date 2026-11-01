// v-reveal — lightweight scroll-reveal directive built on IntersectionObserver.
// Usage: v-reveal            -> fades up when 12% visible
//        v-reveal="150"      -> optional delay in ms
//        v-reveal:left       -> direction (up | left | right | zoom)
const observers = new WeakMap()

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default {
  mounted(el, binding) {
    if (reduceMotion()) {
      el.classList.add('is-revealed')
      return
    }

    const dir = binding.arg || 'up'
    el.classList.add('reveal', `reveal--${dir}`)
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    io.observe(el)
    observers.set(el, io)
  },
  unmounted(el) {
    const io = observers.get(el)
    if (io) io.disconnect()
    observers.delete(el)
  },
}
