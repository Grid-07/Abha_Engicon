<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { asset } from '../utils/asset'
import { brand, live } from '../data/company'
import flagship from '../data/flagship.json'
import AppIcon from './AppIcon.vue'

const flagshipProject = live[0]

const heroEl = ref(null)
const videoEl = ref(null)
const videoOn = ref(false)
const videoReady = ref(false)
const videoSrc = ref('')
const posterSrc = ref('')

const playing = ref(false)
const progress = ref(0)
const duration = ref(0)
const cinema = ref(false)
const scrubbing = ref(false)

let allowAutoplay = true
let observer = null

const clock = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
}
const elapsed = computed(() => clock(progress.value * duration.value))
const total = computed(() => clock(duration.value))

function onCanPlay(e) {
  videoReady.value = true
  duration.value = e.target.duration || 0
  if (allowAutoplay) e.target.play().catch(() => {})
}

// The loop is cut from 8s into the film and the poster is frame 11s, so a film
// sitting at 0 shows the wrong moment — which is exactly what a visitor with
// reduced motion sees, since their film starts paused. Park it on the poster.
const POSTER_OFFSET = 3
let parked = false

function onMeta(e) {
  const v = e.target
  duration.value = v.duration || 0
  if (parked || !v.duration || v.duration < POSTER_OFFSET + 2) return
  parked = true
  v.currentTime = POSTER_OFFSET
}

function toggle() {
  const v = videoEl.value
  if (!v) return
  if (v.paused) v.play().catch(() => {})
  else v.pause()
}

function onTime() {
  const v = videoEl.value
  if (!v || scrubbing.value) return
  duration.value = v.duration || duration.value
  progress.value = v.currentTime / (v.duration || 1)
}

/* --- scrubbing ------------------------------------------------------------ */
function seekTo(clientX, track) {
  const v = videoEl.value
  if (!v || !v.duration) return
  const box = track.getBoundingClientRect()
  const ratio = Math.min(1, Math.max(0, (clientX - box.left) / box.width))
  v.currentTime = ratio * v.duration
  progress.value = ratio
}

function onTrackDown(e) {
  scrubbing.value = true
  seekTo(e.clientX, e.currentTarget)
  e.currentTarget.setPointerCapture?.(e.pointerId)
}

function onTrackMove(e) {
  if (scrubbing.value) seekTo(e.clientX, e.currentTarget)
}

function onTrackUp(e) {
  scrubbing.value = false
  e.currentTarget.releasePointerCapture?.(e.pointerId)
}

function onTrackKey(e) {
  const v = videoEl.value
  if (!v || !v.duration) return
  const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!step) return
  e.preventDefault()
  v.currentTime = Math.min(v.duration, Math.max(0, v.currentTime + step))
  onTime()
}

/* --- focus mode ----------------------------------------------------------- */
function toggleCinema() {
  cinema.value = !cinema.value
}

function onKey(e) {
  if (e.key === 'Escape' && cinema.value) cinema.value = false
}

// Focus mode is a place, not a state: the page holds still and the bar flips to
// sand-on-ink, because the film is now edge to edge.
watch(cinema, (on) => {
  document.body.classList.toggle('hero-cinema', on)
  document.body.style.overflow = on ? 'hidden' : ''
  window.dispatchEvent(new Event('abha:nav'))
})

/* A click on the film itself is the play/pause button — except on real controls. */
function onHeroClick(e) {
  if (!videoOn.value) return
  if (e.target.closest('a, button, [role="slider"]')) return
  toggle()
}

