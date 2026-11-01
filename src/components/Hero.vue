<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { asset } from '../utils/asset'
import { brand, live } from '../data/company'
import flagship from '../data/flagship.json'
import AppIcon from './AppIcon.vue'

const flagshipProject = live[0]

const videoOn = ref(false)
const videoReady = ref(false)
const videoSrc = ref('')
const posterSrc = ref('')

onMounted(() => {
  const phone = window.matchMedia('(max-width: 760px)').matches
  posterSrc.value = asset(
    phone && flagship.heroPosterMobile ? flagship.heroPosterMobile : flagship.heroPoster || ''
  )

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = navigator.connection
  const saveData = conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))

  if (reduce || saveData || !flagship.available) return

  const src = phone ? flagship.heroLoopMobile : flagship.heroLoop
  if (src) {
    videoSrc.value = asset(src)
    videoOn.value = true
  }
})

function onCanPlay(e) {
  videoReady.value = true
  e.target.play().catch(() => {})
}
</script>

<template>
  <section class="hero">
    <div class="hero__media" aria-hidden="true">
      <img v-if="posterSrc" :src="posterSrc" alt="" class="hero__poster" fetchpriority="high" />
      <video
        v-if="videoOn"
        class="hero__video"
        :class="{ 'is-ready': videoReady }"
        :src="videoSrc"
        :poster="posterSrc"
        muted
        loop
        autoplay
        playsinline
        preload="auto"
        disablepictureinpicture
        @canplay="onCanPlay"
        @error="videoOn = false"
      ></video>
    </div>
    <div class="hero__veil" aria-hidden="true"></div>

    <div class="hero__inner shell">
      <img
        :src="asset('images/brand/emblem-ink.png')"
        alt=""
        class="hero__emblem"
        width="419"
        height="460"
        aria-hidden="true"
      />

      <h1 class="hero__mark">
        <span class="hero__abha">ABHA</span>
        <span class="hero__engicon">ENGICON</span>
      </h1>

      <div class="hero__rule" aria-hidden="true"></div>

      <p class="hero__line">{{ brand.tagline }}</p>
      <p class="hero__intro">{{ brand.intro }}</p>

      <div class="hero__actions">
        <router-link to="/projects" class="btn">
          Explore the portfolio
          <AppIcon name="arrow-right" />
        </router-link>
        <router-link to="/contact" class="btn btn--ghost">Book a site visit</router-link>
      </div>
    </div>

    <div class="hero__strip">
      <a
        class="hero__credit"
        :href="flagshipProject.href"
        target="_blank"
        rel="noopener"
      >
        <span class="hero__dot" aria-hidden="true"></span>
        <span class="hero__credit-text">
          Filmed at <strong>{{ flagshipProject.name }}</strong> — our flagship address, now selling
        </span>
        <AppIcon name="arrow-up-right" :size="12" />
      </a>

      <div class="hero__cue">
        <span>Scroll</span>
        <AppIcon name="arrow-down" :size="13" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: var(--nav-h);
  overflow: hidden;
  background: var(--sand-200);
  isolation: isolate;
}

/* ---------------------------------------------------------------- media --- */
.hero__media {
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
}

.hero__poster,
.hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
}

.hero__video {
  opacity: 0;
  transition: opacity 1.1s var(--ease);
}

.hero__video.is-ready {
  opacity: 1;
}

/* A warm sand wash keeps the ink wordmark readable while the film stays
   visible as movement. Strongest behind the type, fading to cream at the foot
   so the strip blends into the page. */
.hero__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(
      180deg,
      rgba(243, 235, 221, 0.9) 0%,
      rgba(231, 204, 164, 0.76) 22%,
      rgba(231, 204, 164, 0.68) 55%,
      rgba(251, 247, 240, 0.96) 100%
    ),
    radial-gradient(82% 68% at 50% 48%, rgba(243, 235, 221, 0.66) 0%, rgba(243, 235, 221, 0) 74%);
}

/* --------------------------------------------------------------- inner --- */
.hero__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-block: clamp(2rem, 6vh, 4rem) clamp(1.5rem, 5vh, 3rem);
}

.hero__emblem {
  width: clamp(34px, 4.2vw, 52px);
  height: auto;
  margin-bottom: clamp(1.1rem, 3vh, 1.8rem);
  opacity: 0.92;
}

.hero__mark {
  display: grid;
  justify-items: center;
  gap: clamp(0.4rem, 1.2vw, 0.8rem);
  margin: 0;
}

