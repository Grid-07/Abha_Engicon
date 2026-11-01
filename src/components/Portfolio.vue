<script setup>
import { ref } from 'vue'
import { asset } from '../utils/asset'
import { delivered } from '../data/company'
import Lightbox from './Lightbox.vue'

const active = ref(null)

function open(p) {
  active.value = p
}
</script>

<template>
  <section id="portfolio" class="folio section" data-nav="dark">
    <div class="shell">
      <header class="folio__head">
        <div v-reveal>
          <span class="eyebrow folio__eyebrow">Delivered</span>
          <h2 class="folio__title">Ten addresses, already lived in.</h2>
        </div>
        <p class="folio__lede" v-reveal="80">
          Every project below has been handed over. They are the reason the two open today can be
          judged on a record rather than a promise.
        </p>
      </header>

      <ul class="folio__grid">
        <li v-for="(p, i) in delivered" :key="p.name" class="card" v-reveal="Math.min(i * 45, 320)">
          <button class="card__btn" @click="open(p)" :aria-label="`View ${p.name}`">
            <span class="card__media">
              <img :src="asset(p.image)" :alt="`${p.name} — completed development`" loading="lazy" decoding="async" />
              <span class="card__plus" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.4">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </span>
            <span class="card__foot">
              <span class="card__name">{{ p.name }}</span>
              <span class="card__note">{{ p.note }}</span>
            </span>
          </button>
        </li>
      </ul>
    </div>

    <Lightbox
      :open="!!active"
      :src="active ? asset(active.image) : ''"
      :caption="active ? active.name : ''"
      :sub="active ? active.note : ''"
      @close="active = null"
    />
  </section>
</template>

<style scoped>
.folio {
  position: relative;
  background: var(--ink-900);
  color: var(--sand-100);
  overflow: hidden;
}

.folio::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(90deg, rgba(243, 235, 221, 0.05) 1px, transparent 1px),
    linear-gradient(180deg, rgba(243, 235, 221, 0.05) 1px, transparent 1px);
  background-size: 96px 96px;
  mask-image: radial-gradient(90% 70% at 50% 30%, #000 0%, transparent 78%);
  -webkit-mask-image: radial-gradient(90% 70% at 50% 30%, #000 0%, transparent 78%);
  pointer-events: none;
}

.folio .shell {
  position: relative;
}

.folio__head {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: end;
  padding-bottom: clamp(2.2rem, 4.5vw, 3.4rem);
  border-bottom: 1px solid var(--line-invert);
}

.folio__eyebrow {
  color: rgba(243, 235, 221, 0.55);
}

.folio__title {
  margin-top: 1.1rem;
  max-width: 15ch;
  color: var(--sand-50);
}

.folio__lede {
  font-size: 0.97rem;
  line-height: 1.75;
  color: rgba(243, 235, 221, 0.6);
  max-width: 40ch;
  padding-bottom: 0.3rem;
}

/* ---------------------------------------------------------------- grid --- */
.folio__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1.4rem, 3vw, 2.6rem) clamp(1rem, 2.2vw, 1.8rem);
  margin-top: clamp(2.2rem, 5vw, 3.6rem);
}

.card__btn {
  display: block;
  width: 100%;
  text-align: left;
  color: inherit;
}

.card__media {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 3 / 2;
  background: var(--ink-800);
  border: 1px solid rgba(243, 235, 221, 0.1);
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.1s var(--ease-out), opacity 0.5s var(--ease);
  opacity: 0.94;
}

.card__btn:hover .card__media img {
  transform: scale(1.05);
  opacity: 1;
}

.card__plus {
  position: absolute;
  right: 0.7rem;
  top: 0.7rem;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(20, 20, 24, 0.55);
  border: 1px solid rgba(243, 235, 221, 0.22);
  color: var(--sand-100);
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease-out);
  backdrop-filter: blur(6px);
}

.card__btn:hover .card__plus,
.card__btn:focus-visible .card__plus {
  opacity: 1;
  transform: none;
}

.card__foot {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.28rem;
  padding-top: 0.8rem;
}

.card__name {
  font-family: var(--display);
  font-size: 1.22rem;
  line-height: 1.2;
  color: var(--sand-50);
  transition: color 0.35s var(--ease);
}

.card__btn:hover .card__name {
  color: var(--sand-200);
}

.card__note {
  font-size: 0.54rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(243, 235, 221, 0.42);
}

/* ------------------------------------------------------------ responsive --- */
@media (max-width: 900px) {
  .folio__head {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 1.2rem;
  }

  .folio__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .folio__grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .card__media {
    aspect-ratio: 3 / 2;
  }

  .card__plus {
    opacity: 1;
    transform: none;
  }
}
</style>
