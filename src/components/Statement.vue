<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { stats } from '../data/company'

const root = ref(null)
const shown = ref(stats.map(() => 0))
let io = null
let raf = 0

function run() {
  const start = performance.now()
  const dur = 1500
  const tick = (now) => {
    const t = Math.min(1, (now - start) / dur)
    const eased = 1 - Math.pow(1 - t, 3)
    shown.value = stats.map((s) => Math.round(s.value * eased))
    if (t < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    shown.value = stats.map((s) => s.value)
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        run()
        io.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  if (root.value) io.observe(root.value)
})

onUnmounted(() => {
  if (io) io.disconnect()
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <section class="stmt section--tight lattice" ref="root">
    <div class="shell">
      <p class="stmt__line" v-reveal>
        We build in Biharsharif and we build small —
        <em>fewer homes per floor, wider decks,</em>
        and a sales desk that answers the phone after handover.
      </p>

      <dl class="stmt__stats">
        <div v-for="(s, i) in stats" :key="s.label" class="stmt__stat" v-reveal="i * 70">
          <dd class="stmt__num">
            {{ shown[i] }}<span v-if="s.suffix" class="stmt__suffix">{{ s.suffix }}</span>
          </dd>
          <dt class="stmt__label">{{ s.label }}</dt>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.stmt {
  background: var(--sand-100);
  border-block: 1px solid var(--line-soft);
}

.stmt::before {
  opacity: 0.34;
}

.stmt .shell {
  display: grid;
  gap: clamp(2.4rem, 5vw, 3.6rem);
}

.stmt__line {
  font-family: var(--display);
  font-size: clamp(1.5rem, 3.2vw, 2.5rem);
  font-weight: 300;
  line-height: 1.32;
  letter-spacing: -0.012em;
  max-width: 24ch;
  color: var(--ink-800);
  text-wrap: balance;
}

.stmt__line em {
  font-style: italic;
  color: var(--ink-500);
}

.stmt__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding-top: clamp(1.6rem, 3vw, 2.2rem);
  border-top: 1px solid var(--line);
}

.stmt__stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stmt__num {
  font-family: var(--display);
  font-size: clamp(2.4rem, 4.4vw, 3.6rem);
  font-weight: 300;
  line-height: 0.92;
  color: var(--ink-900);
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: 'lnum' 1, 'tnum' 1;
}

.stmt__suffix {
  font-size: 0.6em;
  vertical-align: 0.15em;
  color: var(--ink-400);
}

.stmt__label {
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: var(--ink-500);
  line-height: 1.55;
  max-width: 20ch;
}

@media (max-width: 860px) {
  .stmt__stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .stmt__line {
    max-width: none;
  }
}
</style>
