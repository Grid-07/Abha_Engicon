<template>
  <header class="nav" :class="{ 'nav--solid': solid || !isHome, 'nav--open': open }">
    <div class="nav__progress" :style="{ transform: `scaleX(${progress})` }"></div>

    <div class="nav__inner">
      <!-- One image, the company's own lockup, carried exactly as the parent
           site carries it. It is the group's mark, so it leaves the project
           and lands on the Abha Engicon home page; the labelled way back sits
           in the actions below for anyone who does not read a logo as a link. -->
      <div class="brand">
        <router-link
          to="/"
          class="brand__mark-link"
          aria-label="Abha Engicon — home"
          title="Abha Engicon — home"
          @click="close"
        >
          <img
            :src="asset('images/brand/logo-cream.png')"
            alt=""
            class="brand__mark"
            width="581"
            height="233"
          />
        </router-link>
      </div>

      <nav class="nav__links" aria-label="Primary">
        <a
          v-for="item in links"
          :key="item.id"
          :href="`#${item.id}`"
          class="nav__link"
          :class="{ 'is-active': active === item.id }"
          @click.prevent="go(item.id)"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="nav__actions">
        <!-- The way out of the project and back to the group. Labelled on
             purpose: the lockup above leaves the project too, but a visitor who
             wants the other project should not have to guess that a logo
             doubles as a link somewhere else. -->
        <router-link to="/" class="nav__back">
          <span class="nav__back-arrow" aria-hidden="true">&larr;</span>
          <span>Abha Engicon</span>
        </router-link>
        <a :href="`tel:${contact.phones[0].value}`" class="nav__phone">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" fill="currentColor"/></svg>
          <span>{{ contact.phones[0].label }}</span>
        </a>
        <a href="#enquire" class="btn btn--gold btn--sm nav__cta" @click.prevent="go('enquire')">
          <span>Book a Visit</span>
        </a>
      </div>

      <button
        class="burger"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        aria-label="Toggle menu"
        @click="toggle"
      >
        <span></span><span></span>
      </button>
    </div>
  </header>

  <!-- Outside the header on purpose: .nav--solid carries a backdrop-filter,
       which makes the bar a containing block for fixed children and would
       throw the drawer's top offset off by the ribbon's height. -->
  <div id="mobile-menu" class="drawer" :class="{ 'drawer--open': open }" :inert="!open">
    <div class="drawer__inner">
      <a
        v-for="(item, i) in links"
        :key="item.id"
        :href="`#${item.id}`"
        class="drawer__link"
        :style="{ '--i': i }"
        @click.prevent="go(item.id)"
      >
        <span class="drawer__index">0{{ i + 1 }}</span>
        <span>{{ item.label }}</span>
      </a>

      <div class="drawer__foot">
        <router-link to="/" class="drawer__back" @click="close">
          <span aria-hidden="true">&larr;</span> Back to Abha Engicon
        </router-link>
        <a :href="`tel:${contact.phones[0].value}`" class="drawer__phone">
          {{ contact.phones[0].label }}
        </a>
        <a :href="`mailto:${contact.email}`" class="drawer__mail">{{ contact.email }}</a>
        <a href="#enquire" class="btn btn--gold btn--block" @click.prevent="go('enquire')">
          <span>Book a Site Visit</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { asset } from '../utils/asset'
import { contact } from '../data/project'

const links = [
  { id: 'residences', label: 'Residences' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'walkthrough', label: 'Gallery' },
  { id: 'location', label: 'Location' },
  { id: 'enquire', label: 'Enquire' },
]

const route = useRoute()
const router = useRouter()

const solid = ref(false)
const open = ref(false)
const isHome = computed(() => route.path === '/bimla-mangal-gardens')
const progress = ref(0)
const active = ref('')

const onScroll = () => {
  const y = window.scrollY
  solid.value = y > 40
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, y / max) : 0
}

const toggle = () => {
  open.value = !open.value
}

const close = () => {
  open.value = false
}

watch(open, (v) => {
  document.body.classList.toggle('no-scroll', v)
})

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  // --nav-h is a calc() now (nav + group ribbon), so it cannot be parsed as a
  // number. Measure the fixed header itself instead.
  const header = document.querySelector('.nav')
  const offset = header ? header.getBoundingClientRect().height : 80
  const top = el.getBoundingClientRect().top + window.scrollY - offset - 8
  window.scrollTo({ top, behavior: 'smooth' })
}

const go = async (id) => {
  close()
  // Bimla is a single page, so this is usually the current route and the push
  // is a no-op — scroll straight away instead of waiting a frame for nothing.
  if (route.path !== '/bimla-mangal-gardens') {
    await router.push('/bimla-mangal-gardens')
    requestAnimationFrame(() => setTimeout(() => scrollTo(id), 120))
  } else {
    scrollTo(id)
  }
}

let sectionObserver = null

const observeSections = () => {
  if (sectionObserver) sectionObserver.disconnect()
  const els = links.map((l) => document.getElementById(l.id)).filter(Boolean)
  if (!els.length) return
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) active.value = e.target.id
      })
    },
    { rootMargin: '-45% 0px -50% 0px' }
  )
  els.forEach((el) => sectionObserver.observe(el))
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  setTimeout(observeSections, 600)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.classList.remove('no-scroll')
  if (sectionObserver) sectionObserver.disconnect()
})

watch(() => route.path, () => {
  setTimeout(observeSections, 600)
})
</script>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 900;
  color: #fff;
  transition: background 0.5s var(--ease), box-shadow 0.5s var(--ease), backdrop-filter 0.5s var(--ease);
}

