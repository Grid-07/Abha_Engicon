<template>
  <section class="hero" ref="root">
    <div class="hero__media">
      <div class="hero__layer" :style="{ transform: `translate3d(0, ${parallax}px, 0)` }">
        <picture class="hero__picture">
          <source media="(max-width: 760px)" :srcset="asset(media.heroPosterMobile)" />
          <img
            :src="asset(media.heroPoster)"
            alt="Aerial view of Bimla Mangal Gardens, Biharsharif"
            class="hero__img"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
      </div>
      <div class="hero__veil"></div>
      <div class="hero__grain"></div>
    </div>

    <div class="hero__rail">
      <span>Biharsharif</span>
      <span class="hero__rail-dot"></span>
      <span>Nalanda</span>
    </div>

    <div class="hero__body">
      <p class="hero__kicker">
        <span class="hero__kicker-line"></span>
        Abha Engicon presents
        <span class="hero__kicker-line"></span>
      </p>

      <h1 class="hero__title">
        <span class="hero__title-main">Bimla Mangal</span>
        <span class="hero__title-sub">Gardens</span>
      </h1>

      <div class="hero__rule">
        <span></span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.6 6.1L20 10l-6.4 1.9L12 18l-1.6-6.1L4 10l6.4-1.9z" fill="currentColor"/></svg>
        <span></span>
      </div>

      <p class="hero__tagline">{{ brand.motto }}</p>

      <div class="hero__actions">
        <a href="#residences" class="btn btn--gold" @click.prevent="go('residences')">
          <span>Explore Residences</span>
          <svg class="btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a href="#enquire" class="btn btn--ghost" @click.prevent="go('enquire')">
          <span>Book a Site Visit</span>
        </a>
      </div>
    </div>

    <div class="hero__stats">
      <div class="hero__stat" v-for="(s, i) in heroStats" :key="s.label">
        <span class="hero__stat-num">
          {{ display[i] }}<em>{{ s.suffix }}</em>
        </span>
        <span class="hero__stat-label">{{ s.label }}</span>
      </div>
    </div>

    <button class="hero__film" @click="go('walkthrough')">
      <span class="hero__film-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5.4v13.2L19 12z" fill="currentColor" /></svg>
      </span>
      <span class="hero__film-text">
        Watch the film
        <em>71 sec · Gallery</em>
      </span>
    </button>

    <button class="hero__scroll" @click="go('about')" aria-label="Scroll to explore">
      <span class="hero__scroll-track"><span class="hero__scroll-dot"></span></span>
      <span class="hero__scroll-text">Scroll</span>
    </button>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { asset } from '../utils/asset'
import media from '../data/media.json'
import { brand, heroStats } from '../data/project'

const root = ref(null)
const parallax = ref(0)
const display = reactive(heroStats.map(() => 0))

const go = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 76
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

let ticking = false
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    parallax.value = Math.min(window.scrollY * 0.16, 120)
    ticking = false
  })
}

const countUp = () => {
  const duration = 1600
  const start = performance.now()
  const step = (now) => {
    const p = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - p, 3)
    heroStats.forEach((s, i) => {
      display[i] = Math.round(s.value * eased)
    })
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduce) {
    heroStats.forEach((s, i) => (display[i] = s.value))
  } else {
    setTimeout(countUp, 700)
  }
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: var(--navy-950);
  color: #fff;
  padding: calc(var(--nav-h) + 1rem) var(--gutter) 0;
  isolation: isolate;
}

/* Media */
.hero__media {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.hero__layer {
  position: absolute;
  top: -8%;
  left: 0;
  right: 0;
  height: 116%;
  will-change: transform;
}

.hero__picture {
  display: contents;
}

.hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 58%;
  /* The hero is a still now, so it carries the motion itself: a very slow
     push-in that never fully settles. Any faster and it reads as a zoom
     effect rather than a camera. */
  animation: heroDrift 42s var(--ease-soft) infinite alternate;
}

