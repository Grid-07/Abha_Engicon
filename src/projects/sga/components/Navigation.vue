<template>
  <header class="nav" :class="{ 'nav--solid': solid, 'nav--open': open }">
    <div class="nav__inner shell shell--wide">
      <router-link to="/shri-ganesh-arpan" class="brand" @click="close" aria-label="Shri Ganesh Arpan — home">
        <img
          :src="asset('images/brand/emblem-sand.png')"
          alt=""
          class="brand__mark"
          width="419"
          height="460"
        />
        <span class="brand__text">
          <span class="brand__name">ABHA</span>
          <span class="brand__sub">Shri Ganesh Arpan</span>
        </span>
      </router-link>

      <nav class="nav__links" aria-label="Primary">
        <router-link v-for="l in links" :key="l.id" :to="{ path: '/shri-ganesh-arpan', hash: '#' + l.id }">
          {{ l.label }}
        </router-link>
      </nav>

      <div class="nav__actions">
        <!-- The way out of the project and back to the group. Deliberately
             labelled: the brand above already reads ABHA, but a visitor who
             wants the other project should not have to guess that the emblem
             is a link to somewhere else entirely. -->
        <router-link to="/" class="nav__back">
          <span class="nav__back-arrow" aria-hidden="true">&larr;</span>
          <span>Abha Engicon</span>
        </router-link>
        <a class="nav__phone" :href="`tel:${contact.phones[0].value}`">
          <AppIcon name="phone" :size="15" />
          <span>{{ contact.phones[0].label }}</span>
        </a>
        <router-link :to="{ path: '/shri-ganesh-arpan', hash: '#enquire' }" class="btn btn--gold btn--sm nav__cta">
          <span>Enquire</span>
        </router-link>
        <button class="burger" :aria-expanded="open" aria-label="Menu" @click="toggle">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="nav__progress" :style="{ transform: `scaleX(${progress})` }"></div>
  </header>

  <!-- Mobile drawer -->
  <div class="drawer" :class="{ 'is-open': open }" :inert="!open">
    <div class="drawer__inner texture">
      <nav class="drawer__nav" aria-label="Mobile">
        <router-link
          v-for="(l, i) in links"
          :key="l.id"
          :to="{ path: '/shri-ganesh-arpan', hash: '#' + l.id }"
          :style="{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }"
          @click="close"
        >
          <span class="drawer__no">0{{ i + 1 }}</span>
          {{ l.label }}
        </router-link>
      </nav>

      <div class="drawer__pages">
        <router-link v-for="p in pages" :key="p.to" :to="p.to" @click="close">{{ p.label }}</router-link>
      </div>

      <div class="drawer__foot">
        <router-link to="/" class="drawer__back" @click="close">
          <span aria-hidden="true">&larr;</span> Back to Abha Engicon
        </router-link>
        <a :href="`tel:${contact.phones[0].value}`" class="drawer__phone">
          <AppIcon name="phone" :size="17" />
          {{ contact.phones[0].label }}
        </a>
        <a :href="`mailto:${contact.email}`" class="drawer__mail">{{ contact.email }}</a>
        <router-link :to="{ path: '/shri-ganesh-arpan', hash: '#enquire' }" class="btn btn--gold btn--block" @click="close">
          <span>Book a Site Visit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import { asset } from '../utils/asset'
import { contact } from '../data/project'

const route = useRoute()
const solid = ref(false)
const open = ref(false)
const progress = ref(0)

const links = [
  { id: 'overview', label: 'Overview' },
  { id: 'residences', label: 'Residences' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'location', label: 'Location' },
]

const pages = [
  { to: '/about', label: 'About Abha Engicon' },
  { to: '/floor-plans', label: 'Floor Plans' },
  { to: '/projects', label: 'Previous Projects' },
  { to: '/contact', label: 'Contact' },
]

const onKey = (e) => {
  if (e.key === 'Escape' && open.value) close()
}

const onScroll = () => {
  const y = window.scrollY
  solid.value = y > 40 || route.path !== '/'
  const h = document.documentElement.scrollHeight - window.innerHeight
  progress.value = h > 0 ? Math.min(1, y / h) : 0
}

const toggle = () => {
  open.value = !open.value
}

const close = () => {
  open.value = false
}

watch(open, (v) => {
  document.documentElement.classList.toggle('no-scroll', v)
})

watch(
  () => route.path,
  () => {
    close()
    onScroll()
  }
)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  window.removeEventListener('keydown', onKey)
  document.documentElement.classList.remove('no-scroll')
})
</script>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 90;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  transition: background 0.5s var(--ease), backdrop-filter 0.5s var(--ease),
    border-color 0.5s var(--ease), height 0.4s var(--ease);
  border-bottom: 1px solid transparent;
}

.nav--solid {
  background: rgba(10, 10, 12, 0.9);
  backdrop-filter: blur(18px) saturate(130%);
  -webkit-backdrop-filter: blur(18px) saturate(130%);
  border-bottom-color: rgba(193, 160, 116, 0.22);
}

