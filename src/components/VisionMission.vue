<script setup>
import { about } from '../data/company'
</script>

<template>
  <section class="vm section--tight">
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
</template>

<style scoped>
.vm {
  background: var(--sand-50);
  padding-bottom: var(--section);
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

@media (max-width: 860px) {
  .vm__grid {
    grid-template-columns: 1fr;
  }
}
</style>
