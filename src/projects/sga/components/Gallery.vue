<template>
  <section id="gallery" class="section section--ivory gallery-sec">
    <div class="shell shell--wide">
      <div class="gallery-sec__head">
        <div class="section-head">
          <span class="eyebrow">The Project</span>
          <h2 class="h2">Look closer</h2>
          <p class="lead">
            Renders of both blocks and every furnished layout, at full size.
          </p>
        </div>
        <p class="gallery-sec__hint">
          <AppIcon name="expand" :size="13" />
          Tap any frame to enlarge
        </p>
      </div>

      <div class="gal">
        <button
          v-for="(g, i) in gallery"
          :key="g.src"
          class="gal__item"
          :class="{ 'gal__item--wide': i === 0 }"
          v-reveal="Math.min(i * 45, 300)"
          @click="open(i)"
        >
          <img :src="asset(g.src)" :alt="g.caption" loading="lazy" decoding="async" />
          <span class="gal__cap">
            <span class="gal__tag">{{ g.tag }}</span>
            <span class="gal__title">{{ g.caption }}</span>
          </span>
        </button>
      </div>
    </div>

    <transition name="fade">
      <div v-if="index >= 0" class="lb" @click.self="close">
        <button class="lb__btn lb__btn--close" aria-label="Close" @click="close">
          <AppIcon name="close" :size="20" />
        </button>
        <button class="lb__btn lb__btn--prev" aria-label="Previous" @click="step(-1)">
          <AppIcon name="chevron" :size="20" style="transform: rotate(90deg)" />
        </button>
        <figure class="lb__figure">
          <img :src="asset(gallery[index].src)" :alt="gallery[index].caption" />
          <figcaption>
            <span class="lb__tag">{{ gallery[index].tag }}</span>
            {{ gallery[index].caption }}
          </figcaption>
        </figure>
        <button class="lb__btn lb__btn--next" aria-label="Next" @click="step(1)">
          <AppIcon name="chevron" :size="20" style="transform: rotate(-90deg)" />
        </button>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import AppIcon from './AppIcon.vue'
import { asset } from '../utils/asset'
import { gallery } from '../data/project'

const index = ref(-1)

const open = (i) => {
  index.value = i
}

const close = () => {
  index.value = -1
}

const step = (d) => {
  index.value = (index.value + d + gallery.length) % gallery.length
}

const onKey = (e) => {
  if (index.value < 0) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}

watch(index, (v) => {
  document.documentElement.classList.toggle('no-scroll', v >= 0)
  if (v >= 0) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.classList.remove('no-scroll')
})
</script>

<style scoped>
.gallery-sec__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.gallery-sec__head .section-head {
  margin-bottom: clamp(1.6rem, 3vw, 2.4rem);
}

.gallery-sec__hint {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: clamp(1.6rem, 3vw, 2.4rem);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

/* --- Grid --------------------------------------------------------------- */
.gal {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.7rem;
}

.gal__item {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 3.4;
  background: var(--ivory-200);
  border: 1px solid var(--line);
}

.gal__item--wide {
  grid-column: span 2;
  grid-row: span 2;
  aspect-ratio: auto;
}

.gal__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.3s var(--ease), filter 0.6s var(--ease);
}

.gal__item--wide img {
  object-position: 50% 55%;
}

.gal__item:hover img {
  transform: scale(1.05);
}

.gal__cap {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 1.6rem 0.9rem 0.8rem;
  text-align: left;
  background: linear-gradient(0deg, rgba(10, 10, 12, 0.86), rgba(10, 10, 12, 0));
  transform: translateY(6px);
  opacity: 0;
  transition: opacity 0.45s var(--ease), transform 0.45s var(--ease);
}

.gal__item:hover .gal__cap {
  opacity: 1;
  transform: none;
}

.gal__tag {
  font-size: 0.5rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold-400);
}

.gal__title {
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  color: var(--gold-100);
  line-height: 1.4;
}

/* --- Lightbox ----------------------------------------------------------- */
.lb {
  position: fixed;
  inset: 0;
  z-index: 130;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.8rem;
  padding: clamp(1rem, 4vw, 3rem);
  background: rgba(6, 6, 8, 0.95);
  backdrop-filter: blur(6px);
}

.lb__figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  min-width: 0;
}

.lb__figure img {
  max-width: 100%;
  max-height: 82vh;
  object-fit: contain;
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6);
}

.lb__figure figcaption {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.65);
  text-align: center;
}

.lb__tag {
  color: var(--gold-400);
  margin-right: 0.6rem;
}

.lb__btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(241, 233, 219, 0.22);
  color: var(--gold-100);
  transition: border-color 0.3s var(--ease), background 0.3s var(--ease);
}

.lb__btn:hover {
  border-color: var(--gold-400);
  background: rgba(193, 160, 116, 0.14);
}

.lb__btn--close {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
}

.lb__btn--prev,
.lb__btn--next {
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 900px) {
  .gal {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .gal__item--wide {
    grid-column: span 2;
    grid-row: auto;
    aspect-ratio: 16 / 10;
  }

  .gal__cap {
    opacity: 1;
    transform: none;
  }

  .lb {
    grid-template-columns: minmax(0, 1fr);
    padding: 3.6rem 0.9rem 1.2rem;
  }

  .lb__btn--prev,
  .lb__btn--next {
    position: absolute;
    bottom: 1.2rem;
  }

  .lb__btn--prev {
    left: 1.2rem;
  }

  .lb__btn--next {
    right: 1.2rem;
  }

  .lb__figure img {
    max-height: 72vh;
  }
}

@media (max-width: 520px) {
  .gal {
    gap: 0.5rem;
  }

  .gal__title {
    font-size: 0.62rem;
  }
}
</style>
