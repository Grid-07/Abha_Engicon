<template>
  <section id="location" class="section section--cream location">
    <div class="shell">
      <header class="section-head" v-reveal>
        <p class="eyebrow">Location</p>
        <h2 class="h2">Bihar Sharif – Ekangar Road,<br />Ward No. 48, Maghra</h2>
        <div class="rule"></div>
      </header>

      <div class="location__grid">
        <figure class="location__map" v-reveal:left>
          <img
            :src="asset('images/brochure/location-map.jpg')"
            alt="Location map showing Bimla Mangal Gardens on Bihar Sharif–Ekangar Road near Ambedkar Circle"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="location__pin">
            <span class="location__pin-icon"><AppIcon name="pin" /></span>
            <div>
              <strong>Bimla Mangal Gardens</strong>
              <span>Maghra, Biharsharif, Nalanda</span>
            </div>
          </figcaption>
        </figure>

        <div class="location__side">
          <div class="prox" v-reveal:right>
            <div v-for="group in proximity" :key="group.group" class="prox__group">
              <p class="prox__group-title">
                <AppIcon :name="group.icon" />
                {{ group.group }}
              </p>
              <ul>
                <li v-for="item in group.items" :key="item[0]">
                  <span class="prox__name">{{ item[0] }}</span>
                  <span class="prox__dots"></span>
                  <span class="prox__dist">{{ item[1] }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="location__actions" v-reveal="120">
            <a :href="contact.mapsUrl" target="_blank" rel="noopener" class="btn btn--gold btn--block">
              <span>Get Directions</span>
              <AppIcon name="arrow" class="btn__arrow" />
            </a>
            <a :href="`tel:${contact.phones[0].value}`" class="btn btn--outline btn--block">
              <span>Call the site office</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { asset } from '../utils/asset'
import { proximity, contact } from '../data/project'
</script>

<style scoped>
.location__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.02fr);
  gap: clamp(1.6rem, 4vw, 3.4rem);
  align-items: start;
}

/* Map */
.location__map {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--line);
  background: var(--cream-200);
}

.location__map img {
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 1.2s var(--ease);
}

.location__map:hover img {
  transform: scale(1.03);
}

.location__pin {
  position: absolute;
  left: 0.9rem;
  right: 0.9rem;
  bottom: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.75rem 0.9rem;
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow);
  border: 1px solid var(--gold-line);
}

.location__pin-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--navy-900);
  color: var(--gold-300);
  font-size: 15px;
}

.location__pin strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.3;
}

.location__pin span:last-child {
  font-size: 0.7rem;
  color: var(--text-muted);
}

/* Proximity */
.prox {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.35rem;
}

.prox__group-title {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold-700);
  margin-bottom: 0.45rem;
  padding-bottom: 0.45rem;
  border-bottom: 1px solid var(--gold-line);
}

.prox__group-title svg {
  width: 15px;
  height: 15px;
}

.prox ul {
  display: grid;
  gap: 0.05rem;
}

.prox li {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.3rem 0;
  font-size: 0.85rem;
  color: var(--text-soft);
}

.prox__name {
  flex-shrink: 1;
}

.prox__dots {
  flex: 1;
  border-bottom: 1px dotted rgba(11, 21, 38, 0.24);
  transform: translateY(-3px);
  min-width: 12px;
}

.prox__dist {
  flex-shrink: 0;
  font-size: 0.78rem;
  color: var(--gold-700);
  font-variant-numeric: tabular-nums;
}

.location__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
  margin-top: 1.7rem;
}

@media (max-width: 900px) {
  .location__grid {
    grid-template-columns: 1fr;
  }

  .prox {
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem 1.6rem;
  }
}

@media (max-width: 620px) {
  .prox {
    grid-template-columns: 1fr;
  }

  .location__actions {
    grid-template-columns: 1fr;
  }
}
</style>