onMounted(() => {
  const phone = window.matchMedia('(max-width: 760px)').matches
  posterSrc.value = asset(
    phone && flagship.heroPosterMobile ? flagship.heroPosterMobile : flagship.heroPoster || ''
  )

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = navigator.connection
  const saveData = conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))

  // A reduced-motion or metered visitor still gets the film — they just have to
  // ask for it. That keeps the hero interactive instead of silently dead.
  allowAutoplay = !reduce && !saveData

  const src = phone ? flagship.heroLoopMobile : flagship.heroLoop
  if (src) {
    videoSrc.value = asset(src)
    videoOn.value = true
  }

  window.addEventListener('keydown', onKey)

  // Do not decode twelve seconds of film that nobody is looking at.
  observer = new IntersectionObserver(
    ([entry]) => {
      const v = videoEl.value
      if (!v) return
      if (!entry.isIntersecting) v.pause()
      else if (allowAutoplay) v.play().catch(() => {})
    },
    { threshold: 0.25 }
  )
  if (heroEl.value) observer.observe(heroEl.value)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  observer?.disconnect()
  document.body.classList.remove('hero-cinema')
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="top" ref="heroEl" class="hero" :class="{ 'is-cinema': cinema }" @click="onHeroClick">
    <div class="hero__media" aria-hidden="true">
      <img v-if="posterSrc" :src="posterSrc" alt="" class="hero__poster" fetchpriority="high" />
      <video
        v-if="videoOn"
        ref="videoEl"
        class="hero__video"
        :class="{ 'is-ready': videoReady }"
        :src="videoSrc"
        :poster="posterSrc"
        muted
        loop
        playsinline
        preload="auto"
        disablepictureinpicture
        @canplay="onCanPlay"
        @play="playing = true"
        @pause="playing = false"
        @timeupdate="onTime"
        @loadedmetadata="onMeta"
        @error="videoOn = false"
      ></video>
    </div>
    <div class="hero__veil" aria-hidden="true"></div>

    <div class="hero__inner shell">
      <h1 class="hero__mark">
        <img
          class="hero__logo"
          :src="asset('images/brand/logo-ink.png')"
          alt="Abha Engicon"
          width="581"
          height="233"
        />
      </h1>

      <div class="hero__rule" aria-hidden="true"></div>

      <p class="hero__line">{{ brand.tagline }}</p>
      <p class="hero__intro">{{ brand.intro }}</p>

      <div class="hero__actions">
        <a href="#projects" class="btn">
          Explore the portfolio
          <AppIcon name="arrow-right" />
        </a>
        <a href="#contact" class="btn btn--ghost">Book a site visit</a>
      </div>
    </div>

    <!-- Paused state: the whole frame is the play button. -->
    <div v-if="videoOn && videoReady && !playing" class="hero__paused" aria-hidden="true">
      <span class="hero__paused-ring"><AppIcon name="play" :size="20" /></span>
      <span class="hero__paused-text">Play the film</span>
    </div>

    <div class="hero__strip">
      <a class="hero__credit" :href="flagshipProject.href">
        <span class="hero__dot" aria-hidden="true"></span>
        <span class="hero__credit-text">
          Filmed at <strong>{{ flagshipProject.name }}</strong> — our flagship address, now selling
        </span>
        <AppIcon name="arrow-up-right" :size="12" />
      </a>

      <div v-if="videoOn" class="hero__player">
        <button
          class="hero__pbtn"
          type="button"
          :aria-label="playing ? 'Pause the film' : 'Play the film'"
          @click="toggle"
        >
          <AppIcon :name="playing ? 'pause' : 'play'" :size="12" />
        </button>

        <div
          class="hero__track"
          role="slider"
          tabindex="0"
          aria-label="Film position"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="Math.round(progress * 100)"
          :aria-valuetext="`${elapsed} of ${total}`"
          @pointerdown="onTrackDown"
          @pointermove="onTrackMove"
          @pointerup="onTrackUp"
          @pointercancel="onTrackUp"
          @keydown="onTrackKey"
        >
          <span class="hero__track-base"></span>
          <span class="hero__track-fill" :style="{ transform: `scaleX(${progress})` }"></span>
          <span class="hero__track-knob" :style="{ left: `${progress * 100}%` }"></span>
        </div>

        <span class="hero__time"><b>{{ elapsed }}</b> / {{ total }}</span>

        <button
          class="hero__pbtn hero__pbtn--icon"
          type="button"
          :aria-label="cinema ? 'Leave focus mode' : 'Focus on the film'"
          :aria-pressed="cinema"
          @click="toggleCinema"
        >
          <AppIcon :name="cinema ? 'shrink' : 'expand'" :size="12" />
        </button>
      </div>

      <div v-else class="hero__cue">
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
  filter: saturate(1.05) contrast(1.04);
}

.hero__video.is-ready {
  opacity: 1;
}

/* The film is the hero, so the veil does the smallest possible job: a tight
   plate behind the wordmark, a wide whisper of warm paper to hold the thin
   serif against the sky, and a fade at the foot for the player bar. Everything
   outside the type block is left clear — that is the part worth looking at. */
