<template>
  <section id="residences" class="section section--ink plans texture">
    <div class="shell shell--wide">
      <div class="plans__head">
        <div class="section-head">
          <span class="eyebrow">The Residences</span>
          <h2 class="h2">Six layouts across two towers</h2>
          <p class="lead">
            Every figure below is from the sanctioned area statement — carpet,
            balcony, built-up and super built-up. Switch towers to compare.
          </p>
        </div>

        <div class="towers" role="tablist" aria-label="Tower">
          <button
            v-for="t in towers"
            :key="t.id"
            role="tab"
            class="towers__btn"
            :class="{ 'is-active': activeTower.id === t.id }"
            :aria-selected="activeTower.id === t.id"
            @click="pickTower(t.id)"
          >
            <span class="towers__name">{{ t.name }}</span>
            <span class="towers__meta">{{ t.homes }} homes · {{ t.perFloor }} per floor</span>
          </button>
        </div>
      </div>

      <div class="explorer">
        <!-- Unit list -->
        <div class="explorer__list">
          <p class="explorer__label">Choose a home</p>
          <button
            v-for="(u, i) in activeTower.units"
            :key="u.no"
            class="unit"
            :class="{ 'is-active': i === activeIndex }"
            @click="select(i)"
          >
            <span class="unit__no">{{ u.no }}</span>
            <span class="unit__type">{{ u.type }}</span>
            <span class="unit__area">{{ sqft(u.sbua) }} sq ft</span>
            <span class="unit__mark" aria-hidden="true"></span>
          </button>

          <p class="explorer__note">
            {{ activeTower.name }} · {{ activeTower.floors }}
          </p>
        </div>

        <!-- Stage -->
        <div class="explorer__stage">
          <button class="stage" @click="lightbox = asset(currentUnit.iso)" aria-label="Enlarge the layout">
            <transition name="fade" mode="out-in">
              <img
                :key="currentUnit.iso"
                :src="asset(currentUnit.iso)"
                :alt="`Isometric interior view of ${activeTower.name} home ${currentUnit.no}, ${currentUnit.type}`"
                loading="lazy"
                decoding="async"
              />
            </transition>
            <span class="stage__zoom">
              <AppIcon name="expand" :size="15" />
              Enlarge
            </span>
            <span class="stage__tag">{{ activeTower.name }} · {{ currentUnit.no }}</span>
          </button>
        </div>

        <!-- Detail -->
        <div class="explorer__detail">
          <div class="detail__top">
            <span class="detail__no">{{ activeTower.id.toUpperCase() }}–{{ currentUnit.no }}</span>
            <h3 class="detail__type">{{ currentUnit.type }}</h3>
            <p class="detail__note">{{ currentUnit.note }}</p>
          </div>

          <div class="areas">
            <div v-for="a in areaRows" :key="a.key" class="area">
              <div class="area__head">
                <span class="area__label">{{ a.label }}</span>
                <span class="area__value num">{{ sqft(a.value) }}<em> sq ft</em></span>
              </div>
              <div class="area__track">
                <span class="area__fill" :style="{ width: a.pct + '%' }"></span>
              </div>
            </div>
          </div>

          <button class="btn btn--gold btn--block detail__cta" @click="enquire">
            <span>Enquire about this home</span>
            <AppIcon name="arrow" class="btn__arrow" :size="15" />
          </button>

          <p class="detail__fine">
            Areas as per RERA registration. Furniture layouts are indicative.
          </p>
        </div>
      </div>

      <!-- Floor plates -->
      <div class="plates">
        <div class="plates__head">
          <span class="eyebrow eyebrow--light">Floor Plates</span>
          <p>Typical floor plans, as printed in the brochure.</p>
        </div>
        <div class="plates__grid">
          <button
            v-for="t in towers"
            :key="t.id"
            class="plate"
            :class="{ 'plate--tall': t.id === 'a' }"
            @click="lightbox = asset(t.plan)"
          >
            <img :src="asset(t.plan)" :alt="`${t.name} typical floor plan`" loading="lazy" />
            <span class="plate__cap">
              <span>{{ t.name }}</span>
              <span>{{ t.floors }}</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <transition name="fade">
      <div v-if="lightbox" class="lightbox" @click.self="lightbox = ''">
        <button class="lightbox__close" aria-label="Close" @click="lightbox = ''">
          <AppIcon name="close" :size="22" />
        </button>
        <img :src="lightbox" alt="Enlarged layout" />
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from './AppIcon.vue'
import { asset, sqft } from '../utils/asset'
import { towers } from '../data/project'
import { setEnquiry } from '../store/enquiry'

const router = useRouter()

const activeTower = ref(towers[0])
const activeIndex = ref(0)
const lightbox = ref('')

const currentUnit = computed(() => activeTower.value.units[activeIndex.value])

