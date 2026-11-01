<template>
  <section id="location" class="section section--ink location">
    <div class="shell">
      <div class="section-head">
        <span class="eyebrow eyebrow--light">Location</span>
        <h2 class="h2">Ekangarsarai Main Road, Maghra</h2>
        <p class="lead">
          One kilometre from Golapur Airport, two from Janaki Hospital, and a
          walk from the schools and the market.
        </p>
      </div>

      <div class="location__grid">
        <div class="location__map" v-reveal:left>
          <div class="location__frame">
            <img
              :src="asset('images/brochure/location-map.jpg')"
              alt="Locality map showing Shri Ganesh Arpan on Biharsharif Ekangarsarai Road"
              loading="lazy"
            />
            <span class="location__pin">
              <span class="location__pin-dot"></span>
              Shri Ganesh Arpan
            </span>
          </div>

          <div class="location__addr">
            <span class="eyebrow eyebrow--light eyebrow--plain">Site Address</span>
            <p>{{ contact.siteAddress }}</p>
          </div>

          <a :href="contact.mapsUrl" target="_blank" rel="noopener" class="btn btn--ghost btn--sm location__dirs">
            <span>Get directions</span>
            <AppIcon name="arrow" class="btn__arrow" :size="14" />
          </a>
        </div>

        <div class="prox" v-reveal:right>
          <div v-for="(g, i) in proximity" :key="g.group" class="prox__group" :style="{ '--i': i }">
            <div class="prox__head">
              <span class="prox__icon"><AppIcon :name="g.icon" :size="17" /></span>
              <h3>{{ g.group }}</h3>
            </div>
            <ul>
              <li v-for="it in g.items" :key="it.name">
                <span class="prox__name">{{ it.name }}</span>
                <span class="prox__dist num">{{ it.dist }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { asset } from '../utils/asset'
import { contact, proximity } from '../data/project'
</script>

<style scoped>
.location__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: clamp(2rem, 4.5vw, 3.6rem);
  align-items: start;
}

/* --- Map ---------------------------------------------------------------- */
.location__frame {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(241, 233, 219, 0.14);
  background: #0b0b0c;
}

.location__frame img {
  width: 100%;
  aspect-ratio: 5 / 4.6;
  object-fit: cover;
  object-position: 30% center;
  /* The printed map runs off the right edge of the brochure page — fade it
     into the section instead of showing cut-off labels. */
  mask-image: linear-gradient(90deg, #000 72%, transparent 96%);
  -webkit-mask-image: linear-gradient(90deg, #000 72%, transparent 96%);
  transition: transform 1.4s var(--ease);
}

.location__frame:hover img {
  transform: scale(1.03);
}

.location__pin {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold-100);
  background: rgba(10, 10, 12, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(193, 160, 116, 0.3);
}

.location__pin-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold-400);
  box-shadow: 0 0 0 0 rgba(210, 181, 131, 0.7);
  animation: ping 2.4s ease-out infinite;
}

@keyframes ping {
  0% {
    box-shadow: 0 0 0 0 rgba(210, 181, 131, 0.6);
  }
  70%,
  100% {
    box-shadow: 0 0 0 10px rgba(210, 181, 131, 0);
  }
}

.location__addr {
  margin-top: 1.4rem;
}

.location__addr p {
  margin-top: 0.55rem;
  font-size: 0.92rem;
  line-height: 1.7;
  color: rgba(241, 233, 219, 0.72);
  max-width: 40ch;
}

.location__dirs {
  margin-top: 1.3rem;
}

/* --- Proximity ---------------------------------------------------------- */
.prox {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.6rem 1.8rem;
}

.prox__group {
  opacity: 0;
  transform: translateY(16px);
}

.prox__group.is-revealed,
:deep(.reveal.is-revealed) .prox__group {
  opacity: 1;
  transform: none;
  transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
  transition-delay: calc(var(--i) * 80ms);
}

.prox__head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(241, 233, 219, 0.12);
}

.prox__icon {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(193, 160, 116, 0.35);
  color: var(--gold-400);
  flex: none;
}

.prox__head h3 {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.6);
  line-height: 1.4;
}

.prox ul {
  margin-top: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.prox li {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  font-size: 0.86rem;
  line-height: 1.5;
}

.prox__name {
  color: rgba(241, 233, 219, 0.86);
}

.prox__dist {
  margin-left: auto;
  font-size: 0.78rem;
  color: var(--gold-400);
  white-space: nowrap;
}

.prox__dist::before {
  content: '';
  display: inline-block;
  width: 14px;
  height: 1px;
  margin-right: 0.5rem;
  background: rgba(193, 160, 116, 0.4);
  vertical-align: middle;
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 980px) {
  .location__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .location__frame img {
    aspect-ratio: 4 / 3.4;
  }
}

@media (max-width: 620px) {
  .prox {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.3rem;
  }

  .location__frame img {
    aspect-ratio: 1 / 1;
    mask-image: linear-gradient(90deg, #000 78%, transparent 98%);
    -webkit-mask-image: linear-gradient(90deg, #000 78%, transparent 98%);
  }

  .location__dirs {
    width: 100%;
  }
}
</style>
