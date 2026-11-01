<template>
  <div class="page page--inner">
    <Navigation />
    <PageHead
      eyebrow="Track Record"
      title="Previous Projects"
      lead="Eight completed developments across Biharsharif and Ranchi — the addresses that came before Shri Ganesh Arpan."
      crumbs="Projects"
    />

    <section class="section section--ivory">
      <div class="shell">
        <div class="row" v-for="(p, i) in previousProjects" :key="p.name" v-reveal="Math.min(i * 60, 300)">
          <span class="row__no num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="row__body">
            <h2 class="row__name">{{ p.name }}</h2>
            <span class="row__place">{{ p.place }} · Delivered</span>
          </div>
          <AppIcon name="arrow" :size="16" class="row__arrow" />
        </div>

        <div class="note" v-reveal>
          <p class="quote">
            “Experience the ‘Arpan’ lifestyle — glorious 15 years of excellence in
            crafting luxurious living.”
          </p>
          <router-link to="/shri-ganesh-arpan/about" class="link-underline">
            About Abha Engicon
            <AppIcon name="arrow" :size="14" />
          </router-link>
        </div>
      </div>
    </section>

    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import PageHead from '../components/PageHead.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
import AppIcon from '../components/AppIcon.vue'
import { previousProjects } from '../data/project'
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 4rem 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: clamp(1.1rem, 2.4vw, 1.7rem) 0.3rem;
  border-bottom: 1px solid var(--line);
  transition: padding-left 0.5s var(--ease), background 0.4s var(--ease);
}

.row:first-child {
  border-top: 1px solid var(--line);
}

.row:hover {
  padding-left: 1.1rem;
  background: rgba(255, 255, 255, 0.55);
}

.row__no {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  color: var(--gold-600);
}

.row__name {
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.6vw, 1.65rem);
  letter-spacing: 0.05em;
  color: var(--ink);
  transition: color 0.35s var(--ease);
}

.row:hover .row__name {
  color: var(--gold-700);
}

.row__place {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.row__arrow {
  color: var(--gold-600);
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
}

.row:hover .row__arrow {
  opacity: 1;
  transform: none;
}

/* --- Note --------------------------------------------------------------- */
.note {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: clamp(2.4rem, 5vw, 3.6rem);
}

.note .quote {
  max-width: 40ch;
  color: var(--ink);
}

@media (max-width: 560px) {
  .row {
    grid-template-columns: 2.6rem 1fr;
    gap: 0.6rem;
  }

  .row__arrow {
    display: none;
  }

  .note {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.4rem;
  }
}
</style>
