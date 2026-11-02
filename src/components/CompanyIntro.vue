<script setup>
import { asset } from '../utils/asset'
import { about, brand } from '../data/company'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section id="company" class="co section lattice">
    <div class="shell co__grid">
      <div class="co__lead">
        <span class="eyebrow" v-reveal>{{ about.eyebrow }}</span>
        <h2 class="co__title" v-reveal="60">{{ about.title }}</h2>

        <div class="body-copy co__body" v-reveal="120">
          <p v-for="(p, i) in about.body" :key="i">{{ p }}</p>
        </div>

        <div class="co__meta" v-reveal="160">
          <span class="co__badge">{{ brand.credai }}</span>
          <a href="#contact" class="link-arrow">
            Talk to us
            <AppIcon name="arrow-right" :size="13" />
          </a>
        </div>
      </div>

      <div class="co__side">
        <img
          :src="asset('images/brand/logo-ink.png')"
          alt=""
          class="co__logo"
          width="581"
          height="233"
          aria-hidden="true"
          loading="lazy"
        />

        <ol class="co__values">
          <li v-for="(v, i) in about.values" :key="v" class="co__value" v-reveal="i * 60">
            <span class="co__vnum">0{{ i + 1 }}</span>
            <span class="co__vtext">{{ v }}</span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.co {
  background: var(--sand-200);
  border-block: 1px solid rgba(20, 20, 24, 0.1);
  overflow: hidden;
}

.co::before {
  opacity: 0.36;
}

.co__grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.25fr 0.85fr;
  gap: clamp(2.5rem, 7vw, 6rem);
  align-items: start;
}

.co__title {
  margin-top: 1.1rem;
  max-width: 17ch;
  color: var(--ink-900);
}

.co__body {
  margin-top: 1.6rem;
  max-width: 50ch;
  color: var(--ink-700);
}

.co__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4rem 2rem;
  margin-top: 2rem;
}

.co__badge {
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-600);
  padding: 0.45rem 0.85rem;
  border: 1px solid rgba(20, 20, 24, 0.22);
  border-radius: 999px;
}

/* ---------------------------------------------------------------- side --- */
.co__side {
  position: sticky;
  top: calc(var(--nav-h) + 2rem);
  display: grid;
  gap: 2rem;
  justify-items: start;
}

.co__logo {
  width: auto;
  height: clamp(44px, 4.6vw, 62px);
  opacity: 0.85;
}

.co__values {
  display: grid;
  gap: 0;
  width: 100%;
  border-top: 1px solid rgba(20, 20, 24, 0.18);
}

.co__value {
  display: flex;
  gap: 1rem;
  padding-block: 0.95rem;
  border-bottom: 1px solid rgba(20, 20, 24, 0.12);
}

.co__vnum {
  font-family: var(--ui);
  font-size: 0.54rem;
  letter-spacing: 0.16em;
  color: rgba(20, 20, 24, 0.42);
  padding-top: 0.3rem;
  flex-shrink: 0;
}

.co__vtext {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--ink-800);
}

/* ------------------------------------------------------------ responsive --- */
@media (max-width: 900px) {
  .co__grid {
    grid-template-columns: 1fr;
    gap: 2.6rem;
  }

  .co__side {
    position: static;
    gap: 1.6rem;
  }

  .co__title {
    max-width: 20ch;
  }
}
</style>