.nav--solid {
  background: rgba(7, 18, 35, 0.9);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  box-shadow: 0 1px 0 rgba(210, 175, 94, 0.22), 0 18px 40px -30px rgba(0, 0, 0, 0.9);
}

.nav--open {
  background: var(--navy-950);
}

.nav__progress {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  transform-origin: 0 50%;
  background: linear-gradient(90deg, var(--gold-600), var(--gold-300));
  transform: scaleX(0);
  transition: transform 0.12s linear;
}

.nav__inner {
  max-width: 1360px;
  margin-inline: auto;
  padding: 0 var(--gutter);
  height: var(--nav-h);
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
}

/* Brand — the company's own lockup, the same asset the parent site uses.
   It is 2.49:1, so height is the only dimension worth setting. 34px is where
   the ENGICON line still resolves into letters rather than a smear. */
.brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

/* The lockup is the group link. The padded, negative-margined box gives it a
   comfortable hit area without moving it a pixel; the radius is a soft
   rectangle rather than a circle, because the mark is wider than it is tall. */
.brand__mark-link {
  display: inline-flex;
  align-items: center;
  padding: 7px;
  margin: -7px;
  border-radius: 8px;
  flex-shrink: 0;
  transition: background 0.35s var(--ease), box-shadow 0.35s var(--ease);
}

.brand__mark-link:hover,
.brand__mark-link:focus-visible {
  background: rgba(210, 175, 94, 0.16);
  box-shadow: 0 0 0 1px rgba(210, 175, 94, 0.4);
}

.brand__mark {
  width: auto;
  height: 34px;
  flex-shrink: 0;
}

/* Links */
.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(0.9rem, 2vw, 1.9rem);
  margin-left: auto;
}

.nav__link {
  position: relative;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(243, 236, 223, 0.78);
  padding: 0.4rem 0;
  transition: color 0.3s var(--ease);
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 100%;
  background: var(--gold-400);
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.45s var(--ease);
}

.nav__link:hover,
.nav__link.is-active {
  color: var(--gold-300);
}

.nav__link:hover::after,
.nav__link.is-active::after {
  transform: scaleX(1);
}

/* Actions */
.nav__actions {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-left: 0.4rem;
}

.nav__back {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(243, 236, 223, 0.62);
  transition: color 0.3s var(--ease);
}

.nav__back:hover {
  color: var(--gold-300);
}

.nav__back-arrow {
  transition: transform 0.3s var(--ease);
}

.nav__back:hover .nav__back-arrow {
  transform: translateX(-3px);
}

.nav__phone {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.74rem;
  letter-spacing: 0.06em;
  color: rgba(243, 236, 223, 0.85);
  transition: color 0.3s var(--ease);
}

.nav__phone svg {
  width: 14px;
  height: 14px;
  color: var(--gold-400);
}

.nav__phone:hover {
  color: var(--gold-300);
}

.nav__cta {
  padding: 0.66rem 1.3rem;
  min-height: 42px;
  font-size: 0.66rem;
}

/* Burger */
.burger {
  display: none;
  position: relative;
  width: 44px;
  height: 44px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 7px;
  border-radius: 50%;
  border: 1px solid rgba(210, 175, 94, 0.35);
  flex-shrink: 0;
}

.burger span {
  display: block;
  width: 18px;
  height: 1.5px;
  background: var(--gold-300);
  transition: transform 0.4s var(--ease), opacity 0.3s var(--ease);
}

.nav--open .burger span:first-child {
  transform: translateY(4.2px) rotate(45deg);
}

.nav--open .burger span:last-child {
  transform: translateY(-4.2px) rotate(-45deg);
}

/* Drawer */
.drawer {
  position: fixed;
  top: var(--nav-h);
  left: 0;
  right: 0;
  z-index: 890;
  height: calc(100vh - var(--nav-h));
  height: calc(100dvh - var(--nav-h));
  background: var(--navy-950);
  overflow-y: auto;
  overscroll-behavior: contain;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.6s var(--ease);
  pointer-events: none;
}

.drawer--open {
  clip-path: inset(0 0 0 0);
  pointer-events: auto;
}

.drawer__inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  padding: clamp(1.5rem, 6vw, 3rem) var(--gutter) calc(2rem + env(safe-area-inset-bottom));
}

.drawer__link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 1.05rem 0;
  border-bottom: 1px solid rgba(243, 236, 223, 0.1);
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 8vw, 2.4rem);
  font-weight: 300;
  color: var(--on-dark);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s var(--ease), transform 0.5s var(--ease), color 0.3s var(--ease);
}

.drawer--open .drawer__link {
  opacity: 1;
  transform: none;
  transition-delay: calc(140ms + var(--i) * 55ms);
}

.drawer__link:active {
  color: var(--gold-300);
}

.drawer__index {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  color: var(--gold-600);
}

.drawer__foot {
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.drawer__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(243, 236, 223, 0.55);
  transition: color 0.3s var(--ease);
}

.drawer__back:hover {
  color: var(--gold-300);
}

.drawer__phone {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--gold-300);
  letter-spacing: 0.04em;
}

.drawer__mail {
  font-size: 0.82rem;
  color: var(--on-dark-soft);
  margin-bottom: 0.75rem;
  word-break: break-word;
}

@media (max-width: 1080px) {
  .nav__back {
    display: none;
  }
  .nav__phone span {
    display: none;
  }
  .nav__phone {
    width: 40px;
    height: 40px;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(243, 236, 223, 0.2);
  }
}

@media (max-width: 900px) {
  .nav__links,
  .nav__actions {
    display: none;
  }

  .burger {
    display: flex;
  }

  .brand__mark {
    height: 30px;
  }
}
</style>
