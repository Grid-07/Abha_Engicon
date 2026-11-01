<template>
  <section id="walkthrough" class="section section--navy walkthrough">
    <div class="shell">
      <header class="section-head section-head--center on-dark" v-reveal>
        <p class="eyebrow">Walkthrough</p>
        <h2 class="h2">See it before you visit</h2>
        <div class="rule"></div>
      </header>

      <div class="player" v-reveal>
        <video
          v-if="playing"
          :src="asset(media.film)"
          :poster="asset(media.filmPoster)"
          class="player__video"
          controls
          autoplay
          playsinline
          @ended="playing = false"
        ></video>

        <button v-else class="player__cover" @click="playing = true" aria-label="Play the walkthrough film">
          <img
            :src="asset(media.filmPoster)"
            alt="Film still of the Bimla Mangal Gardens walkthrough"
            loading="lazy"
            decoding="async"
          />
          <span class="player__scrim"></span>
          <span class="player__play">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </span>
          <span class="player__label">Play the walkthrough · 1:11</span>
        </button>
      </div>

      <div class="gallery">
        <button
          v-for="(g, i) in gallery"
          :key="g.src"
          class="gallery__item"
          v-reveal="Math.min(i * 50, 250)"
          @click="open(g)"
        >
          <img :src="asset(g.src)" :alt="g.caption" loading="lazy" decoding="async" />
          <span class="gallery__cap">{{ g.caption }}</span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="lightbox.open" class="lightbox" @click.self="close" role="dialog" aria-modal="true">
          <button class="lightbox__close" @click="close" aria-label="Close">
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
          </button>
          <img :src="asset(lightbox.src)" :alt="lightbox.caption" class="lightbox__img" />
          <p class="lightbox__cap">{{ lightbox.caption }}</p>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { asset } from '../utils/asset'
import media from '../data/media.json'
import { gallery } from '../data/project'

const playing = ref(false)
const lightbox = ref({ open: false, src: '', caption: '' })

const open = (g) => {
  lightbox.value = { open: true, src: g.src, caption: g.caption }
  document.body.classList.add('no-scroll')
}

const close = () => {
  lightbox.value.open = false
  document.body.classList.remove('no-scroll')
}

const onKey = (e) => {
  if (e.key === 'Escape' && lightbox.value.open) close()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.classList.remove('no-scroll')
})
</script>

<style scoped>
.player {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--navy-800);
  border: 1px solid rgba(210, 175, 94, 0.25);
  box-shadow: var(--shadow-lg);
  aspect-ratio: 16 / 9;
  max-height: 76vh;
  margin-inline: auto;
}

.player__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
}

.player__cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.player__cover img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s var(--ease);
}

.player__cover:hover img {
  transform: scale(1.04);
}

.player__scrim {
  position: absolute;
  inset: 0;
  background: radial-gradient(60% 60% at 50% 50%, rgba(4, 10, 20, 0.1), rgba(4, 10, 20, 0.65));
}

.player__play {
  position: relative;
  width: clamp(58px, 8vw, 82px);
  height: clamp(58px, 8vw, 82px);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--navy-900);
  background: linear-gradient(100deg, var(--gold-600), var(--gold-300));
  box-shadow: 0 20px 50px -18px rgba(210, 175, 94, 0.9);
  transition: transform 0.45s var(--ease);
}

.player__play svg {
  width: 30%;
  height: 30%;
  margin-left: 3px;
}

.player__cover:hover .player__play {
  transform: scale(1.08);
}

.player__label {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(243, 236, 223, 0.8);
  white-space: nowrap;
}

/* Gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.7rem;
  margin-top: 0.7rem;
}

.gallery__item {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border: 1px solid rgba(243, 236, 223, 0.12);
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s var(--ease), filter 0.6s var(--ease);
  filter: saturate(0.96) brightness(0.92);
}

.gallery__item:hover img {
  transform: scale(1.06);
  filter: none;
}

.gallery__cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.6rem 0.8rem 0.7rem;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
  text-align: left;
  background: linear-gradient(180deg, transparent, rgba(4, 10, 20, 0.82));
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
}

.gallery__item:hover .gallery__cap {
  opacity: 1;
  transform: none;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(4, 10, 20, 0.94);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vw, 2.5rem);
  gap: 0.9rem;
}

.lightbox__img {
  max-width: 100%;
  max-height: 84vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
}

.lightbox__cap {
  font-size: 0.66rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(243, 236, 223, 0.6);
}

.lightbox__close {
  position: absolute;
  top: calc(1rem + env(safe-area-inset-top));
  right: 1rem;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(243, 236, 223, 0.25);
  color: var(--on-dark);
  display: grid;
  place-items: center;
}

.lightbox__close svg {
  width: 20px;
  height: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }

  .gallery__cap {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 560px) {
  .player {
    aspect-ratio: 4 / 3;
  }
}
</style>
