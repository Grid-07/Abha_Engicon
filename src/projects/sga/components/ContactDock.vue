<template>
  <div class="dock">
    <a class="dock__btn" :href="`tel:${contact.phones[0].value}`">
      <AppIcon name="phone" :size="17" />
      <span>Call</span>
    </a>
    <a class="dock__btn" :href="waLink" target="_blank" rel="noopener">
      <AppIcon name="whatsapp" :size="17" />
      <span>WhatsApp</span>
    </a>
    <router-link :to="{ path: '/shri-ganesh-arpan', hash: '#enquire' }" class="dock__btn dock__btn--gold">
      <AppIcon name="key" :size="17" />
      <span>Enquire</span>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { brand, contact } from '../data/project'

const waLink = computed(
  () =>
    `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
      `Hello ${brand.parent}, I'd like to know more about ${brand.name}.`
    )}`
)
</script>

<style scoped>
.dock {
  display: none;
}

@media (max-width: 760px) {
  .dock {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 80;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: rgba(10, 10, 12, 0.94);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid rgba(193, 160, 116, 0.28);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .dock__btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.28rem;
    min-height: 58px;
    font-size: 0.56rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(241, 233, 219, 0.72);
    border-right: 1px solid rgba(241, 233, 219, 0.08);
  }

  .dock__btn:last-child {
    border-right: 0;
  }

  .dock__btn--gold {
    background: linear-gradient(100deg, var(--gold-600), var(--gold-400) 60%, var(--gold-300));
    color: var(--ink-900);
    font-weight: 500;
  }

  .dock__btn:active {
    opacity: 0.82;
  }
}
</style>
