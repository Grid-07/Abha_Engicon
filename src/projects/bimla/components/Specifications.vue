<template>
  <section id="specifications" class="section section--navy specs texture">
    <div class="shell specs__grid">
      <div class="specs__intro">
        <p class="eyebrow" v-reveal>Specifications</p>
        <h2 class="h2 specs__title" v-reveal="60">Specified, not<br />left to chance</h2>
        <div class="rule" v-reveal="90"></div>
        <p class="lead specs__lead" v-reveal="120">
          Every finish is named — the tile brand, the door shutter, the switch plate.
          This is what is written into your agreement.
        </p>

        <div class="specs__note" v-reveal="150">
          <AppIcon name="shield" />
          <p>
            Brands shown are indicative; equivalent makes of the same grade may be used.
            Finishes are as per the specification sheet at the time of booking.
          </p>
        </div>

        <a href="#enquire" class="btn btn--ghost btn--sm specs__cta" @click.prevent="go('enquire')">
          <span>Request the full specification</span>
        </a>
      </div>

      <div class="specs__list">
        <div
          v-for="(group, i) in specifications"
          :key="group.title"
          class="spec"
          :class="{ 'is-open': openIndex === i }"
          v-reveal="i * 45"
        >
          <button
            class="spec__head"
            :aria-expanded="openIndex === i"
            @click="toggle(i)"
          >
            <span class="spec__index">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="spec__title">{{ group.title }}</span>
            <span class="spec__sign">
              <AppIcon :name="openIndex === i ? 'minus' : 'plus'" />
            </span>
          </button>

          <div class="spec__panel" :style="{ gridTemplateRows: openIndex === i ? '1fr' : '0fr' }">
            <div class="spec__inner">
              <dl>
                <div v-for="row in group.rows" :key="row[0]" class="spec__row">
                  <dt>{{ row[0] }}</dt>
                  <dd>{{ row[1] }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { specifications } from '../data/project'

const openIndex = ref(0)

const toggle = (i) => {
  openIndex.value = openIndex.value === i ? -1 : i
}

const go = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 76
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<style scoped>
.specs__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;
}

.specs__intro {
  position: sticky;
  top: calc(var(--nav-h) + 2rem);
}

.specs__title {
  color: #fff;
  margin-top: 0.9rem;
}

.specs__lead {
  margin-top: 1.3rem;
  color: var(--on-dark-soft);
  max-width: 40ch;
}

.specs__note {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.8rem;
  padding: 1rem 1.1rem;
  border-radius: var(--radius);
  border: 1px solid rgba(210, 175, 94, 0.25);
  background: rgba(210, 175, 94, 0.06);
}

.specs__note svg {
  width: 18px;
  height: 18px;
  color: var(--gold-400);
  flex-shrink: 0;
  margin-top: 2px;
}

.specs__note p {
  font-size: 0.76rem;
  line-height: 1.7;
  color: var(--on-dark-soft);
}

.specs__cta {
  margin-top: 1.6rem;
}

/* Accordion */
.specs__list {
  border-top: 1px solid rgba(243, 236, 223, 0.16);
}

.spec {
  border-bottom: 1px solid rgba(243, 236, 223, 0.16);
  transition: background 0.4s var(--ease);
}

.spec.is-open {
  background: rgba(243, 236, 223, 0.035);
}

.spec__head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 0.4rem;
  text-align: left;
  color: var(--on-dark);
  transition: color 0.3s var(--ease);
}

.spec__head:hover {
  color: var(--gold-300);
}

.spec__index {
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  color: var(--gold-600);
  width: 1.6rem;
  flex-shrink: 0;
}

.spec__title {
  font-family: var(--font-display);
  font-size: clamp(1.08rem, 2.2vw, 1.32rem);
  letter-spacing: 0.02em;
  flex: 1;
}

.spec__sign {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(210, 175, 94, 0.35);
  color: var(--gold-400);
  font-size: 13px;
  flex-shrink: 0;
  transition: transform 0.4s var(--ease), background 0.4s var(--ease);
}

.spec.is-open .spec__sign {
  background: rgba(210, 175, 94, 0.14);
  transform: rotate(180deg);
}

.spec__panel {
  display: grid;
  transition: grid-template-rows 0.5s var(--ease);
}

.spec__inner {
  overflow: hidden;
  min-height: 0;
}

.spec__row {
  display: grid;
  grid-template-columns: 128px 1fr;
  gap: 1rem;
  padding: 0.68rem 0.4rem 0.68rem 2.6rem;
  border-top: 1px dashed rgba(243, 236, 223, 0.12);
}

.spec__row:first-child {
  border-top: 0;
}

.spec__row:last-child {
  padding-bottom: 1.3rem;
}

.spec__row dt {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-500);
  padding-top: 2px;
}

.spec__row dd {
  font-size: 0.83rem;
  line-height: 1.7;
  color: var(--on-dark-soft);
}

@media (max-width: 900px) {
  .specs__grid {
    grid-template-columns: 1fr;
  }

  .specs__intro {
    position: static;
  }

  .specs__lead {
    max-width: none;
  }

  .spec__row {
    grid-template-columns: 1fr;
    gap: 0.25rem;
    padding-left: 0.4rem;
  }
}
</style>
