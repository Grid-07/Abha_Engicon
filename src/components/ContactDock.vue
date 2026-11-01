<script setup>
import { contact } from '../data/company'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <div class="dock">
    <a :href="`tel:${contact.phones[0].value}`" class="dock__btn">
      <AppIcon name="phone" :size="16" />
      <span>Call</span>
    </a>
    <a
      :href="`https://wa.me/${contact.whatsapp}`"
      target="_blank"
      rel="noopener"
      class="dock__btn"
    >
      <AppIcon name="whatsapp" :size="16" />
      <span>WhatsApp</span>
    </a>
    <a href="#contact" class="dock__btn dock__btn--solid">
      <span>Book a visit</span>
    </a>
  </div>
</template>

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
    z-index: 90;
    display: grid;
    grid-template-columns: 1fr 1fr 1.4fr;
    gap: 1px;
    background: var(--line);
    border-top: 1px solid var(--line);
    padding-bottom: env(safe-area-inset-bottom);
    backdrop-filter: blur(10px);
  }

  .dock__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    height: 62px;
    background: rgba(251, 247, 240, 0.96);
    color: var(--ink-900);
    font-size: 0.58rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .dock__btn--solid {
    background: var(--ink-900);
    color: var(--sand-100);
  }

  .dock__btn:active {
    opacity: 0.85;
  }
}
</style>
