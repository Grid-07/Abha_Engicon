<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { asset } from '../utils/asset'
import { live, counts, word } from '../data/company'
import { askAbout } from '../data/enquiry'
import {
  hand,
  handOpen,
  handGone,
  handLanded,
  phase,
  setReceding,
  remember,
  takePending,
} from '../data/handoff'
import AppIcon from './AppIcon.vue'

/**
 * Hand-off into a project, in both directions.
 *
 * Forward: clicking a banner pushes it — the card's photograph grows out of
 * its slot to fill the screen while the photo itself zooms in, and the rest of
 * the page dims and drifts back behind it. The route change happens underneath,
 * in this same document, so nothing ever goes blank. The cover itself is
 * rendered by HandOff.vue at the root, because this component is unmounted by
 * that route change and the cover has to survive it.
 *
 * Back: returning to this page remounts the component, which finds the project
 * remembered in sessionStorage and plays the same move in reverse — the cover
 * shrinks back onto the card it came from. That works for the project's own
 * "back to Abha" link and for the browser's Back button alike, because both
 * end up here with the record still in place.
 */

const router = useRouter()

let timers = []
const later = (fn, ms) => timers.push(setTimeout(fn, ms))
const clearTimers = () => {
  timers.forEach(clearTimeout)
  timers = []
}

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const viewportRect = () => ({
  left: 0,
  top: 0,
  width: window.innerWidth,
  height: window.innerHeight,
})

function rectOf(el) {
  const r = el.getBoundingClientRect()
  return { left: r.left, top: r.top, width: r.width, height: r.height }
}

function cardMedia(slug) {
  const card = document.querySelector(`.dev[data-slug="${slug}"]`)
  return card ? card.querySelector('.dev__media') : null
}

/* ---------------------------------------------------------------- forward --- */
function handoffTo(ev, p) {
  // Never hijack a new-tab / new-window intent.
  if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button === 1) return
  ev.preventDefault()
  if (hand.value) return

  clearTimers()
  const media = cardMedia(p.slug)

  phase.value = 'forward'
  handLanded.value = false
  handGone.value = false
  handOpen.value = false
  hand.value = { name: p.name, img: asset(p.image), rect: media ? rectOf(media) : viewportRect() }
  setReceding(true)

  // Remember the destination — and where on this page the visitor was — so
  // Back can play the same move in reverse.
  remember(p.slug)

  requestAnimationFrame(() => requestAnimationFrame(() => (handOpen.value = true)))

  // The cover is opaque by now, so the swap underneath is invisible. A lazy
  // route chunk can take a moment to arrive on a cold visit; if it does, the
  // cover simply stays up a little longer, which reads as the push continuing
  // rather than as a stall.
  later(() => router.push(p.route), reduced() ? 0 : 720)
}

/* ---------------------------------------------------------------- reverse --- */
let reversing = false

function startReverse(pending) {
  const p = live.find((x) => x.slug === pending.slug)
  if (!p || reversing) return
  reversing = true
  clearTimers()

  // The restore has to be instant. `html { scroll-behavior: smooth }` would
  // otherwise glide the page back over ~700ms while the cover is already
  // shrinking, and the shrink would land a hundred-odd pixels above the card.
  document.documentElement.style.scrollBehavior = 'auto'
  if (typeof pending.y === 'number') window.scrollTo({ top: pending.y, behavior: 'instant' })

  // Cover the page in its expanded state straight away, so the visitor never
  // sees a flash of the parent before the move begins…
  phase.value = 'reverse'
  handLanded.value = false
  handGone.value = false
  hand.value = { name: p.name, img: asset(p.image), rect: viewportRect() }
  handOpen.value = true
  setReceding(true)

  // …then let layout settle and shrink it back onto the card it came from.
  waitForScrollSettle(() => {
    const media = cardMedia(pending.slug)
    const rect = media ? rectOf(media) : null
    const onScreen = rect && rect.top < window.innerHeight - 40 && rect.top + rect.height > 40

    // If the visitor came back to a different part of the page, there is no
    // card to shrink onto — fade the cover instead of flying off to a corner.
    if (!onScreen) {
      setReceding(false)
      handOpen.value = false
      finishReverse(reduced() ? 0 : 340)
      return
    }

    hand.value = { ...hand.value, rect }
    requestAnimationFrame(() => {
      handOpen.value = false
      setReceding(false)
    })
    finishReverse(reduced() ? 0 : 700)
  })
}

