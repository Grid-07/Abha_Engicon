<template>
  <section id="residences" class="section section--navy residences texture">
    <div class="shell">
      <header class="section-head section-head--center on-dark" v-reveal>
        <p class="eyebrow">The Residences</p>
        <h2 class="h2">Eight homes to a floor,<br />every one a corner</h2>
        <div class="rule"></div>
        <p class="lead">
          Two blocks, a central passage and balconies on both faces — so no two homes
          look at the same wall. Choose a block and a home number to see its exact areas
          as printed in the brochure.
        </p>
      </header>

      <!-- Block switch -->
      <div class="switch" role="tablist" aria-label="Choose a block" v-reveal="60">
        <button
          v-for="b in blocks"
          :key="b.id"
          role="tab"
          :aria-selected="activeBlock === b.id"
          class="switch__btn"
          :class="{ 'is-active': activeBlock === b.id }"
          @click="selectBlock(b.id)"
        >
          <span class="switch__name">{{ b.name }}</span>
          <span class="switch__meta">{{ b.floors }}</span>
        </button>
      </div>

      <!-- Explorer -->
      <div class="explorer" v-reveal="100">
        <aside class="explorer__list">
          <p class="explorer__label">Select a home</p>
          <div class="unit-list">
            <button
              v-for="(u, i) in block.units"
              :key="u.no"
              class="unit"
              :class="{ 'is-active': unitIndex === i }"
              :aria-pressed="unitIndex === i"
              @click="unitIndex = i"
            >
              <span class="unit__no">{{ u.no }}</span>
              <span class="unit__body">
                <span class="unit__type">{{ u.type }}</span>
                <span class="unit__sba">{{ formatNumber(u.sba) }} sq ft</span>
              </span>
            </button>
          </div>
        </aside>

        <div class="explorer__stage">
          <Transition name="swap" mode="out-in">
            <img
              :key="`${block.id}-${unit.no}`"
              :src="asset(`images/brochure/flat-${block.id}${Number(unit.no)}.jpg`)"
              :alt="`Isometric interior view of ${block.name} home ${unit.no}, ${unit.type}`"
              class="explorer__img"
              loading="lazy"
              decoding="async"
            />
          </Transition>
          <div class="explorer__tag">
            <span>{{ block.name }}</span>
            <span class="explorer__tag-dot"></span>
            <span>Home {{ unit.no }}</span>
          </div>
          <span class="explorer__hint">Isometric 3D view</span>
        </div>

        <div class="explorer__detail">
          <p class="explorer__eyebrow">Configuration</p>
          <h3 class="explorer__title">{{ unit.type }}</h3>
          <p class="explorer__sub">Super built-up area <strong>{{ formatNumber(unit.sba) }}</strong> sq ft</p>

          <dl class="areas">
            <div v-for="row in areaRows" :key="row.key" class="area">
              <div class="area__top">
                <dt>{{ row.label }}</dt>
                <dd>{{ formatNumber(unit[row.key]) }} <em>sq ft</em></dd>
              </div>
              <div class="area__bar">
                <i :style="{ width: (unit[row.key] / maxSba) * 100 + '%' }"></i>
              </div>
            </div>
          </dl>

          <button class="btn btn--gold btn--block btn--sm" @click="enquireNow">
            <span>Enquire about this home</span>
          </button>
        </div>
      </div>

      <!-- Floor plans -->
      <div class="plans">
        <div class="plans__head" v-reveal>
          <div>
            <p class="eyebrow">Floor plans</p>
            <h3 class="h3">Read the plan, room by room</h3>
          </div>
          <p class="plans__note">Tap any plan to enlarge</p>
        </div>

        <div class="plans__thumbs" v-reveal="60">
          <button
            v-for="(p, i) in block.plans"
            :key="p.id"
            class="thumb"
            :class="{ 'is-active': planIndex === i }"
            @click="planIndex = i"
          >
            <img :src="asset(p.image)" :alt="p.label" loading="lazy" decoding="async" />
            <span>{{ p.label }}</span>
          </button>
        </div>

        <figure class="plans__viewer" v-reveal="100" @click="openLightbox(block.plans[planIndex].image, block.plans[planIndex].label)">
          <img
            :key="block.plans[planIndex].id"
            :src="asset(block.plans[planIndex].image)"
            :alt="block.plans[planIndex].label"
            loading="lazy"
            decoding="async"
          />
          <span class="plans__zoom">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16.5 16.5L21 21M11 8v6M8 11h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            Enlarge
          </span>
        </figure>
        <p class="plans__caption">{{ block.plans[planIndex].note }}</p>

        <!-- Retail table -->
        <div v-if="block.id === 'a'" class="retail" v-reveal>
          <div class="retail__head">
            <p class="eyebrow">The plan to add more to business</p>
            <h3 class="h3">Retail at the podium</h3>
          </div>
          <div class="retail__tables">
            <div class="table-wrap" v-for="t in retailTables" :key="t.title">
              <p class="table__title">{{ t.title }}</p>
              <table>
                <thead>
                  <tr><th>Shop</th><th>Size</th><th>SBA (sq ft)</th></tr>
                </thead>
                <tbody>
                  <tr v-for="s in t.rows" :key="s.no">
                    <td>{{ s.no }}</td>
                    <td class="muted">{{ s.size }}</td>
                    <td class="num">{{ formatNumber(s.sba) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="lightbox.open" class="lightbox" @click.self="closeLightbox" role="dialog" aria-modal="true">
          <button class="lightbox__close" @click="closeLightbox" aria-label="Close">
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          </button>
          <img :src="asset(lightbox.src)" :alt="lightbox.alt" class="lightbox__img" />
          <p class="lightbox__cap">{{ lightbox.alt }}</p>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { asset, formatNumber } from '../utils/asset'
import { blocks, shops } from '../data/project'
import { setEnquiry } from '../store/enquiry'

const activeBlock = ref('a')
const unitIndex = ref(0)
const planIndex = ref(0)
const lightbox = ref({ open: false, src: '', alt: '' })

const block = computed(() => blocks.find((b) => b.id === activeBlock.value))
const unit = computed(() => block.value.units[unitIndex.value])
const maxSba = computed(() => Math.max(...block.value.units.map((u) => u.sba)))

const areaRows = [
  { key: 'carpet', label: 'RERA / Carpet area' },
  { key: 'balcony', label: 'Balcony area' },
  { key: 'bua', label: 'Built-up area' },
  { key: 'sba', label: 'Super built-up area' },
]

const retailTables = [
  { title: 'Ground floor', rows: shops.ground },
  { title: 'First floor', rows: shops.first },
]

const selectBlock = (id) => {
  if (activeBlock.value === id) return
  activeBlock.value = id
  unitIndex.value = 0
  planIndex.value = 0
}

const scrollToEnquire = () => {
  const el = document.getElementById('enquire')
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 76
  window.scrollTo({ top, behavior: 'smooth' })
}

const enquireNow = () => {
  setEnquiry({
    block: block.value.name,
    unit: `Home ${unit.value.no} · ${unit.value.type} · ${formatNumber(unit.value.sba)} sq ft`,
    message: `I'd like details and pricing for ${block.value.name}, Home ${unit.value.no} (${unit.value.type}, ${formatNumber(unit.value.sba)} sq ft SBA).`,
  })
  scrollToEnquire()
}

const openLightbox = (src, alt) => {
  lightbox.value = { open: true, src, alt }
  document.body.classList.add('no-scroll')
}

const closeLightbox = () => {
  lightbox.value.open = false
  document.body.classList.remove('no-scroll')
}

const onKey = (e) => {
  if (e.key === 'Escape' && lightbox.value.open) closeLightbox()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.classList.remove('no-scroll')
})

watch(activeBlock, () => {
  planIndex.value = 0
})
</script>

<style scoped>
.residences {
  overflow: hidden;
}

.residences :deep(.lead) {
  color: var(--on-dark-soft);
}

/* Block switch */
.switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  max-width: 720px;
  margin: 0 auto clamp(1.8rem, 4vw, 2.8rem);
  padding: 0.4rem;
  border-radius: 999px;
  border: 1px solid rgba(210, 175, 94, 0.28);
  background: rgba(243, 236, 223, 0.04);
}