const pickTower = (id) => {
  activeTower.value = towers.find((t) => t.id === id)
  activeIndex.value = 0
}

const select = (i) => {
  activeIndex.value = i
}

const maxSbua = computed(() => Math.max(...activeTower.value.units.map((u) => u.sbua)))

const areaRows = computed(() => {
  const u = currentUnit.value
  return [
    { key: 'carpet', label: 'RERA / Carpet area', value: u.carpet, pct: (u.carpet / maxSbua.value) * 100 },
    { key: 'balcony', label: 'Balcony area', value: u.balcony, pct: (u.balcony / maxSbua.value) * 100 },
    { key: 'bua', label: 'Built-up area', value: u.bua, pct: (u.bua / maxSbua.value) * 100 },
    { key: 'sbua', label: 'Super built-up', value: u.sbua, pct: (u.sbua / maxSbua.value) * 100 },
  ]
})

const enquire = () => {
  setEnquiry({
    tower: activeTower.value.name,
    unit: currentUnit.value.no,
    message: `I'd like to know more about ${currentUnit.value.type} (${currentUnit.value.no}) in ${activeTower.value.name} — ${sqft(currentUnit.value.sbua)} sq ft.`,
  })
  router.push({ path: '/shri-ganesh-arpan', hash: '#enquire' })
}

// Escape must close the enlarged layout, otherwise the overlay traps the page
const onKey = (e) => {
  if (e.key === 'Escape') lightbox.value = ''
}

watch(lightbox, (v) => {
  document.documentElement.classList.toggle('no-scroll', !!v)
  if (v) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.classList.remove('no-scroll')
})
</script>

<style scoped>
.plans {
  background: var(--ink-900);
}

.plans__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.plans__head .section-head {
  margin-bottom: 0;
  max-width: 640px;
}

/* --- Tower switch ------------------------------------------------------- */
.towers {
  display: inline-flex;
  gap: 0;
  border: 1px solid rgba(241, 233, 219, 0.18);
  padding: 4px;
  margin-bottom: 0.4rem;
}

.towers__btn {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.7rem 1.2rem;
  text-align: left;
  color: rgba(241, 233, 219, 0.6);
  transition: background 0.4s var(--ease), color 0.4s var(--ease);
}

.towers__btn.is-active {
  background: rgba(193, 160, 116, 0.14);
  color: var(--gold-100);
}

.towers__name {
  font-family: var(--font-display);
  font-size: 0.86rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.towers__meta {
  font-size: 0.56rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.65;
}

/* --- Explorer ----------------------------------------------------------- */
.explorer {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) 330px;
  gap: 1.1rem;
  margin-top: clamp(1.8rem, 3.5vw, 2.8rem);
  align-items: stretch;
}

.explorer__list,
.explorer__detail {
  display: flex;
  flex-direction: column;
  background: rgba(241, 233, 219, 0.035);
  border: 1px solid rgba(241, 233, 219, 0.1);
  padding: 1.1rem;
}

.explorer__label {
  font-size: 0.56rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.42);
  margin-bottom: 0.8rem;
}

.unit {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'no type'
    'no area';
  gap: 0.1rem 0.75rem;
  padding: 0.75rem 0.8rem;
  text-align: left;
  border-left: 1px solid rgba(241, 233, 219, 0.12);
  transition: background 0.35s var(--ease), border-color 0.35s var(--ease);
}

.unit + .unit {
  margin-top: 0.2rem;
}

.unit:hover {
  background: rgba(241, 233, 219, 0.05);
}

.unit.is-active {
  background: rgba(193, 160, 116, 0.1);
  border-left-color: var(--gold-400);
}

.unit__no {
  grid-area: no;
  align-self: center;
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--gold-300);
  letter-spacing: 0.04em;
  min-width: 2ch;
}

.unit__type {
  grid-area: type;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: rgba(241, 233, 219, 0.92);
}

.unit__area {
  grid-area: area;
  font-size: 0.64rem;
  letter-spacing: 0.06em;
  color: rgba(241, 233, 219, 0.45);
}

.explorer__note {
  margin-top: auto;
  padding-top: 1rem;
  font-size: 0.58rem;
  line-height: 1.6;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.35);
}

/* --- Stage -------------------------------------------------------------- */
.explorer__stage {
  min-width: 0;
  display: grid;
  place-items: center;
}

.stage {
  position: relative;
  display: block;
  width: min(100%, 520px);
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: #9d9d9f;
  border: 1px solid rgba(241, 233, 219, 0.12);
  cursor: zoom-in;
}

.stage img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 1.2s var(--ease);
}

.stage:hover img {
  transform: scale(1.03);
}

.stage__zoom {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  font-size: 0.55rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-100);
  background: rgba(10, 10, 12, 0.62);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(241, 233, 219, 0.2);
  z-index: 2;
}

