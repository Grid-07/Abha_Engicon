<template>
  <section class="hero" :class="{ 'is-loaded': loaded }">
    <div class="hero__media" :style="{ transform: `translate3d(0, ${parallax}px, 0)` }">
      <img
        :src="asset('images/brochure/hero-facade.jpg')"
        alt="Shri Ganesh Arpan — the two residential towers on the Ekangarsarai Main Road, Biharsharif"
        class="hero__img"
        fetchpriority="high"
        decoding="async"
        @load="loaded = true"
      />
    </div>
    <div class="hero__veil"></div>
    <div class="hero__grain"></div>

    <div class="hero__content shell shell--wide">
      <p class="hero__presented">
        <span>{{ brand.presented }}</span>
      </p>

      <p class="hero__place">
        <AppIcon name="pin" :size="13" />
        Biharsharif · Nalanda · Bihar
      </p>

      <h1 class="hero__title">
        <span class="hero__title-line">Shri Ganesh</span>
        <span class="hero__title-line hero__title-line--gold">Arpan</span>
      </h1>

      <p class="hero__sub">Plush <i>·</i> Peaceful <i>·</i> Pristine</p>

      <p class="hero__lead">
        Two low-rise towers of two and three bedroom homes on the Ekangarsarai Main
        Road — a dreamy abode designed for your family.
      </p>

      <div class="hero__cta">
        <router-link :to="{ path: '/shri-ganesh-arpan', hash: '#residences' }" class="btn btn--gold">
          <span>Explore Residences</span>
          <AppIcon name="arrow" class="btn__arrow" :size="15" />
        </router-link>
        <router-link :to="{ path: '/shri-ganesh-arpan/floor-plans' }" class="btn btn--ghost">
          <span>View Floor Plans</span>
        </router-link>
      </div>
    </div>

    <div class="hero__stats shell shell--wide">
      <div v-for="(s, i) in heroStats" :key="s.label" class="stat" :style="{ '--i': i }">
        <span class="stat__value num">{{ display[i] }}<em v-if="s.suffix">{{ s.suffix }}</em></span>
        <span class="stat__label">{{ s.label }}</span>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span></span>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import AppIcon from './AppIcon.vue'
import { asset } from '../utils/asset'
import { brand, heroStats } from '../data/project'

const loaded = ref(false)
const parallax = ref(0)
const display = reactive(heroStats.map(() => 0))

let ticking = false
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    parallax.value = Math.min(y * 0.28, 200)
    ticking = false
  })
}

// Count the stats up once the hero is on screen
const count = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  heroStats.forEach((s, i) => {
    if (reduce) {
      display[i] = s.value
      return
    }
    const dur = 1400
    const start = performance.now() + i * 110
    const step = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / dur))
      const eased = 1 - Math.pow(1 - t, 3)
      display[i] = Math.round(s.value * eased)
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  setTimeout(count, 420)
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: calc(var(--nav-h) + 3rem);
  padding-bottom: 0;
  overflow: hidden;
  background: var(--ink-950);
  color: var(--on-dark);
  isolation: isolate;
}

/* --- Media -------------------------------------------------------------- */
.hero__media {
  position: absolute;
  inset: -6% 0 -6% 0;
  z-index: 0;
  will-change: transform;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 42%;
  opacity: 0;
  transform: scale(1.08);
  transition: opacity 1.6s var(--ease), transform 9s cubic-bezier(0.2, 0, 0.2, 1);
}

.hero.is-loaded .hero__img {
  opacity: 1;
  transform: scale(1);
  animation: kenburns 34s ease-in-out infinite alternate;
}

@keyframes kenburns {
  from {
    transform: scale(1) translate3d(0, 0, 0);
  }
  to {
    transform: scale(1.07) translate3d(-1.2%, -1%, 0);
  }
}

.hero__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(180deg, rgba(10, 10, 12, 0.88) 0%, rgba(10, 10, 12, 0.22) 24%, rgba(10, 10, 12, 0.4) 56%, rgba(10, 10, 12, 0.96) 100%),
    linear-gradient(100deg, rgba(10, 10, 12, 0.8) 0%, rgba(10, 10, 12, 0.1) 44%, rgba(10, 10, 12, 0.42) 100%);
}

.hero__grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-image: url('../assets/mandala.jpg');
  background-size: 900px auto;
  background-position: 78% 30%;
  opacity: 0.14;
  mix-blend-mode: luminosity;
  pointer-events: none;
}

/* --- Content ------------------------------------------------------------ */
.hero__content {
  position: relative;
  z-index: 3;
  padding-bottom: clamp(1.6rem, 3.5vw, 2.6rem);
}

.hero__presented {
  font-size: 0.6rem;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.55);
  margin-bottom: 1.5rem;
}

.hero__presented span {
  padding-bottom: 0.35rem;
  border-bottom: 1px solid rgba(193, 160, 116, 0.4);
}

