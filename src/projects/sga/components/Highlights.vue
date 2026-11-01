<template>
  <section id="highlights" class="section section--ivory-alt highlights">
    <div class="shell">
      <div class="section-head section-head--center">
        <span class="eyebrow">Highlights</span>
        <h2 class="h2">What comes with the address</h2>
        <p class="lead">
          Nine commitments, taken straight from the brochure — from the terrace
          garden on the roof to the EV point in your parking bay.
        </p>
        <span class="rule"></span>
      </div>

      <div class="grid">
        <article
          v-for="(h, i) in highlights"
          :key="h.title"
          class="item"
          v-reveal="Math.min(i * 55, 380)"
        >
          <span class="item__icon">
            <AppIcon :name="h.icon" :size="24" />
          </span>
          <div class="item__body">
            <h3 class="item__title">{{ h.title }}</h3>
            <p class="item__text">{{ h.text }}</p>
          </div>
          <span class="item__no num">{{ String(i + 1).padStart(2, '0') }}</span>
        </article>
      </div>

      <div class="strip" v-reveal>
        <div class="strip__media">
          <img
            :src="asset('images/brochure/tower-b.jpg')"
            alt="B Tower with its double-height retail frontage"
            loading="lazy"
          />
        </div>
        <div class="strip__text">
          <span class="eyebrow">Ground Floor</span>
          <h3 class="h3 strip__title">Shops below, homes above</h3>
          <p>
            Both blocks open onto the Ekangarsarai Main Road, with retail at the
            base of the buildings. A grocery run is a lift ride and a few steps —
            not a drive.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { asset } from '../utils/asset'
import { highlights } from '../data/project'
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.item {
  position: relative;
  display: flex;
  gap: 0.95rem;
  padding: clamp(1.2rem, 2.4vw, 1.9rem);
  background: var(--ivory-50);
  transition: background 0.45s var(--ease);
}

.item:hover {
  background: #fff;
}

.item__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid var(--gold-line);
  border-radius: 50%;
  color: var(--gold-600);
  transition: border-color 0.45s var(--ease), color 0.45s var(--ease),
    transform 0.55s var(--ease);
}

.item:hover .item__icon {
  border-color: var(--gold-500);
  color: var(--gold-700);
  transform: translateY(-2px);
}

.item__title {
  font-family: var(--font-heading);
  font-size: 1.16rem;
  font-weight: 600;
  letter-spacing: 0.005em;
  color: var(--ink);
  line-height: 1.3;
}

.item__text {
  margin-top: 0.4rem;
  font-size: 0.83rem;
  line-height: 1.6;
  color: var(--ink-muted);
}

.item__no {
  position: absolute;
  top: 0.9rem;
  right: 1rem;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  color: rgba(23, 23, 27, 0.16);
}

/* --- Retail strip ------------------------------------------------------- */
.strip {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(1.6rem, 4vw, 3.4rem);
  margin-top: clamp(2.4rem, 5vw, 4rem);
  padding-top: clamp(2rem, 4vw, 3rem);
  border-top: 1px solid var(--line);
}

.strip__media {
  overflow: hidden;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
}

.strip__media img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: 50% 40%;
  transition: transform 1.4s var(--ease);
}

.strip:hover .strip__media img {
  transform: scale(1.035);
}

.strip__title {
  margin-top: 0.7rem;
  color: var(--ink);
}

.strip__text p {
  margin-top: 0.8rem;
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--ink-soft);
  max-width: 46ch;
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 940px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .strip {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .item {
    padding: 1.1rem;
    gap: 0.85rem;
  }

  .item__icon {
    width: 40px;
    height: 40px;
  }

  .item__no {
    display: none;
  }
}
</style>
