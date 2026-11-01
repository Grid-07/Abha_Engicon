<template>
  <section id="projects" class="section section--cream-alt projects">
    <div class="shell">
      <div class="projects__top">
        <header class="section-head projects__head" v-reveal>
          <p class="eyebrow">Track record</p>
          <h2 class="h2">Fifteen years,<br />eleven addresses</h2>
          <div class="rule"></div>
          <p class="lead">
            Before Bimla Mangal Gardens, Abha Engicon delivered homes across
            Bihar and Jharkhand — the same engineers, the same site discipline.
          </p>
        </header>

        <div class="projects__stats" v-reveal="80">
          <div class="projects__stat">
            <span>{{ brand.years }}</span>
            <small>Years building</small>
          </div>
          <div class="projects__stat">
            <span>{{ previousProjects.length }}</span>
            <small>Delivered addresses</small>
          </div>
          <div class="projects__stat">
            <span>2</span>
            <small>States — Bihar &amp; Jharkhand</small>
          </div>
        </div>
      </div>

      <ul class="projects__list">
        <li
          v-for="(name, i) in previousProjects"
          :key="name"
          v-reveal="Math.min(i * 40, 320)"
        >
          <span class="projects__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="projects__name">{{ name }}</span>
          <span class="projects__arrow"><AppIcon name="arrow" /></span>
        </li>
      </ul>

      <p class="projects__foot" v-reveal>
        <AppIcon name="leaf" />
        Member of CREDAI Bihar · BR/PTN/168
      </p>
    </div>
  </section>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { previousProjects, brand } from '../data/project'
</script>

<style scoped>
.projects__top {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: end;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.projects__head {
  margin-bottom: 0;
}

.projects__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
}

.projects__stat {
  padding: 1rem 0.8rem;
  border-radius: var(--radius);
  background: #fff;
  border: 1px solid var(--line);
  text-align: center;
}

.projects__stat span {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--navy-800);
  line-height: 1;
}

.projects__stat small {
  display: block;
  margin-top: 0.45rem;
  font-size: 0.56rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  line-height: 1.5;
}

/* List */
.projects__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 2.5rem;
  border-top: 1px solid var(--line);
}

.projects__list li {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.95rem 0.2rem;
  border-bottom: 1px solid var(--line);
  cursor: default;
  transition: padding 0.45s var(--ease), color 0.35s var(--ease);
}

.projects__list li:hover {
  padding-left: 0.6rem;
  color: var(--gold-700);
}

.projects__num {
  font-size: 0.56rem;
  letter-spacing: 0.16em;
  color: var(--gold-600);
  width: 1.5rem;
  flex-shrink: 0;
}

.projects__name {
  font-family: var(--font-display);
  font-size: clamp(1.02rem, 1.8vw, 1.2rem);
  letter-spacing: 0.01em;
  flex: 1;
}

.projects__arrow {
  font-size: 15px;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
  color: var(--gold-600);
}

.projects__list li:hover .projects__arrow {
  opacity: 1;
  transform: none;
}

.projects__foot {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.8rem;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.projects__foot svg {
  width: 14px;
  height: 14px;
  color: var(--gold-600);
}

@media (max-width: 900px) {
  .projects__top {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .projects__list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .projects__stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.4rem;
  }

  .projects__stat {
    padding: 0.8rem 0.4rem;
  }
}
</style>
