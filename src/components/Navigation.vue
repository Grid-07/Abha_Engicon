<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'

const route = useRoute()
const solid = ref(false)
const open = ref(false)
const progress = ref(0)
const invert = ref(false)

const links = [
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'The company' },
  { to: '/contact', label: 'Contact' },
]

function onScroll() {
  const y = window.scrollY
  solid.value = y > 40
  const h = document.documentElement.scrollHeight - window.innerHeight
  progress.value = h > 0 ? Math.min(1, y / h) : 0

  // Flip the bar to sand-on-ink while it sits over a dark section.
  const probe = 42
  let dark = false
  document.querySelectorAll('[data-nav="dark"]').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.top <= probe && r.bottom >= probe) dark = true
  })
  invert.value = dark
}

function onKey(e) {
  if (e.key === 'Escape') open.value = false
}

watch(() => route.fullPath, () => {
  open.value = false
})

watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

let ro = null

onMounted(() => {
  // The first measurement happens before CSS and webfonts have settled, which
  // puts the dark sections in the wrong place and leaves the bar stuck in the
  // inverted state. Re-measure once layout is real.
  onScroll()
  requestAnimationFrame(onScroll)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(onScroll)
  window.addEventListener('load', onScroll, { once: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)

  // Late-loading images change the page height, which moves every section.
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(onScroll)
    ro.observe(document.body)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  window.removeEventListener('keydown', onKey)
  if (ro) ro.disconnect()
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="nav" :class="{ 'nav--solid': solid, 'nav--open': open, 'nav--invert': invert }">
    <div class="nav__bar">
      <router-link to="/" class="mark" aria-label="Abha Engicon — home">
        <span class="mark__top">ABHA</span>
        <span class="mark__sub">ENGICON</span>
      </router-link>

      <nav class="nav__links" aria-label="Primary">
        <router-link v-for="l in links" :key="l.to" :to="l.to" class="nav__link">
          {{ l.label }}
        </router-link>
      </nav>

      <div class="nav__end">
        <router-link to="/contact" class="btn btn--sm nav__cta">Book a visit</router-link>
        <button
          class="burger"
          :aria-expanded="open"
          aria-controls="nav-drawer"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" :size="22" />
        </button>
      </div>
    </div>

    <div class="nav__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true"></div>

    <div id="nav-drawer" class="drawer" :class="{ 'drawer--open': open }">
      <div class="drawer__inner">
        <nav class="drawer__links" aria-label="Mobile">
          <router-link to="/" class="drawer__link">
            <span class="drawer__num">01</span>
            Home
          </router-link>
          <router-link v-for="(l, i) in links" :key="l.to" :to="l.to" class="drawer__link">
            <span class="drawer__num">0{{ i + 2 }}</span>
            {{ l.label }}
          </router-link>
        </nav>

        <p class="drawer__tag">
          Two addresses open.<br />Ten already lived in.
        </p>

        <div class="drawer__foot">
          <a :href="'tel:+919461075805'" class="drawer__phone">
            <AppIcon name="phone" :size="15" />
            +91 94610 75805
          </a>
          <a href="mailto:abhaengicon@gmail.com" class="drawer__mail">abhaengicon@gmail.com</a>
          <router-link to="/contact" class="btn drawer__cta">Book a site visit</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  transition: background 0.5s var(--ease), box-shadow 0.5s var(--ease);
}

.nav--solid {
  background: rgba(251, 247, 240, 0.92);
  backdrop-filter: blur(14px) saturate(1.1);
  box-shadow: 0 1px 0 var(--line);
}

/* Over the dark portfolio band the bar flips to sand-on-ink. */
.nav--invert {
  background: rgba(20, 20, 24, 0.86);
  box-shadow: 0 1px 0 rgba(243, 235, 221, 0.12);
}

.nav--invert .mark__top {
  color: var(--sand-50);
}

.nav--invert .mark__sub {
  color: rgba(243, 235, 221, 0.55);
}

.nav--invert .nav__link {
  color: rgba(243, 235, 221, 0.62);
}

.nav--invert .nav__link:hover,
.nav--invert .nav__link.router-link-active {
  color: var(--sand-50);
}

.nav--invert .burger {
  border-color: rgba(243, 235, 221, 0.28);
  color: var(--sand-100);
}

.nav--invert .nav__cta {
  --btn-bg: var(--sand-200);
  --btn-fg: var(--ink-900);
}

.nav--invert .nav__cta::before {
  background: var(--sand-50);
}

.nav--invert .nav__progress {
  background: var(--sand-200);
  opacity: 0.5;
}

.nav__bar {
  height: var(--nav-h);
  max-width: var(--max);
  margin-inline: auto;
  padding-inline: var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* ------------------------------------------------------------- wordmark --- */
.mark {
  display: grid;
  gap: 0.18rem;
  line-height: 1;
  flex-shrink: 0;
}

.mark__top {
  font-family: var(--display);
  font-size: 1.42rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-indent: 0.16em;
  color: var(--ink-900);
  transition: color 0.4s var(--ease);
}

.mark__sub {
  font-family: var(--ui);
  font-size: 0.44rem;
  font-weight: 500;
  letter-spacing: 0.42em;
  text-indent: 0.42em;
  color: var(--ink-500);
  transition: color 0.4s var(--ease);
}

/* ---------------------------------------------------------------- links --- */
.nav__links {
  display: flex;
  align-items: center;
  gap: 2.4rem;
  margin-left: auto;
}

.nav__link {
  position: relative;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.19em;
  text-transform: uppercase;
  color: var(--ink-600);
  padding-block: 0.4rem;
  transition: color 0.35s var(--ease);
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s var(--ease-out);
}

.nav__link:hover,
.nav__link.router-link-active {
  color: var(--ink-900);
}

.nav__link:hover::after,
.nav__link.router-link-active::after {
  transform: scaleX(1);
}

.nav__end {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

/* -------------------------------------------------------------- burger --- */
.burger {
  display: none;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--ink-900);
  transition: border-color 0.35s var(--ease), background 0.35s var(--ease);
}

.burger:hover {
  border-color: var(--ink-900);
}

/* ------------------------------------------------------------ progress --- */
.nav__progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--ink-900);
  transform-origin: left;
  opacity: 0;
  transition: opacity 0.4s var(--ease);
}

.nav--solid .nav__progress {
  opacity: 0.32;
}

/* -------------------------------------------------------------- drawer --- */
.drawer {
  position: fixed;
  inset: var(--nav-h) 0 0 0;
  background: var(--sand-100);
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.62s var(--ease-out);
  pointer-events: none;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.drawer--open {
  clip-path: inset(0 0 0 0);
  pointer-events: auto;
}

.drawer__inner {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;
  padding: 2.2rem var(--gutter) calc(2rem + env(safe-area-inset-bottom));
}

.drawer__links {
  display: grid;
  gap: 0.1rem;
}

.drawer__link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding-block: 0.85rem;
  border-bottom: 1px solid var(--line-soft);
  font-family: var(--display);
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: -0.01em;
  color: var(--ink-900);
}

.drawer__num {
  font-family: var(--ui);
  font-size: 0.56rem;
  letter-spacing: 0.2em;
  color: var(--ink-400);
}

.drawer__foot {
  display: grid;
  gap: 0.9rem;
  justify-items: start;
}

.drawer__tag {
  font-family: var(--display);
  font-size: 1.35rem;
  font-style: italic;
  line-height: 1.35;
  color: var(--ink-500);
  margin-top: 1.6rem;
}

.drawer__phone {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  color: var(--ink-700);
}

.drawer__mail {
  font-size: 0.9rem;
  color: var(--ink-500);
  border-bottom: 1px solid var(--line);
  padding-bottom: 2px;
}

.drawer__cta {
  margin-top: 0.6rem;
  width: 100%;
}

/* ------------------------------------------------------------ responsive --- */
@media (max-width: 940px) {
  .nav__links {
    display: none;
  }

  .burger {
    display: inline-flex;
  }

  .nav__cta {
    display: none;
  }
}

@media (max-width: 760px) {
  .drawer__link {
    font-size: 1.7rem;
    padding-block: 0.72rem;
  }
}
</style>
