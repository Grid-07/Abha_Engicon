<template>
  <section id="about" class="section section--cream about">
    <div class="shell about__grid">
      <div class="about__media" v-reveal:left>
        <div class="about__frame"></div>
        <img
          :src="asset('images/brochure/about-portrait.jpg')"
          alt="Bimla Mangal Gardens facade rising above the landscaped pool deck"
          class="about__img"
          loading="lazy"
          decoding="async"
        />
        <div class="about__badge">
          <span class="about__badge-num">{{ brand.years }}</span>
          <span class="about__badge-label">Years of<br />excellence</span>
        </div>
      </div>

      <div class="about__copy">
        <p class="eyebrow" v-reveal>{{ about.eyebrow }}</p>
        <h2 class="h2 about__title" v-reveal="60">{{ about.title }}</h2>
        <div class="rule" v-reveal="100"></div>

        <div class="about__body" v-reveal="140">
          <p v-for="(p, i) in about.body" :key="i" class="lead">{{ p }}</p>
        </div>

        <div class="about__pillars" v-reveal="180">
          <article class="pillar">
            <h3 class="pillar__title">Vision</h3>
            <p>{{ about.vision }}</p>
          </article>
          <article class="pillar">
            <h3 class="pillar__title">Mission</h3>
            <p>{{ about.mission }}</p>
          </article>
        </div>

        <ul class="about__values" v-reveal="220">
          <li v-for="v in about.values" :key="v">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>{{ v }}</span>
          </li>
        </ul>

        <p class="about__credai" v-reveal="240">{{ brand.credai }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { asset } from '../utils/asset'
import { about, brand } from '../data/project'
</script>

<style scoped>
.about {
  overflow: hidden;
}

.about__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: clamp(2.2rem, 5vw, 4.8rem);
  align-items: start;
}

/* Media */
.about__media {
  position: relative;
  padding: 0 0 0 0;
}

.about__frame {
  position: absolute;
  inset: 18px -18px -18px 18px;
  border: 1px solid var(--gold-line);
  border-radius: var(--radius-lg);
  pointer-events: none;
}

.about__img {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.about__badge {
  position: absolute;
  right: -14px;
  bottom: 34px;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.35rem;
  background: var(--navy-900);
  color: var(--on-dark);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid rgba(210, 175, 94, 0.3);
}

.about__badge-num {
  font-family: var(--font-display);
  font-size: 2.4rem;
  line-height: 1;
  color: var(--gold-300);
}

.about__badge-label {
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  line-height: 1.6;
  color: var(--on-dark-soft);
}

/* Copy */
.about__title {
  margin-top: 0.85rem;
  max-width: 20ch;
}

.about__body {
  margin-top: 1.6rem;
  display: grid;
  gap: 1rem;
}

.about__body p {
  font-size: 1rem;
  line-height: 1.85;
}

.about__pillars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
  margin-top: 2rem;
}

.pillar {
  padding: 1.35rem 1.4rem;
  border-radius: var(--radius);
  background: #fff;
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease), border-color 0.4s var(--ease);
}

.pillar:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--gold-line);
}

.pillar__title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  letter-spacing: 0.06em;
  color: var(--gold-700);
  margin-bottom: 0.5rem;
}

.pillar p {
  font-size: 0.86rem;
  line-height: 1.75;
  color: var(--text-soft);
}

.about__values {
  margin-top: 1.9rem;
  display: grid;
  gap: 0.1rem;
}

.about__values li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.72rem 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.88rem;
  color: var(--text-soft);
}

.about__values li:first-child {
  border-top: 1px solid var(--line);
}

.about__values svg {
  width: 14px;
  height: 14px;
  margin-top: 5px;
  flex-shrink: 0;
  color: var(--gold-600);
}

.about__credai {
  margin-top: 1.5rem;
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
    gap: 2.6rem;
  }

  .about__media {
    max-width: 460px;
    margin-inline: auto;
    width: 100%;
  }

  .about__frame {
    inset: 12px -12px -12px 12px;
  }

  .about__img {
    aspect-ratio: 4 / 5;
  }

  .about__badge {
    right: 8px;
    bottom: 18px;
  }

  .about__title {
    max-width: none;
  }
}

@media (max-width: 560px) {
  .about__pillars {
    grid-template-columns: 1fr;
  }
}
</style>
