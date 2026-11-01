<template>
  <div class="page page--inner">
    <Navigation />
    <PageHead
      eyebrow="The Parent Company"
      title="Abha Engicon"
      :lead="about.title"
      crumbs="About"
    />

    <section class="section section--ivory">
      <div class="shell">
        <div class="about__grid">
          <div class="about__mark" v-reveal:left>
            <img :src="asset('images/brochure/abha-logo-dark.png')" :alt="brand.parentFull" loading="lazy" />
            <span class="about__est">15 years · Biharsharif &amp; Ranchi</span>
          </div>

          <div class="about__body" v-reveal:right>
            <span class="eyebrow">Who we are</span>
            <p v-for="(p, i) in about.body" :key="i" class="about__para" :class="{ 'about__para--lead': i === 0 }">
              {{ p }}
            </p>

            <div class="about__stats">
              <div v-for="s in stats" :key="s.label">
                <span class="num">{{ s.value }}</span>
                <span>{{ s.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--ink texture">
      <div class="shell">
        <div class="vm">
          <article class="vm__card" v-reveal>
            <span class="vm__no num">01</span>
            <h2 class="h3">Vision</h2>
            <p>{{ about.vision }}</p>
          </article>
          <article class="vm__card" v-reveal="120">
            <span class="vm__no num">02</span>
            <h2 class="h3">Mission</h2>
            <p>{{ about.mission }}</p>
          </article>
        </div>

        <div class="values">
          <span class="eyebrow eyebrow--light">What we hold to</span>
          <ul>
            <li v-for="(v, i) in about.values" :key="v" v-reveal="i * 60">
              <span class="values__no num">{{ String(i + 1).padStart(2, '0') }}</span>
              {{ v }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section section--ivory-alt">
      <div class="shell">
        <div class="cta">
          <div>
            <span class="eyebrow">Shri Ganesh Arpan</span>
            <h2 class="h2 cta__title">Come and see the site</h2>
            <p class="lead">
              The site office is inside the project. Walk in any day between 10am
              and 7pm, or call ahead and we'll keep the drawings ready.
            </p>
          </div>
          <div class="cta__actions">
            <router-link :to="{ path: '/shri-ganesh-arpan', hash: '#enquire' }" class="btn btn--gold">
              <span>Book a visit</span>
              <AppIcon name="arrow" class="btn__arrow" :size="15" />
            </router-link>
            <router-link to="/shri-ganesh-arpan/floor-plans" class="btn btn--outline">
              <span>Floor plans</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import PageHead from '../components/PageHead.vue'
import Footer from '../components/Footer.vue'
import AppIcon from '../components/AppIcon.vue'
import { asset } from '../utils/asset'
import { about, brand, totalHomes } from '../data/project'

const stats = [
  { value: '15', label: 'Years building' },
  { value: '8', label: 'Developments delivered' },
  { value: String(totalHomes), label: 'Homes at Shri Ganesh Arpan' },
]
</script>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.about__mark {
  padding: 2rem;
  border: 1px solid var(--line);
  background: var(--ivory-50);
}

.about__mark img {
  width: 100%;
  max-width: 260px;
}

.about__est {
  display: block;
  margin-top: 1.6rem;
  font-size: 0.58rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold-700);
}

.about__para {
  margin-top: 1.1rem;
  font-size: 0.98rem;
  line-height: 1.82;
  color: var(--ink-soft);
  max-width: 66ch;
}

.about__para--lead {
  font-size: clamp(1.02rem, 1.5vw, 1.12rem);
  color: var(--ink);
}

.about__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.6rem;
  border-top: 1px solid var(--line);
}

.about__stats div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.about__stats .num {
  font-size: 1.7rem;
  color: var(--gold-600);
  line-height: 1;
}

.about__stats span:last-child {
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-muted);
  line-height: 1.5;
}

/* --- Vision / Mission --------------------------------------------------- */
.vm {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  background: rgba(241, 233, 219, 0.14);
  border: 1px solid rgba(241, 233, 219, 0.14);
}

.vm__card {
  position: relative;
  padding: clamp(1.6rem, 3vw, 2.4rem);
  background: var(--ink-900);
}

.vm__no {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--gold-600);
}

.vm__card h2 {
  margin-top: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--gold-200);
}

.vm__card p {
  margin-top: 0.9rem;
  font-size: 0.94rem;
  line-height: 1.8;
  color: rgba(241, 233, 219, 0.6);
}

/* --- Values ------------------------------------------------------------- */
.values {
  margin-top: clamp(2.4rem, 5vw, 3.6rem);
}

.values ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem 2rem;
  margin-top: 1.4rem;
}

.values li {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(241, 233, 219, 0.1);
  font-size: 0.9rem;
  color: rgba(241, 233, 219, 0.7);
}

.values__no {
  font-size: 0.6rem;
  color: var(--gold-600);
}

/* --- CTA ---------------------------------------------------------------- */
.cta {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.cta__title {
  margin-top: 0.9rem;
}

.cta .lead {
  margin-top: 1rem;
  max-width: 52ch;
}

.cta__actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 940px) {
  .about__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .about__mark {
    max-width: 320px;
  }

  .vm {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 600px) {
  .values ul {
    grid-template-columns: minmax(0, 1fr);
  }

  .about__stats {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.9rem;
  }

  .cta__actions {
    width: 100%;
  }

  .cta__actions .btn {
    flex: 1;
  }
}
</style>