function finishReverse(delay) {
  later(() => {
    handGone.value = true
    later(() => {
      hand.value = null
      handOpen.value = false
      handGone.value = false
      handLanded.value = false
      phase.value = null
      reversing = false
      // Hand scrolling back to the stylesheet and the browser.
      document.documentElement.style.scrollBehavior = ''
      if ('scrollRestoration' in history) history.scrollRestoration = 'auto'
    }, 280)
  }, delay)
}

function waitForScrollSettle(cb) {
  let last = window.scrollY
  let stable = 0
  let frames = 0
  const tick = () => {
    frames += 1
    if (window.scrollY === last) stable += 1
    else {
      stable = 0
      last = window.scrollY
    }
    // A few still frames, or give up after ~1s and use whatever we have.
    if ((stable > 2 && frames > 3) || frames > 60) cb()
    else requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

function onPageShow(e) {
  // Restored from the back/forward cache: the old cover is still mounted, so
  // tear the state down before replaying the move.
  if (!e.persisted) return
  clearTimers()
  reversing = false
  hand.value = null
  handOpen.value = false
  handGone.value = false
  handLanded.value = false
  setReceding(false)
  const pending = takePending()
  if (pending) requestAnimationFrame(() => startReverse(pending))
  else {
    document.documentElement.style.scrollBehavior = ''
    if ('scrollRestoration' in history) history.scrollRestoration = 'auto'
  }
}

onMounted(() => {
  window.addEventListener('pageshow', onPageShow)
  const pending = takePending()
  if (pending) requestAnimationFrame(() => startReverse(pending))
  else {
    // No pending hand-off: give smooth scrolling straight back.
    document.documentElement.style.scrollBehavior = ''
    if ('scrollRestoration' in history) history.scrollRestoration = 'auto'
  }
})

onUnmounted(() => {
  window.removeEventListener('pageshow', onPageShow)
  // Not setReceding(false): a forward hand-off is mid-flight right now and
  // HandOff.vue owns the cover until the project page has taken over.
  clearTimers()
})
</script>

<template>
  <section id="projects" class="live section">
    <div class="shell">
      <header class="live__head">
        <div v-reveal>
          <span class="eyebrow">Now selling · {{ counts.live }} live</span>
          <h2 class="live__title">{{ word(counts.live) }} addresses, open today.</h2>
        </div>
        <p class="lede live__lede" v-reveal="80">
          Every one is in Biharsharif, low-rise and built to the same specification. Each has its
          own section of this site — floor plans, unit areas, walkthroughs and the sales desk.
        </p>
      </header>

      <div class="live__list">
        <article
          v-for="(p, i) in live"
          :key="p.slug"
          class="dev"
          :class="{ 'dev--flip': i % 2 === 1 }"
          :data-slug="p.slug"
          v-reveal="i * 90"
        >
          <a
            class="dev__media"
            :href="p.route"
            :aria-label="`Open ${p.name}`"
            @click="handoffTo($event, p)"
          >
            <img :src="asset(p.image)" :alt="`${p.name} — building elevation`" loading="lazy" decoding="async" />
            <span class="dev__open">
              Open project
              <AppIcon name="arrow-up-right" :size="13" />
            </span>
          </a>

          <div class="dev__body">
            <div class="dev__top">
              <span class="dev__num">0{{ i + 1 }}</span>
              <span class="dev__status">
                <i class="dot" aria-hidden="true"></i>
                {{ p.status }}
              </span>
            </div>

            <h3 class="dev__name">{{ p.name }}</h3>
            <p class="dev__loc">{{ p.location }}</p>
            <p class="dev__line">{{ p.line }}</p>

            <dl class="dev__facts">
              <div v-for="[v, k] in p.facts" :key="k" class="dev__fact">
                <dt>{{ k }}</dt>
                <dd>{{ v }}</dd>
              </div>
            </dl>

            <div class="dev__actions">
              <a class="dev__cta" :href="p.route" @click="handoffTo($event, p)">
                Explore {{ p.name }}
                <AppIcon name="arrow-right" :size="14" />
              </a>
              <button class="dev__ask" type="button" @click="askAbout(p.name)">
                Enquire about this
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.live {
  background: var(--sand-50);
}

.live__head {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: end;
  padding-bottom: clamp(2.4rem, 5vw, 4rem);
  border-bottom: 1px solid var(--line);
}

.live__title {
  margin-top: 1.1rem;
  max-width: 14ch;
}

.live__lede {
  max-width: 42ch;
  padding-bottom: 0.4rem;
}

.live__list {
  display: grid;
  gap: clamp(3.2rem, 7vw, 6rem);
  margin-top: clamp(2.6rem, 6vw, 4.5rem);
}

/* -------------------------------------------------------------- device --- */
.dev {
  display: grid;
  grid-template-columns: 1.22fr 1fr;
  gap: clamp(1.4rem, 4vw, 3.6rem);
  align-items: center;
}

.dev--flip .dev__media {
  order: 2;
}

.dev__media {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: var(--radius-lg);
  aspect-ratio: 16 / 10;
  background: var(--sand-150);
}

.dev__media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(20, 20, 24, 0) 55%, rgba(20, 20, 24, 0.42) 100%);
  opacity: 0;
  transition: opacity 0.55s var(--ease);
}