.nav--open {
  background: var(--ink-950);
  border-bottom-color: rgba(193, 160, 116, 0.22);
}

.nav__inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 1360px;
  margin-inline: auto;
  padding-inline: var(--gutter);
}

/* --- Brand lockup ------------------------------------------------------- */
/* Mirrors the parent site's lockup exactly: same emblem size, same wordmark
   size and tracking. Only the second line changes. */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.62rem;
  margin-right: auto;
  flex-shrink: 0;
  color: var(--gold-100);
}

.brand__mark {
  width: auto;
  height: 30px;
  flex-shrink: 0;
}

.brand__text {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
  line-height: 1;
}

.brand__name {
  font-family: var(--font-display);
  font-size: 1.42rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-indent: 0.16em;
  color: var(--gold-200);
}

.brand__sub {
  font-family: var(--font-sans);
  font-size: 0.48rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-indent: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
  color: rgba(241, 233, 219, 0.66);
}

/* --- Links -------------------------------------------------------------- */
.nav__links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.nav__links a {
  position: relative;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.76);
  padding-block: 0.4rem;
  transition: color 0.35s var(--ease);
}

.nav__links a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--gold-400);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s var(--ease);
}

.nav__links a:hover {
  color: var(--gold-200);
}

.nav__links a:hover::after {
  transform: scaleX(1);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav__back {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.6);
  transition: color 0.35s var(--ease);
}

.nav__back:hover {
  color: var(--gold-300);
}

.nav__back-arrow {
  transition: transform 0.35s var(--ease);
}

.nav__back:hover .nav__back-arrow {
  transform: translateX(-3px);
}

.nav__phone {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: rgba(241, 233, 219, 0.82);
  transition: color 0.35s var(--ease);
}

.nav__phone:hover {
  color: var(--gold-300);
}

.nav__cta {
  letter-spacing: 0.2em;
}

/* --- Burger ------------------------------------------------------------- */
.burger {
  display: none;
  width: 44px;
  height: 44px;
  margin-right: -10px;
  position: relative;
  align-items: center;
  justify-content: center;
}

.burger span {
  position: absolute;
  left: 11px;
  width: 22px;
  height: 1px;
  background: var(--gold-200);
  transition: transform 0.45s var(--ease), opacity 0.3s var(--ease), width 0.4s var(--ease);
}

.burger span:nth-child(1) {
  transform: translateY(-6px);
}

.burger span:nth-child(3) {
  transform: translateY(6px);
  width: 14px;
}

.nav--open .burger span:nth-child(1) {
  transform: rotate(45deg);
}

.nav--open .burger span:nth-child(2) {
  opacity: 0;
}

.nav--open .burger span:nth-child(3) {
  transform: rotate(-45deg);
  width: 22px;
}

/* --- Scroll progress ---------------------------------------------------- */
.nav__progress {
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, var(--gold-600), var(--gold-300));
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 0.15s linear;
}

/* --- Drawer ------------------------------------------------------------- */
.drawer {
  position: fixed;
  inset: var(--nav-h) 0 0 0;
  z-index: 85;
  background: var(--ink-950);
  overflow-y: auto;
  overscroll-behavior: contain;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.65s var(--ease);
  pointer-events: none;
}

.drawer.is-open {
  clip-path: inset(0 0 0 0);
  pointer-events: auto;
}

.drawer__inner {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 2rem var(--gutter) 2.5rem;
  gap: 1.5rem;
}

.drawer__nav {
  display: flex;
  flex-direction: column;
}

.drawer__nav a {
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  padding-block: 0.85rem;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 6.4vw, 2rem);
  letter-spacing: 0.06em;
  color: var(--gold-100);
  border-bottom: 1px solid rgba(241, 233, 219, 0.1);
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
}

.drawer.is-open .drawer__nav a {
  opacity: 1;
  transform: none;
}

.drawer__no {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--gold-600);
}

.drawer__pages {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.3rem;
}

.drawer__pages a {
  font-size: 0.68rem;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.55);
}

.drawer__pages a:hover {
  color: var(--gold-300);
}

.drawer__foot {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding-top: 1.5rem;
}

.drawer__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.55);
  transition: color 0.35s var(--ease);
}

.drawer__back:hover {
  color: var(--gold-300);
}

.drawer__phone {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  color: var(--gold-200);
}

.drawer__mail {
  font-size: 0.82rem;
  color: rgba(241, 233, 219, 0.6);
  margin-bottom: 0.6rem;
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 1080px) {
  .nav__links,
  .nav__back,
  .nav__phone {
    display: none;
  }
}

@media (max-width: 860px) {
  .burger {
    display: flex;
  }

  .nav__cta {
    display: none;
  }
}

@media (max-width: 420px) {
  .brand__name {
    font-size: 1.18rem;
  }

  .brand__sub {
    font-size: 0.38rem;
    letter-spacing: 0.18em;
    text-indent: 0.18em;
  }

  .brand__mark {
    height: 26px;
  }
}
</style>
