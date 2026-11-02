<template>
  <footer class="footer">
    <div class="shell">
      <div class="footer__top">
        <div class="footer__brand">
          <img
            :src="asset('images/brand/logo-cream.png')"
            alt="Abha Engicon"
            class="footer__mark"
            width="581"
            height="233"
            loading="lazy"
          />
          <p class="footer__brand-sub">Pvt. Ltd. · Since {{ new Date().getFullYear() - brand.years }}</p>
        </div>

        <p class="footer__motto">{{ brand.motto }}</p>
      </div>

      <div class="footer__cols">
        <div class="footer__col">
          <h4>The project</h4>
          <a href="#residences" @click.prevent="go('residences')">Residences</a>
          <a href="#amenities" @click.prevent="go('amenities')">Amenities</a>
          <a href="#specifications" @click.prevent="go('specifications')">Specifications</a>
          <a href="#location" @click.prevent="go('location')">Location</a>
          <a href="#projects" @click.prevent="go('projects')">Previous projects</a>
        </div>

        <div class="footer__col">
          <h4>Visit</h4>
          <p>{{ contact.siteAddress }}</p>
          <p class="footer__muted">{{ contact.siteOffice }}</p>
        </div>

        <div class="footer__col">
          <h4>Talk to us</h4>
          <a v-for="p in contact.phones" :key="p.value" :href="`tel:${p.value}`">{{ p.label }}</a>
          <a :href="`mailto:${contact.email}`" class="footer__mail">{{ contact.email }}</a>
        </div>
      </div>

      <p class="footer__word">Bimla Mangal Gardens</p>

      <!-- The group directory, now an internal one: all three entries are
           routes inside this site, so nothing here leaves the parent. -->
      <div class="footer__group">
        <div class="footer__group-id">
          <img
            :src="asset('images/brand/logo-cream.png')"
            alt="Abha Engicon Group"
            class="footer__group-mark"
            width="581"
            height="233"
            loading="lazy"
          />
        </div>

        <nav class="footer__group-links" aria-label="Abha Engicon group">
          <router-link
            v-for="s in group.sites"
            :key="s.id"
            :to="s.route"
            :class="{ 'is-here': s.id === 'bimal' }"
            :aria-current="s.id === 'bimal' ? 'page' : undefined"
          >
            {{ s.label }}
          </router-link>
        </nav>
      </div>

      <div class="footer__legal">
        <p>
          &copy; {{ new Date().getFullYear() }} Abha Engicon Pvt. Ltd. All rights reserved.
          <span class="footer__credai">{{ brand.credai }}</span>
        </p>
        <p class="footer__disc">
          All details in this site are for information and concept purposes only and do not
          form part of any agreement. Images are artistic impressions.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { asset } from '../utils/asset'
import { brand, contact } from '../data/project'
import { group } from '../data/group'

const go = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 76
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  background: var(--navy-950);
  color: var(--on-dark);
  padding: clamp(3rem, 6vw, 4.5rem) 0 calc(1.6rem + env(safe-area-inset-bottom));
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(80% 60% at 50% 0%, rgba(210, 175, 94, 0.1), transparent 70%);
  pointer-events: none;
}

.footer > * {
  position: relative;
}

.footer__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(243, 236, 223, 0.12);
}

/* The lockup is the brand now, so the block stacks instead of sitting side by
   side: mark on top, the legal line under it. The mark is 2.49:1, so height is
   the only dimension worth setting. */
.footer__brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.7rem;
}

.footer__mark {
  width: auto;
  height: 38px;
}

.footer__brand-sub {
  font-size: 0.56rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--on-dark-faint);
}

.footer__motto {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(0.95rem, 2vw, 1.2rem);
  color: var(--on-dark-soft);
  text-align: right;
}

.footer__cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  padding: 2.2rem 0;
}

.footer__col h4 {
  font-size: 0.58rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold-500);
  font-family: var(--font-sans);
  font-weight: 500;
  margin-bottom: 0.9rem;
}

.footer__col a,
.footer__col p {
  display: block;
  font-size: 0.82rem;
  line-height: 1.7;
  color: var(--on-dark-soft);
  margin-bottom: 0.5rem;
  transition: color 0.3s var(--ease);
}

.footer__col a:hover {
  color: var(--gold-300);
}

.footer__muted {
  opacity: 0.62;
  font-size: 0.76rem !important;
}

.footer__mail {
  word-break: break-word;
}

.footer__word {
  font-family: var(--font-display);
  font-size: clamp(2rem, 8vw, 5.2rem);
  line-height: 1;
  letter-spacing: 0.02em;
  text-align: center;
  color: transparent;
  -webkit-text-stroke: 1px rgba(210, 175, 94, 0.28);
  padding: 1.2rem 0 1.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

/* ------------------------------------------------------- group directory --- */
.footer__group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem 2rem;
  flex-wrap: wrap;
  padding: 1.4rem 0;
  border-top: 1px solid rgba(243, 236, 223, 0.12);
}

.footer__group-id {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

/* The lockup is 2.49:1, so it is set by height. 30px is as small as it goes
   before the ENGICON line stops reading as letters. */
.footer__group-mark {
  width: auto;
  height: 30px;
  flex-shrink: 0;
  opacity: 0.9;
}

.footer__group-links {
  display: flex;
  align-items: center;
  gap: 0.5rem 1.5rem;
  flex-wrap: wrap;
}

.footer__group-links a {
  position: relative;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(243, 236, 223, 0.55);
  transition: color 0.3s var(--ease);
}

.footer__group-links a:hover {
  color: var(--gold-300);
}

.footer__group-links a.is-here {
  color: var(--gold-300);
}

.footer__group-links a.is-here::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -5px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.footer__legal {
  border-top: 1px solid rgba(243, 236, 223, 0.12);
  padding-top: 1.4rem;
  display: grid;
  gap: 0.6rem;
}

.footer__legal p {
  font-size: 0.68rem;
  line-height: 1.7;
  color: var(--on-dark-faint);
}

.footer__credai {
  display: inline-block;
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  border-left: 1px solid rgba(243, 236, 223, 0.2);
}

.footer__disc {
  max-width: 72ch;
  opacity: 0.72;
}

@media (max-width: 780px) {
  .footer {
    padding-bottom: calc(86px + env(safe-area-inset-bottom));
  }

  .footer__top {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .footer__motto {
    text-align: left;
  }

  .footer__cols {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }

  .footer__word {
    white-space: normal;
    padding-bottom: 1.2rem;
  }

  .footer__credai {
    display: block;
    margin-left: 0;
    padding-left: 0;
    border-left: 0;
    margin-top: 0.3rem;
  }
}
</style>
