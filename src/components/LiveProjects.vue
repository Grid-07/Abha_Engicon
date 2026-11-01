<script setup>
import { asset } from '../utils/asset'
import { live } from '../data/company'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section id="live" class="live section">
    <div class="shell">
      <header class="live__head">
        <div v-reveal>
          <span class="eyebrow">Now selling</span>
          <h2 class="live__title">Two addresses, open today.</h2>
        </div>
        <p class="lede live__lede" v-reveal="80">
          Both are in Biharsharif, both low-rise, both built to the same specification. Each has its
          own site — floor plans, unit areas, walkthroughs and the sales desk.
        </p>
      </header>

      <div class="live__list">
        <article
          v-for="(p, i) in live"
          :key="p.slug"
          class="dev"
          :class="{ 'dev--flip': i % 2 === 1 }"
          v-reveal="i * 90"
        >
          <a
            class="dev__media"
            :href="p.href"
            target="_blank"
            rel="noopener"
            :aria-label="`Open the ${p.name} website`"
          >
            <img :src="asset(p.image)" :alt="`${p.name} — building elevation`" loading="lazy" decoding="async" />
            <span class="dev__open">
              View site
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

            <a class="dev__cta" :href="p.href" target="_blank" rel="noopener">
              Visit the {{ p.name }} site
              <AppIcon name="arrow-up-right" :size="14" />
            </a>
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

.dev__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  align-self: flex-start;
  margin-top: 1.5rem;
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
  transform: translate(2px, -2px);
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

  .dev__cta {
    width: 100%;
    justify-content: space-between;
    padding: 0.95rem 0;
    border-bottom: 1px solid var(--line);
  }
}
</style>