.hero__place {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.66rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--gold-400);
  margin-bottom: 1.1rem;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8.4vw, 6.4rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--gold-100);
}

.hero__title-line {
  display: block;
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 1.1s var(--ease) 0.15s, transform 1.1s var(--ease) 0.15s;
}

.hero__title-line--gold {
  color: var(--gold-300);
  transition-delay: 0.3s;
}

.hero.is-loaded .hero__title-line {
  opacity: 1;
  transform: none;
}

.hero__sub {
  margin-top: 1rem;
  font-size: clamp(0.66rem, 1.4vw, 0.78rem);
  letter-spacing: 0.44em;
  text-transform: uppercase;
  color: var(--gold-400);
}

.hero__sub i {
  font-style: normal;
  opacity: 0.45;
  margin-inline: 0.2em;
}

.hero__lead {
  margin-top: 1.35rem;
  max-width: 46ch;
  font-size: clamp(0.95rem, 1.4vw, 1.06rem);
  line-height: 1.75;
  color: rgba(241, 233, 219, 0.78);
  text-wrap: pretty;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

/* --- Stats -------------------------------------------------------------- */
.hero__stats {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid rgba(241, 233, 219, 0.16);
  padding-top: clamp(1rem, 2.4vw, 1.6rem);
  padding-bottom: clamp(1.4rem, 3vw, 2.2rem);
  gap: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  opacity: 0;
  transform: translateY(14px);
  animation: statIn 0.9s var(--ease) forwards;
  animation-delay: calc(0.55s + var(--i) * 0.1s);
}

@keyframes statIn {
  to {
    opacity: 1;
    transform: none;
  }
}

.stat__value {
  font-size: clamp(1.5rem, 3.2vw, 2.3rem);
  font-weight: 400;
  line-height: 1;
  color: var(--gold-200);
  letter-spacing: 0.02em;
}

.stat__value em {
  font-style: normal;
  font-size: 0.6em;
  color: var(--gold-500);
}

.stat__label {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.5);
  line-height: 1.4;
}

/* --- Scroll cue --------------------------------------------------------- */
.hero__scroll {
  position: absolute;
  right: clamp(1rem, 3vw, 2.6rem);
  bottom: 42%;
  z-index: 3;
  width: 1px;
  height: 62px;
  background: rgba(241, 233, 219, 0.18);
  overflow: hidden;
}

.hero__scroll span {
  position: absolute;
  inset: 0;
  background: var(--gold-400);
  transform-origin: top;
  animation: scrollCue 2.6s ease-in-out infinite;
}

@keyframes scrollCue {
  0% {
    transform: translateY(-100%);
  }
  55%,
  100% {
    transform: translateY(100%);
  }
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 900px) {
  .hero {
    min-height: calc(100svh - 0px);
    padding-top: calc(var(--nav-h) + 2rem);
  }

  .hero__img {
    object-position: 56% 46%;
  }

  .hero__lead {
    max-width: 40ch;
  }

  .hero__scroll {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero {
    justify-content: flex-end;
    padding-top: calc(var(--nav-h) + 4.2rem);
    min-height: calc(100svh - 62px);
  }

  .hero__presented {
    margin-bottom: 1.1rem;
  }

  .hero__title {
    font-size: clamp(2.1rem, 11.5vw, 3.2rem);
    letter-spacing: 0.06em;
  }

  .hero__lead {
    font-size: 0.92rem;
    max-width: 34ch;
  }

  .hero__cta {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 1.6rem;
  }

  .hero__cta .btn {
    width: 100%;
  }

  .hero__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.1rem 0.8rem;
    padding-bottom: calc(1.2rem + env(safe-area-inset-bottom));
  }

  .stat__label {
    font-size: 0.55rem;
    letter-spacing: 0.16em;
  }

  .hero__grain {
    background-size: 560px auto;
    background-position: 60% 22%;
    opacity: 0.1;
  }
}

@media (max-width: 380px) {
  .hero {
    padding-top: calc(var(--nav-h) + 2.2rem);
  }

  .hero__presented {
    margin-bottom: 0.85rem;
  }

  .hero__title {
    font-size: clamp(1.85rem, 10.4vw, 2.5rem);
  }

  .hero__sub {
    letter-spacing: 0.3em;
    font-size: 0.6rem;
  }

  .hero__lead {
    margin-top: 1rem;
    font-size: 0.86rem;
    line-height: 1.65;
  }

  .hero__cta {
    margin-top: 1.2rem;
    gap: 0.55rem;
  }

  .hero__stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.8rem 0.4rem;
    padding-top: 0.8rem;
  }

  .stat__value {
    font-size: 1.25rem;
  }

  .stat__label {
    font-size: 0.46rem;
    letter-spacing: 0.1em;
    line-height: 1.35;
  }
}
</style>
