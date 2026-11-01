<template>
  <footer class="footer">
    <div class="footer__ornament" aria-hidden="true"></div>

    <div class="shell">
      <div class="footer__top">
        <div class="footer__brand">
          <img
            :src="asset('images/brochure/abha-logo-light.png')"
            :alt="brand.parentFull"
            class="footer__logo"
            width="132"
            height="66"
            loading="lazy"
          />
          <p class="footer__project">{{ brand.name }}</p>
          <p class="footer__sub">{{ brand.sub }}</p>
          <p class="footer__credai">{{ brand.credai }}</p>
        </div>

        <div class="footer__col">
          <h4>Explore</h4>
          <router-link v-for="l in explore" :key="l.id" :to="{ path: '/shri-ganesh-arpan', hash: '#' + l.id }">
            {{ l.label }}
          </router-link>
        </div>

        <div class="footer__col">
          <h4>Company</h4>
          <router-link to="/shri-ganesh-arpan/about">About Abha Engicon</router-link>
          <router-link to="/shri-ganesh-arpan/projects">Previous Projects</router-link>
          <router-link to="/shri-ganesh-arpan/floor-plans">Floor Plans</router-link>
          <router-link to="/shri-ganesh-arpan/contact">Contact</router-link>
        </div>

        <div class="footer__col footer__col--contact">
          <h4>Reach us</h4>
          <a v-for="p in contact.phones" :key="p.value" :href="`tel:${p.value}`">{{ p.label }}</a>
          <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
          <p class="footer__addr">{{ contact.siteAddress }}</p>
        </div>
      </div>

      <div class="footer__disclaimer">
        <p>
          All details in this website are for easy information and concept purposes
          only, and do not form part of any agreement. This document is tentative
          and the promoter reserves the right to make variations and modifications.
          Areas stated are as per RERA registration.
        </p>
      </div>

      <!-- The group directory, now an internal one: all three entries are
           routes inside this site, so nothing here leaves the parent. -->
      <div class="footer__group">
        <div class="footer__group-id">
          <img
            :src="asset('images/brand/emblem-sand.png')"
            alt=""
            class="footer__group-mark"
            width="419"
            height="460"
            loading="lazy"
          />
          <p class="footer__group-label">Abha Engicon <span>Group</span></p>
        </div>

        <nav class="footer__group-links" aria-label="Abha Engicon group">
          <router-link
            v-for="s in group.sites"
            :key="s.id"
            :to="s.route"
            :class="{ 'is-here': s.id === 'sga' }"
            :aria-current="s.id === 'sga' ? 'page' : undefined"
          >
            {{ s.label }}
          </router-link>
        </nav>
      </div>

      <div class="footer__bottom">
        <p>© {{ year }} {{ brand.parentFull }}. All rights reserved.</p>
        <p class="footer__credit">Shri Ganesh Arpan · Biharsharif, Nalanda</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { asset } from '../utils/asset'
import { brand, contact } from '../data/project'
import { group } from '../data/group'

const year = new Date().getFullYear()

const explore = [
  { id: 'overview', label: 'Overview' },
  { id: 'residences', label: 'Residences' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'location', label: 'Location' },
]
</script>

<style scoped>
.footer {
  position: relative;
  background: var(--ink-950);
  color: rgba(241, 233, 219, 0.62);
  padding-top: clamp(3rem, 6vw, 4.5rem);
  overflow: hidden;
}

.footer__ornament {
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-600) 30%, var(--gold-400) 50%, var(--gold-600) 70%, transparent);
  opacity: 0.6;
}

.footer__top {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) repeat(3, minmax(0, 1fr));
  gap: clamp(1.8rem, 4vw, 3rem);
  padding-bottom: clamp(2rem, 4vw, 3rem);
}

/* --- Brand -------------------------------------------------------------- */
.footer__logo {
  width: 118px;
  height: auto;
  opacity: 0.92;
}

.footer__project {
  margin-top: 1.3rem;
  font-family: var(--font-display);
  font-size: 0.92rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-200);
}

.footer__sub {
  margin-top: 0.4rem;
  font-size: 0.56rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.38);
}

.footer__credai {
  margin-top: 1.1rem;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: var(--gold-600);
}

/* --- Columns ------------------------------------------------------------ */
.footer__col {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer__col h4 {
  font-family: var(--font-sans);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.4);
  margin-bottom: 0.4rem;
}

.footer__col a {
  font-size: 0.82rem;
  letter-spacing: 0.03em;
  color: rgba(241, 233, 219, 0.72);
  transition: color 0.3s var(--ease), transform 0.3s var(--ease);
  width: fit-content;
}

.footer__col a:hover {
  color: var(--gold-300);
  transform: translateX(3px);
}

.footer__addr {
  margin-top: 0.5rem;
  font-size: 0.74rem;
  line-height: 1.65;
  color: rgba(241, 233, 219, 0.4);
}

/* --- Disclaimer --------------------------------------------------------- */
.footer__disclaimer {
  padding-block: 1.3rem;
  border-top: 1px solid rgba(241, 233, 219, 0.1);
  border-bottom: 1px solid rgba(241, 233, 219, 0.1);
}

.footer__disclaimer p {
  font-size: 0.66rem;
  line-height: 1.75;
  color: rgba(241, 233, 219, 0.32);
  max-width: 100ch;
}

/* --- Group directory ---------------------------------------------------- */
.footer__group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem 2rem;
  flex-wrap: wrap;
  padding: 1.4rem 0;
  border-top: 1px solid rgba(241, 233, 219, 0.1);
}

.footer__group-id {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.footer__group-mark {
  width: auto;
  height: 22px;
  flex-shrink: 0;
  opacity: 0.8;
}

.footer__group-label {
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-indent: 0.24em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.7);
}

.footer__group-label span {
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  border-left: 1px solid rgba(193, 160, 116, 0.35);
  color: var(--gold-500);
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
  color: rgba(241, 233, 219, 0.55);
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

/* --- Bottom ------------------------------------------------------------- */
.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-block: 1.3rem 1.6rem;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: rgba(241, 233, 219, 0.34);
}

.footer__credit {
  color: rgba(193, 160, 116, 0.6);
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 940px) {
  .footer__top {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }

  .footer__brand {
    grid-column: span 2;
  }
}

@media (max-width: 560px) {
  .footer__top {
    grid-template-columns: minmax(0, 1fr);
  }

  .footer__brand {
    grid-column: span 1;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