.hero__abha {
  font-family: var(--display);
  font-size: clamp(4.4rem, 17vw, 15rem);
  font-weight: 300;
  line-height: 0.82;
  letter-spacing: 0.03em;
  text-indent: 0.03em;
  color: var(--ink-900);
}

.hero__engicon {
  font-family: var(--ui);
  font-size: clamp(0.62rem, 1.5vw, 1.05rem);
  font-weight: 500;
  letter-spacing: 0.78em;
  text-indent: 0.78em;
  text-transform: uppercase;
  color: var(--ink-800);
}

.hero__rule {
  width: clamp(52px, 7vw, 84px);
  height: 1px;
  background: var(--ink-900);
  opacity: 0.4;
  margin-block: clamp(1.4rem, 3.6vh, 2.4rem);
}

.hero__line {
  font-family: var(--display);
  font-size: clamp(1.28rem, 2.5vw, 1.95rem);
  font-weight: 400;
  letter-spacing: -0.005em;
  color: var(--ink-900);
  max-width: 44ch;
  text-wrap: balance;
}

.hero__intro {
  margin-top: 0.9rem;
  font-size: clamp(0.88rem, 1.1vw, 0.98rem);
  line-height: 1.72;
  color: var(--ink-700);
  max-width: 46ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
  margin-top: clamp(1.6rem, 4vh, 2.6rem);
}

/* --------------------------------------------------------------- strip --- */
.hero__strip {
  position: relative;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.95rem var(--gutter);
  border-top: 1px solid rgba(20, 20, 24, 0.14);
  background: rgba(251, 247, 240, 0.72);
  backdrop-filter: blur(10px);
}

.hero__credit {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-600);
  transition: color 0.35s var(--ease);
}

.hero__credit:hover {
  color: var(--ink-900);
}

.hero__credit strong {
  font-weight: 500;
  color: var(--ink-900);
}

.hero__credit svg {
  opacity: 0.6;
  transition: transform 0.35s var(--ease);
}

.hero__credit:hover svg {
  transform: translate(2px, -2px);
}

.hero__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #6f7d4f;
  flex-shrink: 0;
  animation: pulse 2.6s var(--ease) infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(111, 125, 79, 0.45);
  }
  70% {
    box-shadow: 0 0 0 7px rgba(111, 125, 79, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(111, 125, 79, 0);
  }
}

.hero__cue {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.55rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--ink-500);
  flex-shrink: 0;
}

.hero__cue svg {
  animation: nudge 2.4s var(--ease) infinite;
}

@keyframes nudge {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__dot,
  .hero__cue svg {
    animation: none;
  }
}

/* ------------------------------------------------------------ responsive --- */
@media (max-width: 900px) {
  .hero__veil {
    background:
      linear-gradient(
        180deg,
        rgba(243, 235, 221, 0.92) 0%,
        rgba(231, 204, 164, 0.8) 26%,
        rgba(231, 204, 164, 0.74) 58%,
        rgba(251, 247, 240, 0.97) 100%
      ),
      radial-gradient(80% 60% at 50% 38%, rgba(243, 235, 221, 0.66) 0%, rgba(243, 235, 221, 0) 74%);
  }
}

@media (max-width: 760px) {
  .hero {
    min-height: calc(100svh - 62px);
    justify-content: center;
  }

  .hero__abha {
    font-size: clamp(3.9rem, 22vw, 6.4rem);
  }

  .hero__engicon {
    letter-spacing: 0.6em;
    text-indent: 0.6em;
  }

  .hero__intro {
    font-size: 0.86rem;
    max-width: 34ch;
  }

  .hero__actions {
    width: 100%;
    flex-direction: column;
  }

  .hero__actions .btn {
    width: 100%;
  }

  .hero__strip {
    justify-content: center;
    padding-block: 0.8rem;
  }

  .hero__credit {
    font-size: 0.53rem;
    letter-spacing: 0.1em;
    text-align: center;
    line-height: 1.6;
  }

  .hero__dot,
  .hero__credit svg {
    display: none;
  }

  .hero__cue {
    display: none;
  }
}

@media (max-height: 700px) and (min-width: 761px) {
  .hero__emblem {
    display: none;
  }

  .hero__abha {
    font-size: clamp(3.4rem, 11vw, 7.5rem);
  }

  .hero__intro {
    display: none;
  }
}
</style>