.switch__btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: 0.85rem 0.6rem;
  border-radius: 999px;
  color: var(--on-dark-soft);
  transition: background 0.45s var(--ease), color 0.35s var(--ease), box-shadow 0.45s var(--ease);
  text-align: center;
}

.switch__name {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.4vw, 1.22rem);
  letter-spacing: 0.06em;
}

.switch__meta {
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.6;
  line-height: 1.5;
}

.switch__btn.is-active {
  background: linear-gradient(100deg, var(--gold-600), var(--gold-400) 60%, var(--gold-300));
  color: var(--navy-900);
  box-shadow: var(--shadow-gold);
}

.switch__btn.is-active .switch__meta {
  opacity: 0.75;
}

/* Explorer */
.explorer {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) 292px;
  gap: 1.1rem;
  align-items: stretch;
  background: rgba(243, 236, 223, 0.045);
  border: 1px solid rgba(243, 236, 223, 0.12);
  border-radius: var(--radius-lg);
  padding: 1.1rem;
}

.explorer__list {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.explorer__label {
  font-size: 0.58rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
  margin-bottom: 0.75rem;
}

.unit-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  overflow-y: auto;
  max-height: 420px;
  padding-right: 4px;
  scrollbar-width: thin;
}

.unit {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.62rem 0.75rem;
  border-radius: 10px;
  border: 1px solid transparent;
  text-align: left;
  color: var(--on-dark-soft);
  transition: background 0.3s var(--ease), border-color 0.3s var(--ease), color 0.3s var(--ease);
}

