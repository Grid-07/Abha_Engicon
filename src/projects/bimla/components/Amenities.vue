<template>
  <section id="amenities" class="section section--cream-alt amenities">
    <div class="shell">
      <header class="section-head section-head--center" v-reveal>
        <p class="eyebrow">Amenities</p>
        <h2 class="h2">The courtyard is the clubhouse</h2>
        <div class="rule"></div>
        <p class="lead">
          Between the two blocks the ground opens into a landscaped deck — pool, play lawn,
          gym and the shopping arcade all within a short walk of your door.
        </p>
      </header>

      <div class="amenities__grid">
        <article
          v-for="(a, i) in amenities"
          :key="a.title"
          class="amenity"
          v-reveal="i * 70"
        >
          <div class="amenity__media">
            <img :src="asset(a.image)" :alt="a.title" loading="lazy" decoding="async" />
          </div>
          <div class="amenity__body">
            <span class="amenity__icon"><AppIcon :name="a.icon" /></span>
            <h3 class="amenity__title">{{ a.title }}</h3>
            <p class="amenity__text">{{ a.text }}</p>
          </div>
        </article>
      </div>

      <ul class="amenities__list" v-reveal="80">
        <li v-for="item in amenityList" :key="item">
          <span class="amenities__tick"><AppIcon name="check" /></span>
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { asset } from '../utils/asset'
import { amenities, amenityList } from '../data/project'
</script>

<style scoped>
.amenities__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(0.7rem, 1.6vw, 1.15rem);
}

.amenity {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #fff;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--line);
  transition: transform 0.6s var(--ease), box-shadow 0.6s var(--ease);
}

.amenity:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow);
}

.amenity__media {
  position: relative;
  aspect-ratio: 4 / 3.6;
  overflow: hidden;
}

.amenity__media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(7, 18, 35, 0) 24%, rgba(7, 18, 35, 0.62) 58%, rgba(7, 18, 35, 0.94) 100%);
  opacity: 0.85;
  transition: opacity 0.5s var(--ease);
}

.amenity__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 58%;
  transition: transform 1.1s var(--ease), filter 0.6s var(--ease);
}

.amenity:hover .amenity__media img {
  transform: scale(1.07);
  filter: saturate(1.08);
}

.amenity__body {
  position: absolute;
  inset: auto 0 0 0;
  padding: 1.15rem 1.15rem 1.25rem;
  color: #fff;
}

.amenity__icon {
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(210, 175, 94, 0.55);
  color: var(--gold-300);
  margin-bottom: 0.7rem;
  font-size: 17px;
  background: rgba(7, 18, 35, 0.35);
  backdrop-filter: blur(6px);
}

.amenity__title {
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.8vw, 1.28rem);
  color: #fff;
  letter-spacing: 0.02em;
}

.amenity__text {
  font-size: 0.75rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.72);
  margin-top: 0.35rem;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.55s var(--ease), opacity 0.4s var(--ease), margin 0.4s var(--ease);
}

.amenity:hover .amenity__text {
  max-height: 60px;
  opacity: 1;
}

/* Amenity list */
.amenities__list {
  margin-top: clamp(1.8rem, 4vw, 2.8rem);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.1rem 2rem;
  border-top: 1px solid var(--line);
  padding-top: 1.4rem;
}

.amenities__list li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.62rem 0;
  font-size: 0.85rem;
  color: var(--text-soft);
  border-bottom: 1px solid var(--line);
  line-height: 1.6;
}

.amenities__tick {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  margin-top: 3px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(184, 145, 63, 0.12);
  color: var(--gold-700);
  font-size: 10px;
}

@media (max-width: 1000px) {
  .amenities__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .amenity__media {
    aspect-ratio: 3 / 2;
  }

  .amenity__text {
    max-height: 60px;
    opacity: 1;
  }

  .amenities__list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 620px) {
  .amenities__grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .amenity__media {
    aspect-ratio: 4 / 3.2;
  }

  .amenities__list {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
