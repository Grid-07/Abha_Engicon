<script setup>
import { brand, contact, live, disclaimer } from '../data/company'
import { asset } from '../utils/asset'
import AppIcon from './AppIcon.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="ft" data-nav="dark">
    <div class="shell ft__top">
      <div class="ft__brand">
        <a href="#top" class="ft__mark" aria-label="Abha Engicon — top of page">
          <img
            class="ft__logo"
            :src="asset('images/brand/logo-cream.png')"
            alt=""
            width="581"
            height="233"
            aria-hidden="true"
          />
        </a>
        <p class="ft__tag">{{ brand.tagline }}</p>
        <a :href="`mailto:${contact.email}`" class="ft__mail">{{ contact.email }}</a>
      </div>

      <div class="ft__cols">
        <div class="ft__col">
          <p class="ft__h">Now selling</p>
          <!-- In-app routes now, not the standalone deployments: these are the
               same two projects, served from this domain. The arrow changes
               from the outbound "leaves the site" mark to a plain one. -->
          <router-link v-for="p in live" :key="p.slug" :to="p.route" class="ft__link">
            {{ p.name }}
            <AppIcon name="arrow" :size="11" />
          </router-link>
        </div>

        <div class="ft__col">
          <p class="ft__h">Company</p>
          <a href="#projects" class="ft__link">All projects</a>
          <a href="#company" class="ft__link">About Abha Engicon</a>
          <a href="#contact" class="ft__link">Contact</a>
        </div>

        <div class="ft__col">
          <p class="ft__h">Reach us</p>
          <a :href="`tel:${contact.phones[0].value}`" class="ft__link">{{ contact.phones[0].label }}</a>
          <a :href="`tel:${contact.phones[1].value}`" class="ft__link">{{ contact.phones[1].label }}</a>
          <a :href="contact.mapsUrl" target="_blank" rel="noopener" class="ft__link">
            Site office
            <AppIcon name="arrow-up-right" :size="11" />
          </a>
        </div>
      </div>
    </div>

    <div class="shell">
      <div class="ft__rule"></div>

      <div class="ft__legal">
        <p class="ft__disc">{{ disclaimer }}</p>
        <div class="ft__row">
          <span>© {{ year }} {{ brand.legal }} · All rights reserved.</span>
          <span class="ft__cred">{{ brand.credai }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ft {
  background: var(--ink-900);
  color: var(--sand-100);
  padding-block: clamp(3rem, 7vw, 5.5rem) 2rem;
}

.ft__top {
  display: grid;
  grid-template-columns: 1.1fr 1.4fr;
  gap: clamp(2.4rem, 6vw, 5rem);
  padding-bottom: clamp(2.4rem, 5vw, 3.6rem);
}

/* --------------------------------------------------------------- brand --- */
.ft__mark {
  display: block;
}

/* The company's own lockup, cream on the dark foot. It is 2.49:1, so the
   width is the only dimension worth setting. */
.ft__logo {
  display: block;
  width: clamp(230px, 26vw, 330px);
  height: auto;
}

.ft__tag {
  margin-top: 1.1rem;
  font-family: var(--display);
  font-size: 1.18rem;
  font-style: italic;
  color: rgba(243, 235, 221, 0.72);
  max-width: 22ch;
}

.ft__mail {
  display: inline-block;
  margin-top: 1.2rem;
  font-size: 0.9rem;
  color: rgba(243, 235, 221, 0.62);
  border-bottom: 1px solid rgba(243, 235, 221, 0.2);
  padding-bottom: 2px;
  transition: color 0.35s var(--ease), border-color 0.35s var(--ease);
}

.ft__mail:hover {
  color: var(--sand-200);
  border-color: var(--sand-200);
}

/* ---------------------------------------------------------------- cols --- */
.ft__cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.ft__h {
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(243, 235, 221, 0.4);
  margin-bottom: 1rem;
}

.ft__link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(243, 235, 221, 0.78);
  padding-block: 0.32rem;
  transition: color 0.35s var(--ease), transform 0.35s var(--ease);
}

.ft__link:hover {
  color: var(--sand-200);
  transform: translateX(2px);
}

.ft__link svg {
  opacity: 0.55;
  flex-shrink: 0;
}

/* --------------------------------------------------------------- legal --- */
.ft__rule {
  height: 1px;
  background: rgba(243, 235, 221, 0.14);
}

.ft__legal {
  display: grid;
  gap: 1.1rem;
  padding-top: 1.5rem;
}

.ft__disc {
  font-size: 0.68rem;
  line-height: 1.7;
  color: rgba(243, 235, 221, 0.34);
  max-width: 88ch;
}

.ft__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.6rem 1.5rem;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(243, 235, 221, 0.4);
}

.ft__cred {
  color: rgba(243, 235, 221, 0.3);
}

/* ------------------------------------------------------------ responsive --- */
@media (max-width: 900px) {
  .ft__top {
    grid-template-columns: 1fr;
    gap: 2.6rem;
  }
}

@media (max-width: 620px) {
  .ft__cols {
    grid-template-columns: 1fr 1fr;
    gap: 2rem 1.2rem;
  }

  .ft__col:first-child {
    grid-column: span 2;
  }
}
</style>