.unit:hover {
  background: rgba(243, 236, 223, 0.06);
}

.unit.is-active {
  background: rgba(210, 175, 94, 0.14);
  border-color: rgba(210, 175, 94, 0.45);
  color: #fff;
}

.unit__no {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--gold-400);
  width: 1.9rem;
  flex-shrink: 0;
}

.unit__body {
  display: flex;
  flex-direction: column;
  line-height: 1.35;
  min-width: 0;
}

.unit__type {
  font-size: 0.76rem;
  letter-spacing: 0.06em;
}

.unit__sba {
  font-size: 0.64rem;
  color: var(--on-dark-faint);
}

/* Stage */
.explorer__stage {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--navy-800);
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.explorer__img {
  width: 100%;
  height: 100%;
  max-height: 460px;
  object-fit: contain;
}

.explorer__tag {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.36rem 0.8rem;
  border-radius: 999px;
  background: rgba(7, 18, 35, 0.72);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(210, 175, 94, 0.35);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold-200);
}

.explorer__tag-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--gold-500);
}

.explorer__hint {
  position: absolute;
  bottom: 0.75rem;
  right: 0.9rem;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(243, 236, 223, 0.42);
}

/* Detail */
.explorer__detail {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.4rem 0.3rem;
}

.explorer__eyebrow {
  font-size: 0.56rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--gold-500);
}

.explorer__title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 1.95rem);
  color: #fff;
  margin-top: 0.3rem;
}

.explorer__sub {
  font-size: 0.78rem;
  color: var(--on-dark-faint);
  margin-top: 0.2rem;
}

.explorer__sub strong {
  color: var(--gold-300);
  font-weight: 500;
}

.areas {
  margin: 1.15rem 0 1.25rem;
  display: grid;
  gap: 0.7rem;
}

.area__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.32rem;
}

.area__top dt {
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
}

.area__top dd {
  font-size: 0.84rem;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

.area__top dd em {
  font-style: normal;
  font-size: 0.62rem;
  color: var(--on-dark-faint);
}

.area__bar {
  height: 3px;
  border-radius: 99px;
  background: rgba(243, 236, 223, 0.12);
  overflow: hidden;
}

.area__bar i {
  display: block;
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, var(--gold-600), var(--gold-300));
  transition: width 0.7s var(--ease);
}

.explorer__detail .btn {
  margin-top: auto;
}

/* Plans */
.plans {
  margin-top: clamp(3rem, 6vw, 4.5rem);
}

.plans__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.4rem;
}

.plans__head .h3 {
  color: #fff;
  margin-top: 0.6rem;
}

.plans__note {
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
}

.plans__thumbs {
  display: flex;
  gap: 0.7rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  scroll-snap-type: x mandatory;
}

.thumb {
  flex: 0 0 auto;
  width: 132px;
  scroll-snap-align: start;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(243, 236, 223, 0.14);
  background: rgba(243, 236, 223, 0.05);
  text-align: left;
  transition: border-color 0.35s var(--ease), transform 0.35s var(--ease);
}

.thumb img {
  width: 100%;
  height: 84px;
  object-fit: cover;
  object-position: top;
  opacity: 0.7;
  transition: opacity 0.35s var(--ease);
}

.thumb span {
  display: block;
  padding: 0.5rem 0.6rem;
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--on-dark-soft);
  line-height: 1.4;
}

