<script setup>
/**
 * The lifted project banner.
 *
 * Rendered once at the root of the app, outside the group chrome, because the
 * whole point of the move is that it outlives the page it was lifted from:
 *
 *  - forward, the banner grows out of its slot to fill the screen, the route
 *    changes underneath it, and the cover is only taken away once the project
 *    page has actually painted its hero at the top of the document. The two
 *    images are the same photograph, so the hand-over reads as one continuous
 *    push into the project rather than a cut.
 *  - reverse, the same frame shrinks back onto the banner it came from.
 *
 * The state lives in data/handoff.js so that LiveProjects.vue can drive it
 * without owning it.
 */
import { watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { hand, handOpen, handGone, handLanded, phase, reset } from '../data/handoff'

const route = useRoute()

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let timers = []
const later = (fn, ms) => timers.push(setTimeout(fn, ms))
const clearTimers = () => {
  timers.forEach(clearTimeout)
  timers = []
}

let poll = 0
const stopPoll = () => {
  if (poll) cancelAnimationFrame(poll)
  poll = 0
}

/** Is the project's hero on screen and decoded? */
function heroReady() {
  const hero = document.querySelector('.hero')
  if (!hero) return false
  const img = hero.querySelector('img')
  if (!img) return false
  return img.complete && img.naturalWidth > 0
}

/**
 * Take the cover away. The scrim, veil and caption come off in a single frame
 * and the photo goes back to 1:1, so what is left is a full-bleed version of
 * the same picture the hero is already showing underneath — then it fades.
 */
function land() {
  handLanded.value = true
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      handGone.value = true
      later(reset, 340)
    }),
  )
}

function arrive() {
  clearTimers()
  if (reduced()) return land()

  const started = performance.now()
  const tick = () => {
    // The route change already put the document at the top; this waits for the
    // hero's own image, which is a different file from the banner and may
    // still be decoding. Bounded, so a slow network cannot strand the cover.
    if (heroReady() || performance.now() - started > 1200) return land()
    poll = requestAnimationFrame(tick)
  }
  poll = requestAnimationFrame(tick)
}

watch(
  () => route.meta.project,
  (now) => {
    if (!now || phase.value !== 'forward') return
    arrive()
  },
)

// Safety net: a cover that never leaves is worse than a missing transition.
watch(hand, (v) => {
  clearTimers()
  if (!v) return
  later(() => {
    if (!hand.value) return
    handGone.value = true
    later(reset, 340)
  }, 6000)
})

onUnmounted(() => {
  clearTimers()
  stopPoll()
})
</script>

<template>
  <!-- Teleported out of the app tree so the page behind it can be scaled and
       dimmed without dragging this fixed overlay along. -->
  <Teleport to="body">
    <div
      v-if="hand"
      class="hand"
      :class="{ 'is-open': handOpen, 'is-landed': handLanded, 'is-gone': handGone }"
      aria-hidden="true"
      :style="{
        '--hl': hand.rect.left + 'px',
        '--ht': hand.rect.top + 'px',
        '--hw': hand.rect.width + 'px',
        '--hh': hand.rect.height + 'px',
      }"
    >
      <div class="hand__scrim"></div>

      <div class="hand__frame">
        <img :src="hand.img" alt="" />
        <div class="hand__veil"></div>
        <div class="hand__caption">
          <span class="hand__eyebrow">Abha Engicon</span>
          <span class="hand__name">{{ hand.name }}</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* The banner, lifted out of the grid and pushed at the viewer: the frame grows
   to the viewport while the photograph zooms in, and the page dims behind it.
   The same transition runs backwards when the visitor comes back. */
.hand {
  position: fixed;
  inset: 0;
  z-index: 3000;
  pointer-events: auto;
  transition: opacity 0.26s var(--ease);
}

.hand.is-gone {
  opacity: 0;
}

.hand__scrim {
  position: absolute;
  inset: 0;
  background: rgba(20, 20, 24, 0.5);
  opacity: 0;
  transition: opacity 0.5s var(--ease);
}

.hand.is-open .hand__scrim {
  opacity: 1;
}

.hand__frame {
  position: fixed;
  left: var(--hl);
  top: var(--ht);
  width: var(--hw);
  height: var(--hh);
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--ink-900);
  transition:
    left 0.68s var(--ease-out),
    top 0.68s var(--ease-out),
    width 0.68s var(--ease-out),
    height 0.68s var(--ease-out),
    border-radius 0.68s var(--ease-out);
}

.hand.is-open .hand__frame {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.hand__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.72s var(--ease-out);
}

.hand.is-open .hand__frame img {
  transform: scale(1.09);
}

.hand__veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(20, 20, 24, 0.14) 0%, rgba(20, 20, 24, 0.6) 100%);
  opacity: 0;
  transition: opacity 0.5s var(--ease);
}

.hand.is-open .hand__veil {
  opacity: 1;
}

.hand__caption {
  position: absolute;
  inset: auto 0 0 0;
  display: grid;
  justify-items: center;
  gap: 0.7rem;
  padding: 0 var(--gutter) clamp(2.5rem, 9vh, 6rem);
  text-align: center;
  opacity: 0;
  transform: translateY(14px);
  /* Leaving: get out of the way fast, with no delay. */
  transition: opacity 0.26s var(--ease), transform 0.34s var(--ease);
}

.hand.is-open .hand__caption {
  opacity: 1;
  transform: none;
  /* Arriving: settle in after the frame has mostly opened. */
  transition: opacity 0.45s var(--ease) 0.14s, transform 0.6s var(--ease-out) 0.14s;
}

/* --------------------------------------------------------------- landing --- */
/* Arrived in the project: everything that made this a card cover comes off at
   once, with no transition of its own, so the only thing left on screen is the
   photograph the hero is already showing. The .hand opacity fade then hands
   over to it. */
.hand.is-landed .hand__scrim,
.hand.is-landed .hand__veil,
.hand.is-landed .hand__caption {
  opacity: 0;
  transition: none;
}

.hand.is-landed .hand__frame {
  border-radius: 0;
  transition: none;
}

.hand.is-landed .hand__frame img {
  transform: scale(1);
  transition: none;
}

.hand__eyebrow {
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.32em;
  text-indent: 0.32em;
  text-transform: uppercase;
  color: rgba(251, 247, 240, 0.6);
}

.hand__name {
  font-family: var(--display);
  font-size: clamp(1.9rem, 5vw, 3.6rem);
  font-weight: 300;
  line-height: 1.04;
  letter-spacing: 0.01em;
  color: var(--sand-50);
  text-wrap: balance;
}

@media (prefers-reduced-motion: reduce) {
  .hand,
  .hand__frame,
  .hand__frame img,
  .hand__veil,
  .hand__scrim,
  .hand__caption {
    transition: none;
  }
}
</style>