@keyframes heroDrift {
  from {
    transform: scale(1.02) translate3d(0, 0, 0);
  }
  to {
    transform: scale(1.1) translate3d(-1.4%, -1.2%, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__img {
    animation: none;
  }
}

.hero__veil {
  position: absolute;
  inset: 0;
  background:
    /* Soft pool of shadow behind the type, so the facade — and the project's
       own signboard on it — recedes instead of competing with the headline. */
    radial-gradient(74% 54% at 50% 44%, rgba(4, 10, 20, 0.46) 0%, rgba(4, 10, 20, 0) 74%),
    linear-gradient(180deg, rgba(4, 10, 20, 0.84) 0%, rgba(4, 10, 20, 0.4) 30%, rgba(4, 10, 20, 0.56) 64%, rgba(4, 10, 20, 0.96) 100%),
    radial-gradient(120% 80% at 50% 45%, rgba(4, 10, 20, 0) 0%, rgba(4, 10, 20, 0.5) 100%);
}

.hero__grain {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cg fill='none' stroke='%23d2af5e' stroke-width='.5' opacity='.12'%3E%3Ccircle cx='0' cy='70' r='70'/%3E%3Ccircle cx='140' cy='70' r='70'/%3E%3Ccircle cx='70' cy='0' r='70'/%3E%3Ccircle cx='70' cy='140' r='70'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 140px 140px;
  mix-blend-mode: overlay;
}

/* Vertical rail */
.hero__rail {
  position: absolute;
  left: clamp(0.6rem, 2.5vw, 1.9rem);
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  writing-mode: vertical-rl;
  display: none;
  align-items: center;
  gap: 1rem;
  font-size: 0.6rem;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: rgba(243, 236, 223, 0.5);
}

.hero__rail-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gold-500);
}

@media (min-width: 1180px) {
  .hero__rail {
    display: flex;
  }
}

/* Body */
.hero__body {
  text-align: center;
  max-width: 960px;
  padding-block: clamp(1.5rem, 6vh, 3.5rem) 0;
}

.hero__kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  font-size: clamp(0.56rem, 1.4vw, 0.7rem);
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: var(--gold-300);
  margin-bottom: clamp(0.9rem, 2.6vw, 1.9rem);
  animation: rise 1s var(--ease) 0.15s both;
}

.hero__kicker-line {
  width: clamp(18px, 6vw, 54px);
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-500));
}

.hero__kicker-line:last-child {
  background: linear-gradient(90deg, var(--gold-500), transparent);
}

.hero__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1em;
  line-height: 0.92;
  animation: rise 1.1s var(--ease) 0.28s both;
}

.hero__title-main {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 9vw, 6.2rem);
  font-weight: 300;
  letter-spacing: 0.03em;
  color: #fff;
  text-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

.hero__title-sub {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.75rem, 6.2vw, 4.3rem);
  font-weight: 300;
  letter-spacing: 0.06em;
  background: linear-gradient(100deg, var(--gold-600) 0%, var(--gold-300) 45%, var(--gold-500) 75%, var(--gold-200) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  margin-top: -0.06em;
}

.hero__rule {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  margin: clamp(0.9rem, 2.6vw, 1.7rem) auto clamp(0.75rem, 2.2vw, 1.3rem);
  color: var(--gold-400);
  animation: rise 1s var(--ease) 0.45s both;
}

.hero__rule span {
  width: clamp(40px, 12vw, 96px);
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-500));
}

.hero__rule span:last-child {
  background: linear-gradient(90deg, var(--gold-500), transparent);
}

.hero__rule svg {
  width: 12px;
  height: 12px;
  opacity: 0.9;
}

.hero__tagline {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(0.95rem, 2.5vw, 1.38rem);
  font-weight: 300;
  letter-spacing: 0.03em;
  color: rgba(247, 236, 208, 0.92);
  max-width: 58ch;
  margin-inline: auto;
  animation: rise 1s var(--ease) 0.55s both;
  text-wrap: balance;
  text-shadow: 0 6px 24px rgba(0, 0, 0, 0.6);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem;
  margin-top: clamp(1.4rem, 4vw, 2.5rem);
  animation: rise 1s var(--ease) 0.7s both;
}

/* Stats */
.hero__stats {
  width: 100%;
  max-width: 940px;
  margin-top: auto;
  margin-bottom: clamp(2.4rem, 6vw, 3.4rem);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(243, 236, 223, 0.14);
  border: 1px solid rgba(243, 236, 223, 0.14);
  border-radius: var(--radius);
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: rise 1s var(--ease) 0.9s both;
}

.hero__stat {
  background: rgba(7, 18, 35, 0.46);
  padding: clamp(0.85rem, 2.4vw, 1.5rem) 0.5rem;
  text-align: center;
}

.hero__stat-num {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3.8vw, 2.3rem);
  font-weight: 400;
  line-height: 1;
  color: var(--gold-300);
  font-variant-numeric: tabular-nums;
}