.thumb.is-active {
  border-color: var(--gold-500);
  transform: translateY(-2px);
}

.thumb.is-active img,
.thumb:hover img {
  opacity: 1;
}

.plans__viewer {
  position: relative;
  width: 100%;
  max-width: 680px;
  margin-inline: auto;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--cream-50);
  cursor: zoom-in;
  border: 1px solid rgba(243, 236, 223, 0.16);
  box-shadow: var(--shadow-lg);
}

.plans__viewer img {
  width: 100%;
  height: auto;
  display: block;
}

.plans__zoom {
  position: absolute;
  right: 0.9rem;
  bottom: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: rgba(7, 18, 35, 0.78);
  backdrop-filter: blur(8px);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-200);
  border: 1px solid rgba(210, 175, 94, 0.35);
}

.plans__zoom svg {
  width: 13px;
  height: 13px;
}

.plans__caption {
  margin-top: 0.9rem;
  font-size: 0.8rem;
  color: var(--on-dark-faint);
  max-width: 78ch;
  line-height: 1.7;
}

/* Retail */
.retail {
  margin-top: clamp(2.6rem, 5vw, 3.6rem);
  padding-top: clamp(2rem, 4vw, 2.8rem);
  border-top: 1px solid rgba(243, 236, 223, 0.12);
}

.retail__head .h3 {
  color: #fff;
  margin-top: 0.6rem;
}

.retail__tables {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
  margin-top: 1.5rem;
}

.table__title {
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold-500);
  margin-bottom: 0.6rem;
}

.table-wrap table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}

.table-wrap th {
  text-align: left;
  font-weight: 400;
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
  padding: 0.5rem 0.4rem;
  border-bottom: 1px solid rgba(243, 236, 223, 0.16);
}

.table-wrap td {
  padding: 0.62rem 0.4rem;
  border-bottom: 1px solid rgba(243, 236, 223, 0.08);
  color: var(--on-dark);
}

.table-wrap td.muted {
  color: var(--on-dark-faint);
  font-size: 0.74rem;
}

.table-wrap td.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--gold-300);
}

.table-wrap th:last-child {
  text-align: right;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(4, 10, 20, 0.94);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vw, 2.5rem);
  gap: 0.9rem;
}

.lightbox__img {
  max-width: 100%;
  max-height: 84vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
}

.lightbox__cap {
  font-size: 0.66rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(243, 236, 223, 0.6);
  text-align: center;
}

.lightbox__close {
  position: absolute;
  top: calc(1rem + env(safe-area-inset-top));
  right: 1rem;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(243, 236, 223, 0.25);
  color: var(--on-dark);
  display: grid;
  place-items: center;
}

.lightbox__close svg {
  width: 20px;
  height: 20px;
}

/* Transitions */
.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.32s var(--ease), transform 0.32s var(--ease);
}

.swap-enter-from {
  opacity: 0;
  transform: scale(0.985);
}

.swap-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s var(--ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1080px) {
  .explorer {
    grid-template-columns: 1fr 280px;
    grid-template-areas:
      'stage detail'
      'list list';
  }

  .explorer__stage { grid-area: stage; }
  .explorer__detail { grid-area: detail; }
  .explorer__list { grid-area: list; }

  .unit-list {
    flex-direction: row;
    overflow-x: auto;
    max-height: none;
    gap: 0.4rem;
    padding-bottom: 0.3rem;
  }

  .unit {
    flex: 0 0 auto;
    min-width: 128px;
    border: 1px solid rgba(243, 236, 223, 0.14);
  }
}

@media (max-width: 760px) {
  .explorer {
    grid-template-columns: 1fr;
    grid-template-areas:
      'list'
      'stage'
      'detail';
    padding: 0.8rem;
  }

  .explorer__label {
    margin-bottom: 0.5rem;
  }

  .explorer__stage {
    min-height: 260px;
  }

  .explorer__img {
    max-height: 340px;
  }

  .switch {
    border-radius: var(--radius);
  }

  .switch__btn {
    border-radius: 12px;
    padding: 0.75rem 0.5rem;
  }

  .switch__meta {
    font-size: 0.52rem;
  }

  .retail__tables {
    grid-template-columns: 1fr;
  }

  .plans__viewer img {
    max-height: 62vh;
  }

  .table-wrap td,
  .table-wrap th {
    padding: 0.5rem 0.3rem;
    font-size: 0.76rem;
  }
}
</style>
