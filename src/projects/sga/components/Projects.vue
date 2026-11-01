<template>
  <section id="projects" class="section section--ivory-alt projects">
    <div class="shell">
      <div class="projects__grid">
        <div class="projects__intro" v-reveal>
          <span class="eyebrow">Track Record</span>
          <h2 class="h2">Fifteen years,<br />eight delivered addresses</h2>
          <p class="lead">
            Before Shri Ganesh Arpan, the same team handed over eight residential
            and commercial developments across Biharsharif and Ranchi.
          </p>

          <div class="projects__count">
            <span class="num">8</span>
            <span>completed<br />developments</span>
          </div>
        </div>

        <ol class="list" v-reveal:right>
          <li v-for="(p, i) in previousProjects" :key="p.name">
            <span class="list__no num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="list__name">{{ p.name }}</span>
            <span class="list__place">{{ p.place }}</span>
            <AppIcon name="arrow" :size="15" class="list__arrow" />
          </li>
        </ol>
      </div>

      <div class="projects__cta" v-reveal>
        <p class="quote projects__quote">
          “Glorious 15 years of excellence in crafting luxurious living.”
        </p>
        <router-link to="/shri-ganesh-arpan/projects" class="btn btn--outline">
          <span>See all projects</span>
          <AppIcon name="arrow" class="btn__arrow" :size="15" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { previousProjects } from '../data/project'
</script>

<style scoped>
.projects__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;
}

.projects__intro .lead {
  margin-top: 1.1rem;
  max-width: 42ch;
}

.projects__count {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.projects__count .num {
  font-size: 2.6rem;
  line-height: 1;
  color: var(--gold-600);
}

.projects__count span:last-child {
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  line-height: 1.6;
  color: var(--ink-muted);
}

/* --- List --------------------------------------------------------------- */
.list {
  border-top: 1px solid var(--line);
}

.list li {
  display: grid;
  grid-template-columns: 2.6rem 1fr auto auto;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 0.2rem;
  border-bottom: 1px solid var(--line);
  transition: padding-left 0.45s var(--ease), color 0.35s var(--ease);
}

.list li:hover {
  padding-left: 0.7rem;
  color: var(--gold-700);
}

.list__no {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: var(--gold-600);
}

.list__name {
  font-family: var(--font-display);
  font-size: clamp(0.95rem, 1.8vw, 1.12rem);
  letter-spacing: 0.05em;
  color: var(--ink);
}

.list li:hover .list__name {
  color: var(--gold-700);
}

.list__place {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.list__arrow {
  color: var(--gold-600);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
}

.list li:hover .list__arrow {
  opacity: 1;
  transform: none;
}

/* --- CTA ---------------------------------------------------------------- */
.projects__cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: clamp(2.4rem, 5vw, 3.6rem);
  padding-top: clamp(1.8rem, 3.5vw, 2.6rem);
  border-top: 1px solid var(--line);
}

.projects__quote {
  max-width: 30ch;
  color: var(--ink);
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 940px) {
  .projects__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 2.2rem;
  }
}

@media (max-width: 560px) {
  .list li {
    grid-template-columns: 2rem 1fr auto;
    gap: 0.6rem;
    padding: 0.85rem 0;
  }

  .list__place {
    display: none;
  }

  .list__arrow {
    display: none;
  }

  .projects__cta {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.4rem;
  }
}
</style>