.hero__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  transition: opacity 0.6s var(--ease);
  background:
    radial-gradient(
      48% 36% at 50% 42%,
      rgba(251, 247, 240, 0.92) 0%,
      rgba(251, 247, 240, 0.85) 40%,
      rgba(251, 247, 240, 0.46) 68%,
      rgba(251, 247, 240, 0) 88%
    ),
    radial-gradient(
      80% 58% at 50% 46%,
      rgba(251, 247, 240, 0.4) 0%,
      rgba(251, 247, 240, 0.14) 56%,
      rgba(251, 247, 240, 0) 76%
    ),
    linear-gradient(180deg, rgba(243, 235, 221, 0.66) 0%, rgba(231, 204, 164, 0) 15%),
    linear-gradient(0deg, rgba(251, 247, 240, 0.94) 0%, rgba(251, 247, 240, 0.4) 11%, rgba(231, 204, 164, 0) 30%);
}

/* --------------------------------------------------------------- inner --- */
.hero__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-block: clamp(2rem, 6vh, 4rem) clamp(1.5rem, 5vh, 3rem);
  transition: opacity 0.5s var(--ease), transform 0.6s var(--ease);
}

.hero__mark {
  margin: 0;
  display: flex;
  justify-content: center;
}

/* The company's own lockup: ABHA over ENGICON. It is 2.49:1, so the width
   is the only dimension worth setting -- every height is a width in
   disguise. The cream halo is the same one the type-set wordmark used. */
.hero__logo {
  display: block;
  width: clamp(300px, 62vw, 760px);
  height: auto;
  filter: drop-shadow(0 0 20px rgba(251, 247, 240, 0.9));
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
  /* A cream halo holds the thin serif against the facade without needing a
     heavier plate over the film. */
  text-shadow: 0 0 26px rgba(251, 247, 240, 0.95), 0 0 60px rgba(251, 247, 240, 0.7);
}

.hero__intro {
  margin-top: 0.9rem;
  font-size: clamp(0.88rem, 1.1vw, 0.98rem);
  line-height: 1.72;
  color: var(--ink-900);
  max-width: 40ch;
  text-wrap: balance;
  text-shadow: 0 0 14px rgba(251, 247, 240, 1), 0 0 34px rgba(251, 247, 240, 0.9);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
  margin-top: clamp(1.6rem, 4vh, 2.6rem);
}

/* Over footage the outline button needs a body of its own. */
.hero__actions .btn--ghost {
  background: rgba(251, 247, 240, 0.84);
  border-color: rgba(20, 20, 24, 0.16);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.hero__actions .btn--ghost:hover {
  background: var(--ink-900);
  color: var(--sand-100);
}

/* -------------------------------------------------------------- paused --- */
.hero__paused {
  position: absolute;
  left: 50%;
  bottom: 4.6rem;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.34rem 0.9rem 0.34rem 0.34rem;
  border-radius: 999px;
  border: 1px solid rgba(251, 247, 240, 0.4);
  background: rgba(16, 16, 20, 0.42);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--sand-100);
  pointer-events: none;
  animation: fadeIn 0.4s var(--ease) both;
}

.hero__paused-ring {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  padding-left: 2px;
  border: 1px solid rgba(251, 247, 240, 0.5);
}