.hero__stat-num em {
  font-style: normal;
  font-size: 0.7em;
}

.hero__stat-label {
  display: block;
  margin-top: 0.5rem;
  font-size: clamp(0.52rem, 1.4vw, 0.64rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(243, 236, 223, 0.66);
  line-height: 1.45;
}

/* Film cue — the hero is a still banner now, so the 71-second film is offered
   here as a quiet door into the gallery rather than autoplaying behind the
   headline. */
.hero__film {
  position: absolute;
  left: clamp(0.8rem, 3vw, 2rem);
  bottom: clamp(0.9rem, 3vw, 1.8rem);
  display: inline-flex;
  align-items: center;
  gap: 0.62rem;
  padding: 0.4rem 0.95rem 0.4rem 0.4rem;
  border-radius: 999px;
  border: 1px solid rgba(243, 236, 223, 0.22);
  background: rgba(7, 18, 35, 0.44);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: rgba(243, 236, 223, 0.86);
  transition: border-color 0.35s var(--ease), background-color 0.35s var(--ease), transform 0.35s var(--ease);
  z-index: 4;
}

.hero__film:hover {
  border-color: rgba(210, 175, 94, 0.6);
  background: rgba(7, 18, 35, 0.62);
  transform: translateY(-1px);
}

.hero__film-icon {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 1px solid rgba(210, 175, 94, 0.55);
  color: var(--gold-300);
}

.hero__film-icon svg {
  width: 11px;
  height: 11px;
  margin-left: 1px;
}

.hero__film-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.16rem;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  line-height: 1;
}

.hero__film-text em {
  font-style: normal;
  font-size: 0.47rem;
  letter-spacing: 0.16em;
  color: rgba(243, 236, 223, 0.48);
}

/* Scroll cue */
.hero__scroll {
  position: absolute;
  right: clamp(0.8rem, 3vw, 2.2rem);
  bottom: clamp(1rem, 3vw, 1.8rem);
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  color: rgba(243, 236, 223, 0.55);
  z-index: 4;
}

.hero__scroll-track {
  width: 1px;
  height: 54px;
  background: rgba(243, 236, 223, 0.22);
  position: relative;
  overflow: hidden;
}

.hero__scroll-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 18px;
  background: var(--gold-400);
  animation: scrollDot 2.2s var(--ease-soft) infinite;
}

@keyframes scrollDot {
  0% { transform: translateY(-20px); }
  60%, 100% { transform: translateY(56px); }
}

.hero__scroll-text {
  font-size: 0.55rem;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
}

@media (min-width: 1024px) {
  .hero__scroll {
    display: flex;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* Mobile tuning */
@media (max-width: 760px) {
  /* The phone poster is already composed for a tall frame, so it only needs a
     gentle nudge rather than the aggressive 58% crop used on wide screens. */
  .hero__img {
    object-position: center 45%;
  }
}

@media (max-width: 640px) {
  .hero {
    justify-content: flex-end;
    padding-bottom: calc(58px + env(safe-area-inset-bottom));
    min-height: 100svh;
  }

  .hero__body {
    padding-block: 0;
    margin-top: auto;
    margin-bottom: 1.1rem;
  }

  .hero__stats {
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 0.9rem;
    border-radius: 12px;
  }

  .hero__stat {
    padding: 0.7rem 0.25rem;
  }

  .hero__stat-label {
    font-size: 0.47rem;
    letter-spacing: 0.1em;
    margin-top: 0.35rem;
  }

  .hero__actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.6rem;
  }

  .hero__actions .btn {
    width: 100%;
  }

  .hero__img {
    object-position: center 52%;
  }

  .hero__film {
    top: calc(var(--nav-h) + 0.55rem);
    bottom: auto;
    left: auto;
    right: 0.8rem;
    padding: 0.28rem 0.7rem 0.28rem 0.28rem;
    gap: 0.45rem;
  }

  .hero__film-icon {
    width: 21px;
    height: 21px;
  }

  .hero__film-text {
    font-size: 0.47rem;
    letter-spacing: 0.14em;
  }

  .hero__film-text em {
    font-size: 0.4rem;
  }
}

@media (max-height: 720px) and (min-width: 641px) {
  .hero__stats {
    margin-bottom: 1.2rem;
  }

  .hero__body {
    padding-block: 0.5rem 0;
  }
}
</style>
