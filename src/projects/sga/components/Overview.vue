<template>
  <section id="overview" class="section section--ivory overview">
    <div class="shell">
      <div class="overview__grid">
        <div class="overview__media" v-reveal:left>
          <div class="overview__frame">
            <img
              :src="asset('images/brochure/tower-a.jpg')"
              alt="A Tower at Shri Ganesh Arpan, seen from the Ekangarsarai Main Road"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="overview__badge">
            <span class="overview__badge-num num">15</span>
            <span class="overview__badge-label">Years of<br />excellence</span>
          </div>
        </div>

        <div class="overview__body" v-reveal:right>
          <span class="eyebrow">The Development</span>
          <h2 class="h2 overview__title">
            Two towers, <span class="nw">twenty-two</span> homes,<br />
            one quiet stretch of Biharsharif
          </h2>
          <p class="lead">
            Shri Ganesh Arpan sits on the Ekangarsarai Main Road at Maghra — close
            enough that schools, the market and the hospital are a short walk, far
            enough that the evenings stay quiet. The two blocks are low-rise by
            design: four homes to a floor in A Tower, two in B Tower.
          </p>

          <div class="overview__facts">
            <div v-for="f in facts" :key="f.label" class="fact">
              <span class="fact__value num">{{ f.value }}</span>
              <span class="fact__label">{{ f.label }}</span>
            </div>
          </div>

          <div class="overview__actions">
            <router-link :to="{ path: '/shri-ganesh-arpan', hash: '#residences' }" class="link-underline">
              See the residences
              <AppIcon name="arrow" :size="14" />
            </router-link>
            <router-link to="/shri-ganesh-arpan/about" class="link-underline overview__about">
              About Abha Engicon
              <AppIcon name="arrow" :size="14" />
            </router-link>
          </div>
        </div>
      </div>

      <blockquote class="overview__quote" v-reveal>
        <p class="quote">
          “A perfect heaven created to cater the need of every member of your family.
          A place where you nurture the childhood, enjoy the youth and care for the
          elderly to the fullest.”
        </p>
        <cite>— From the Shri Ganesh Arpan brochure</cite>
      </blockquote>
    </div>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { asset } from '../utils/asset'

const facts = [
  { value: '2', label: 'Towers' },
  { value: '22', label: 'Homes' },
  { value: '2 & 3', label: 'Bedroom layouts' },
  { value: 'G + 4', label: 'Floor rise' },
]
</script>

<style scoped>
.overview {
  overflow: hidden;
}

.overview__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
}

/* --- Media -------------------------------------------------------------- */
.overview__media {
  position: relative;
}

.overview__frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
}

.overview__frame::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.28);
  pointer-events: none;
}

.overview__frame img {
  width: 100%;
  aspect-ratio: 4 / 4.4;
  object-fit: cover;
  object-position: 52% 55%;
  transition: transform 1.4s var(--ease);
}

.overview__media:hover .overview__frame img {
  transform: scale(1.04);
}

.overview__badge {
  position: absolute;
  right: clamp(-1rem, -2vw, -0.5rem);
  bottom: clamp(1rem, 3vw, 2rem);
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.9rem 1.15rem;
  background: var(--ink-900);
  color: var(--gold-100);
  border: 1px solid rgba(193, 160, 116, 0.35);
  box-shadow: var(--shadow);
}

.overview__badge-num {
  font-size: 1.9rem;
  line-height: 1;
  color: var(--gold-300);
}

.overview__badge-label {
  font-size: 0.55rem;
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.6);
}

/* --- Body --------------------------------------------------------------- */
.overview__title {
  margin-top: 1rem;
}

.nw {
  white-space: nowrap;
}

.overview__body .lead {
  margin-top: 1.2rem;
}

.overview__facts {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.6rem;
  border-top: 1px solid var(--line);
}

.fact {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.fact__value {
  font-size: clamp(1.15rem, 2.2vw, 1.5rem);
  color: var(--ink);
  line-height: 1.1;
}

.fact__label {
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-muted);
  line-height: 1.4;
}

.overview__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: 2.2rem;
}

.overview__about {
  color: var(--ink-muted);
}

/* --- Quote -------------------------------------------------------------- */
.overview__quote {
  margin-top: clamp(3rem, 6vw, 5rem);
  padding-top: clamp(2rem, 4vw, 3rem);
  border-top: 1px solid var(--line);
  max-width: 900px;
}

.overview__quote .quote {
  color: var(--ink);
}

.overview__quote cite {
  display: block;
  margin-top: 1.1rem;
  font-style: normal;
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold-700);
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 980px) {
  .overview__grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .overview__media {
    max-width: 560px;
  }

  .overview__frame img {
    aspect-ratio: 4 / 3.6;
  }
}

@media (max-width: 560px) {
  .overview__facts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.2rem;
  }

  .overview__badge {
    right: 0.7rem;
    bottom: 0.7rem;
    padding: 0.7rem 0.9rem;
  }

  .overview__badge-num {
    font-size: 1.5rem;
  }

  .overview__actions {
    gap: 1.1rem;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