.hero__paused-text {
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-indent: 0.22em;
  text-transform: uppercase;
  white-space: nowrap;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* --------------------------------------------------------------- strip --- */
.hero__strip {
  position: relative;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.85rem var(--gutter);
  border-top: 1px solid rgba(20, 20, 24, 0.14);
  background: rgba(251, 247, 240, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color 0.5s var(--ease), border-color 0.5s var(--ease);
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
  transition: color 0.35s var(--ease), opacity 0.4s var(--ease);
  min-width: 0;
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
  flex-shrink: 0;
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

/* -------------------------------------------------------------- player --- */
.hero__player {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  flex-shrink: 0;
}

.hero__pbtn {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(20, 20, 24, 0.22);
  color: var(--ink-900);
  background: transparent;
  flex-shrink: 0;
  transition: background-color 0.3s var(--ease), border-color 0.3s var(--ease), color 0.3s var(--ease);
}

.hero__pbtn:hover {
  background: var(--ink-900);
  border-color: var(--ink-900);
  color: var(--sand-100);
}

.hero__pbtn--icon {
  border-color: transparent;
}

.hero__track {
  position: relative;
  width: clamp(110px, 16vw, 220px);
  height: 28px;
  display: flex;
  align-items: center;
  cursor: pointer;
  touch-action: none;
}

.hero__track:focus-visible {
  outline: 1px solid var(--ink-900);
  outline-offset: 3px;
  border-radius: 2px;
}

.hero__track-base,
.hero__track-fill {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  border-radius: 2px;
}

.hero__track-base {
  background: rgba(20, 20, 24, 0.2);
}

.hero__track-fill {
  background: var(--ink-900);
  transform-origin: left center;
}

.hero__track-knob {
  position: absolute;
  top: 50%;
  width: 7px;
  height: 7px;
  margin-left: -3.5px;
  border-radius: 50%;
  background: var(--ink-900);
  transform: translateY(-50%);
  transition: transform 0.18s var(--ease);
}

.hero__track:hover .hero__track-knob {
  transform: translateY(-50%) scale(1.5);
}

.hero__time {
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--ink-500);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.hero__time b {
  font-weight: 500;
  color: var(--ink-900);
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

/* -------------------------------------------------------- focus mode --- */
.hero.is-cinema .hero__veil {
  opacity: 0;
}

.hero.is-cinema .hero__inner {
  opacity: 0;
  transform: translateY(14px);
  pointer-events: none;
}

.hero.is-cinema .hero__strip {
  background: rgba(16, 16, 20, 0.4);
  border-top-color: rgba(251, 247, 240, 0.14);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.hero.is-cinema .hero__credit {
  opacity: 0;
  pointer-events: none;
}

.hero.is-cinema .hero__pbtn {
  color: var(--sand-100);
  border-color: rgba(251, 247, 240, 0.3);
}

.hero.is-cinema .hero__pbtn:hover {
  background: var(--sand-100);
  border-color: var(--sand-100);
  color: var(--ink-900);
}

.hero.is-cinema .hero__pbtn--icon {
  border-color: transparent;
}

.hero.is-cinema .hero__track-base {
  background: rgba(251, 247, 240, 0.32);
}

.hero.is-cinema .hero__track-fill,
.hero.is-cinema .hero__track-knob {
  background: var(--sand-100);
}

.hero.is-cinema .hero__time {
  color: rgba(251, 247, 240, 0.62);
}

.hero.is-cinema .hero__time b {
  color: var(--sand-100);
}

@media (prefers-reduced-motion: reduce) {
  .hero__dot,
  .hero__cue svg,
  .hero__paused {
    animation: none;
  }

  .hero__video {
    transition: none;
  }
}

/* ------------------------------------------------------------ responsive --- */
@media (max-width: 900px) {
  .hero__veil {
    background:
      radial-gradient(
        62% 32% at 50% 40%,
        rgba(251, 247, 240, 0.92) 0%,
        rgba(251, 247, 240, 0.85) 40%,
        rgba(251, 247, 240, 0.44) 70%,
        rgba(251, 247, 240, 0) 90%
      ),
      radial-gradient(
        92% 52% at 50% 42%,
        rgba(251, 247, 240, 0.34) 0%,
        rgba(251, 247, 240, 0.1) 58%,
        rgba(251, 247, 240, 0) 78%
      ),
      linear-gradient(180deg, rgba(243, 235, 221, 0.64) 0%, rgba(231, 204, 164, 0) 14%),
      linear-gradient(0deg, rgba(251, 247, 240, 0.94) 0%, rgba(251, 247, 240, 0.42) 12%, rgba(231, 204, 164, 0) 32%);
  }
}

@media (max-width: 760px) {
  .hero {
    min-height: calc(100svh - 62px);
    justify-content: center;
  }

  .hero__logo {
    width: clamp(280px, 82vw, 460px);
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
    padding-block: 0.7rem;
  }

  /* The credit is decoration; on a phone the player is the point. */
  .hero__credit {
    display: none;
  }

  .hero__player {
    width: 100%;
    justify-content: space-between;
    gap: 0.55rem;
  }

  .hero__track {
    width: auto;
    flex: 1;
  }

  .hero__cue {
    display: none;
  }
}

@media (max-height: 700px) and (min-width: 761px) {
  .hero__logo {
    width: clamp(280px, 44vw, 560px);
  }

  .hero__intro {
    display: none;
  }
}
</style>
