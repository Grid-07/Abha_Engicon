<template>
  <section id="specifications" class="section section--ink specs texture">
    <div class="shell">
      <div class="section-head">
        <span class="eyebrow">Specifications</span>
        <h2 class="h2">Built to a specification, not to a price</h2>
        <p class="lead">
          The full schedule from the brochure — structure, services and finishes,
          written the way the drawings were drawn.
        </p>
      </div>

      <div class="specs__grid">
        <div class="acc" v-reveal>
          <div v-for="(s, i) in specifications" :key="s.title" class="acc__item" :class="{ 'is-open': open === i }">
            <button class="acc__head" :aria-expanded="open === i" @click="toggle(i)">
              <span class="acc__icon">
                <AppIcon :name="s.icon" :size="20" />
              </span>
              <span class="acc__title">{{ s.title }}</span>
              <span class="acc__sign" aria-hidden="true">
                <AppIcon :name="open === i ? 'minus' : 'plus'" :size="15" />
              </span>
            </button>
            <div class="acc__panel" :style="{ height: open === i ? heights[i] + 'px' : '0px' }">
              <ul class="acc__list" :ref="(el) => setPanel(el, i)">
                <li v-for="item in s.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>

        <aside class="salient" v-reveal:right>
          <span class="eyebrow eyebrow--light">Salient Features</span>
          <ul class="salient__list">
            <li v-for="s in salient" :key="s">
              <AppIcon name="check" :size="13" />
              <span>{{ s }}</span>
            </li>
          </ul>

          <div class="salient__seal">
            <img :src="asset('images/brochure/emblem-gold.png')" alt="" width="34" height="34" />
            <div>
              <strong>RERA approved</strong>
              <span>{{ brand.credai }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted } from 'vue'
import AppIcon from './AppIcon.vue'
import { asset } from '../utils/asset'
import { specifications, salient, brand } from '../data/project'

const open = ref(0)
const heights = reactive(specifications.map(() => 0))
const panels = reactive([])

const setPanel = (el, i) => {
  if (el) panels[i] = el
}

const measure = () => {
  panels.forEach((el, i) => {
    if (el) heights[i] = el.scrollHeight
  })
}

const toggle = (i) => {
  open.value = open.value === i ? -1 : i
  nextTick(measure)
}

onMounted(() => {
  measure()
  window.addEventListener('resize', measure)
})
</script>

<style scoped>
.specs__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
  gap: clamp(1.6rem, 4vw, 3.4rem);
  align-items: start;
}

/* --- Accordion ---------------------------------------------------------- */
.acc {
  border-top: 1px solid rgba(241, 233, 219, 0.14);
}

.acc__item {
  border-bottom: 1px solid rgba(241, 233, 219, 0.14);
}

.acc__head {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  width: 100%;
  padding: 1.05rem 0.2rem;
  text-align: left;
  color: rgba(241, 233, 219, 0.85);
  transition: color 0.35s var(--ease);
}

.acc__head:hover {
  color: var(--gold-200);
}

.acc__item.is-open .acc__head {
  color: var(--gold-200);
}

.acc__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(241, 233, 219, 0.16);
  color: var(--gold-400);
  transition: border-color 0.35s var(--ease);
}

.acc__item.is-open .acc__icon {
  border-color: var(--gold-line);
}

.acc__title {
  font-family: var(--font-heading);
  font-size: clamp(1.06rem, 1.8vw, 1.28rem);
  font-weight: 600;
  letter-spacing: 0.005em;
}

.acc__sign {
  margin-left: auto;
  color: var(--gold-500);
}

.acc__panel {
  height: 0;
  overflow: hidden;
  transition: height 0.55s var(--ease);
}

.acc__list {
  padding: 0 0.2rem 1.2rem 3.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.acc__list li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(241, 233, 219, 0.62);
}

.acc__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 5px;
  height: 1px;
  background: var(--gold-600);
}

/* --- Salient ------------------------------------------------------------ */
.salient {
  position: sticky;
  top: calc(var(--nav-h) + 1.5rem);
  padding: clamp(1.4rem, 2.6vw, 2rem);
  border: 1px solid rgba(241, 233, 219, 0.14);
  background: rgba(241, 233, 219, 0.035);
}

.salient__list {
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.salient__list li {
  display: flex;
  gap: 0.65rem;
  font-size: 0.86rem;
  line-height: 1.55;
  color: rgba(241, 233, 219, 0.7);
}

.salient__list svg {
  margin-top: 0.35rem;
  color: var(--gold-500);
}

.salient__seal {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.5rem;
  padding-top: 1.3rem;
  border-top: 1px solid rgba(241, 233, 219, 0.12);
}

.salient__seal img {
  width: 30px;
  height: auto;
  opacity: 0.9;
}

.salient__seal strong {
  display: block;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-200);
}

.salient__seal span {
  display: block;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: rgba(241, 233, 219, 0.45);
  margin-top: 0.2rem;
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 940px) {
  .specs__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .salient {
    position: static;
  }
}

@media (max-width: 560px) {
  .acc__head {
    gap: 0.7rem;
    padding: 0.9rem 0;
  }

  .acc__icon {
    width: 32px;
    height: 32px;
  }

  .acc__list {
    padding-left: 0.4rem;
  }
}
</style>