.stage__tag {
  position: absolute;
  left: 0.9rem;
  bottom: 0.9rem;
  padding: 0.35rem 0.7rem;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold-100);
  background: rgba(10, 10, 12, 0.55);
  backdrop-filter: blur(8px);
  z-index: 2;
}

/* --- Detail ------------------------------------------------------------- */
.detail__no {
  font-size: 0.58rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold-500);
}

.detail__type {
  margin-top: 0.35rem;
  font-size: clamp(1.3rem, 2.2vw, 1.6rem);
  letter-spacing: 0.07em;
  color: var(--gold-100);
}

.detail__note {
  margin-top: 0.6rem;
  font-size: 0.82rem;
  line-height: 1.62;
  color: rgba(241, 233, 219, 0.6);
}

.areas {
  margin-top: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.area__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.6rem;
}

.area__label {
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.5);
}

.area__value {
  font-size: 0.9rem;
  color: var(--gold-200);
}

.area__value em {
  font-style: normal;
  font-size: 0.6rem;
  color: rgba(241, 233, 219, 0.4);
}

.area__track {
  height: 2px;
  margin-top: 0.4rem;
  background: rgba(241, 233, 219, 0.12);
  overflow: hidden;
}

.area__fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--gold-600), var(--gold-300));
  transition: width 0.9s var(--ease);
}

.detail__cta {
  margin-top: auto;
  padding-top: 1.6rem;
}

.detail__fine {
  margin-top: 0.7rem;
  font-size: 0.58rem;
  line-height: 1.55;
  letter-spacing: 0.06em;
  color: rgba(241, 233, 219, 0.35);
}

/* --- Floor plates ------------------------------------------------------- */
.plates {
  margin-top: clamp(2.4rem, 5vw, 4rem);
  padding-top: clamp(1.8rem, 3.5vw, 2.6rem);
  border-top: 1px solid rgba(241, 233, 219, 0.12);
}

.plates__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.4rem;
}

.plates__head p {
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: rgba(241, 233, 219, 0.45);
}

.plates__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.62fr) minmax(0, 1.38fr);
  gap: 1rem;
  align-items: start;
}

.plate {
  position: relative;
  display: block;
  overflow: hidden;
  background: #b9b9bb;
  border: 1px solid rgba(241, 233, 219, 0.12);
  cursor: zoom-in;
}

.plate img {
  width: 100%;
  height: 620px;
  object-fit: contain;
  background: #b9b9bb;
  transition: transform 1.2s var(--ease);
}

@media (max-width: 940px) {
  .plate img {
    height: 520px;
  }
}

.plate:hover img {
  transform: scale(1.02);
}

.plate__cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.7rem 0.9rem;
  background: linear-gradient(0deg, rgba(10, 10, 12, 0.88), rgba(10, 10, 12, 0));
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold-100);
}

.plate__cap span:last-child {
  color: rgba(241, 233, 219, 0.5);
  letter-spacing: 0.1em;
}

/* --- Lightbox ----------------------------------------------------------- */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 4vw, 3rem);
  background: rgba(6, 6, 8, 0.95);
  backdrop-filter: blur(6px);
}

.lightbox img {
  max-width: 100%;
  max-height: 92vh;
  object-fit: contain;
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6);
}

.lightbox__close {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(241, 233, 219, 0.25);
  color: var(--gold-100);
  transition: border-color 0.3s var(--ease), background 0.3s var(--ease);
}

.lightbox__close:hover {
  border-color: var(--gold-400);
  background: rgba(193, 160, 116, 0.14);
}

/* --- Transitions -------------------------------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 1120px) {
  .explorer {
    grid-template-columns: 200px minmax(0, 1fr) 290px;
  }
}

@media (max-width: 940px) {
  .explorer {
    grid-template-columns: minmax(0, 1fr);
  }

  .stage {
    width: min(100%, 460px);
    aspect-ratio: 4 / 5;
  }

  .explorer__list {
    order: -1;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
  }

  .explorer__label,
  .explorer__note {
    width: 100%;
    margin: 0 0 0.3rem;
    padding: 0;
  }

  .unit {
    flex: 1 1 42%;
    border-left: 0;
    border: 1px solid rgba(241, 233, 219, 0.14);
  }

  .unit + .unit {
    margin-top: 0;
  }

  .unit.is-active {
    border-color: var(--gold-400);
  }

  .plates__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .plate img,
  .plate--tall img {
    max-height: 520px;
  }
}

@media (max-width: 620px) {
  .plans__head {
    gap: 1.2rem;
  }

  .towers {
    width: 100%;
  }

  .towers__btn {
    flex: 1;
    padding: 0.6rem 0.7rem;
  }

  .towers__meta {
    font-size: 0.5rem;
  }

  .stage {
    width: 100%;
    aspect-ratio: 4 / 5;
  }

  .unit__no {
    font-size: 1rem;
  }

  .unit__type {
    font-size: 0.72rem;
  }

  .plates__head {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