.dev__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.15s var(--ease-out), filter 0.6s var(--ease);
}

.dev__media:hover img {
  transform: scale(1.045);
}

.dev__media:hover::after {
  opacity: 1;
}

.dev__open {
  position: absolute;
  left: 1.1rem;
  bottom: 1.1rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  background: var(--sand-50);
  color: var(--ink-900);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.45s var(--ease), transform 0.45s var(--ease-out);
}

.dev__media:hover .dev__open,
.dev__media:focus-visible .dev__open {
  opacity: 1;
  transform: none;
}

/* ---------------------------------------------------------------- body --- */
.dev__body {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  max-width: 30rem;
}

.dev__top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.dev__num {
  font-family: var(--display);
  font-size: 0.95rem;
  color: var(--ink-400);
  letter-spacing: 0.08em;
}

.dev__status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-600);
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #6f7d4f;
  box-shadow: 0 0 0 0 rgba(111, 125, 79, 0.5);
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

.dev__name {
  font-size: clamp(1.9rem, 3.4vw, 2.9rem);
  line-height: 1.02;
}

.dev__loc {
  font-size: 0.64rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-400);
}

.dev__line {
  margin-top: 0.55rem;
  font-size: 0.97rem;
  line-height: 1.72;
  color: var(--ink-500);
}

.dev__facts {
  display: flex;
  gap: clamp(1.4rem, 3vw, 2.6rem);
  margin-top: 1.4rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--line);
}

.dev__fact {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.18rem;
}

.dev__fact dt {
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-400);
}

.dev__fact dd {
  font-family: var(--display);
  font-size: 1.75rem;
  line-height: 1;
  color: var(--ink-900);
  font-variant-numeric: lining-nums;
  font-feature-settings: 'lnum' 1;
}

.dev__actions {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.dev__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--ink-900);
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: gap 0.4s var(--ease);
}

.dev__cta:hover {
  gap: 0.9rem;
}

.dev__cta svg {
  transition: transform 0.4s var(--ease);
}

.dev__cta:hover svg {
  transform: translateX(2px);
}

.dev__ask {
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-400);
  padding-bottom: 0.3rem;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: color 0.35s var(--ease), border-color 0.35s var(--ease);
}

.dev__ask:hover {
  color: var(--ink-900);
  border-color: var(--line);
}

/* ------------------------------------------------------------ responsive --- */
@media (max-width: 900px) {
  .live__head {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 1.2rem;
  }

  .live__title {
    max-width: 18ch;
  }

  .dev,
  .dev--flip {
    grid-template-columns: 1fr;
    gap: 1.4rem;
  }

  .dev--flip .dev__media {
    order: 0;
  }

  .dev__media {
    aspect-ratio: 16 / 11;
  }

  .dev__body {
    max-width: none;
  }
}

@media (max-width: 760px) {
  .dev__media {
    aspect-ratio: 4 / 3;
  }

  .dev__open {
    opacity: 1;
    transform: none;
    left: 0.8rem;
    bottom: 0.8rem;
    padding: 0.45rem 0.8rem;
    font-size: 0.53rem;
  }

  .dev__facts {
    gap: 1.4rem;
  }

  .dev__fact dd {
    font-size: 1.5rem;
  }

  .dev__actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    margin-top: 1.2rem;
  }

  .dev__cta {
    width: 100%;
    justify-content: space-between;
    padding: 0.9rem 0;
    border-bottom: 1px solid var(--line);
  }

  .dev__ask {
    width: 100%;
    text-align: left;
    padding: 0.9rem 0;
    border-bottom: 1px solid var(--line);
  }
}
</style>
