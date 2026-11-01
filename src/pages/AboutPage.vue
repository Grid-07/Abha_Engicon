<script setup>
import PageHead from '../components/PageHead.vue'
import CompanyIntro from '../components/CompanyIntro.vue'
import { about, contact, brand } from '../data/company'
import AppIcon from '../components/AppIcon.vue'
</script>

<template>
  <PageHead
    eyebrow="Abha Engicon Pvt. Ltd."
    title="Abha Engicon."
    lede="A Biharsharif developer with a simple thesis: build fewer, better homes, and stand behind them after handover."
  />

  <CompanyIntro />

  <section class="vm section">
    <div class="shell vm__grid">
      <article class="vm__card" v-reveal>
        <span class="vm__label">Vision</span>
        <p class="vm__text">{{ about.vision }}</p>
      </article>
      <article class="vm__card" v-reveal="90">
        <span class="vm__label">Mission</span>
        <p class="vm__text">{{ about.mission }}</p>
      </article>
    </div>
  </section>

  <section class="places section--tight">
    <div class="shell">
      <span class="eyebrow" v-reveal>Where to find us</span>
      <div class="places__grid">
        <div v-for="o in [contact.regOffice, contact.siteOffice]" :key="o.label" class="place" v-reveal>
          <span class="place__label">{{ o.label }}</span>
          <address class="place__lines">
            <span v-for="(l, i) in o.lines" :key="i">{{ l }}</span>
          </address>
        </div>
        <div class="place" v-reveal="120">
          <span class="place__label">Direct</span>
          <div class="place__contact">
            <a :href="`tel:${contact.phones[0].value}`">
              <AppIcon name="phone" :size="14" />
              {{ contact.phones[0].label }}
            </a>
            <a :href="`mailto:${contact.email}`">
              <AppIcon name="mail" :size="14" />
              {{ contact.email }}
            </a>
            <a :href="contact.mapsUrl" target="_blank" rel="noopener">
              <AppIcon name="pin" :size="14" />
              Site on Google Maps
            </a>
          </div>
        </div>
      </div>
      <p class="places__note">{{ brand.credai }}</p>
    </div>
  </section>
</template>

<style scoped>
.vm {
  background: var(--sand-50);
}

.vm__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.4rem, 3vw, 2.4rem);
}

.vm__card {
  padding: clamp(1.6rem, 3.4vw, 2.8rem);
  border: 1px solid var(--line);
  background: var(--sand-100);
  display: grid;
  gap: 1rem;
  align-content: start;
}

.vm__label {
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--ink-400);
}

.vm__text {
  font-family: var(--display);
  font-size: clamp(1.25rem, 2.1vw, 1.65rem);
  font-weight: 300;
  line-height: 1.4;
  color: var(--ink-800);
  text-wrap: pretty;
}

/* -------------------------------------------------------------- places --- */
.places {
  background: var(--sand-100);
  border-top: 1px solid var(--line-soft);
}

.places .shell {
  display: grid;
  gap: 1.8rem;
}

.places__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1.4rem, 3vw, 2.6rem);
}

.place {
  display: grid;
  gap: 0.7rem;
  align-content: start;
  padding-top: 1.2rem;
  border-top: 1px solid var(--line);
}

.place__label {
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-400);
}

.place__lines {
  display: grid;
  font-style: normal;
  font-size: 0.94rem;
  line-height: 1.66;
  color: var(--ink-700);
}

.place__contact {
  display: grid;
  gap: 0.5rem;
}

.place__contact a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
  color: var(--ink-700);
  transition: color 0.3s var(--ease);
}

.place__contact a:hover {
  color: var(--ink-900);
}

.places__note {
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-400);
}

@media (max-width: 860px) {
  .vm__grid,
  .places__grid {
    grid-template-columns: 1fr;
  }
}
</style>
