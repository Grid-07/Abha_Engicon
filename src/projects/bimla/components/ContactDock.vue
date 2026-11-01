<template>
  <!-- Desktop floating actions -->
  <div class="dock" aria-label="Quick contact">
    <a
      :href="`https://wa.me/${wa}?text=${encodeURIComponent(waText)}`"
      target="_blank"
      rel="noopener"
      class="dock__btn dock__btn--wa"
      aria-label="Chat on WhatsApp"
    >
      <AppIcon name="whatsapp" />
      <span class="dock__tip">WhatsApp us</span>
    </a>
    <a
      :href="`tel:${contact.phones[0].value}`"
      class="dock__btn dock__btn--call"
      aria-label="Call the site office"
    >
      <AppIcon name="phone" />
      <span class="dock__tip">{{ contact.phones[0].label }}</span>
    </a>
  </div>

  <!-- Mobile sticky action bar -->
  <nav class="bar" aria-label="Quick actions">
    <a :href="`tel:${contact.phones[0].value}`" class="bar__item">
      <AppIcon name="phone" />
      <span>Call</span>
    </a>
    <a
      :href="`https://wa.me/${wa}?text=${encodeURIComponent(waText)}`"
      target="_blank"
      rel="noopener"
      class="bar__item"
    >
      <AppIcon name="whatsapp" />
      <span>WhatsApp</span>
    </a>
    <a href="#enquire" class="bar__cta" @click.prevent="go">
      <span>Book a Visit</span>
    </a>
  </nav>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { contact } from '../data/project'

const wa = contact.phones[0].value
const waText =
  'Hi Abha Engicon — I saw the Bimla Mangal Gardens site and would like more details.'

const go = () => {
  const el = document.getElementById('enquire')
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 76
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* --- Desktop dock --- */
.dock {
  position: fixed;
  right: clamp(0.9rem, 2vw, 1.6rem);
  bottom: clamp(1rem, 3vw, 1.8rem);
  z-index: 800;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-end;
}

.dock__btn {
  position: relative;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5);
  transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
  font-size: 21px;
}

.dock__btn--wa {
  background: #1f9d55;
}

.dock__btn--call {
  background: var(--navy-800);
  border: 1px solid rgba(210, 175, 94, 0.45);
  color: var(--gold-300);
}

.dock__btn:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 18px 36px -12px rgba(0, 0, 0, 0.55);
}

.dock__tip {
  position: absolute;
  right: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%) translateX(6px);
  white-space: nowrap;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  background: var(--navy-900);
  color: var(--gold-200);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
  border: 1px solid rgba(210, 175, 94, 0.3);
}

.dock__btn:hover .dock__tip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* --- Mobile bar --- */
.bar {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 850;
  padding: 0.55rem 0.6rem calc(0.55rem + env(safe-area-inset-bottom));
  background: rgba(7, 18, 35, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(210, 175, 94, 0.28);
  gap: 0.45rem;
  align-items: center;
}

.bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: 0.35rem 0.6rem;
  color: var(--on-dark-soft);
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.bar__item svg {
  width: 19px;
  height: 19px;
  color: var(--gold-300);
}

.bar__cta {
  flex: 1;
  display: grid;
  place-items: center;
  min-height: 46px;
  border-radius: 999px;
  background: linear-gradient(100deg, var(--gold-600), var(--gold-400) 60%, var(--gold-300));
  color: var(--navy-900);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  box-shadow: 0 8px 20px -8px rgba(210, 175, 94, 0.8);
}

@media (max-width: 760px) {
  .dock {
    display: none;
  }

  .bar {
    display: flex;
  }
}
</style>
