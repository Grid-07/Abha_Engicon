<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  lede: { type: String, default: '' },
})
</script>

<template>
  <header class="ph lattice">
    <div class="shell ph__inner">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <h1 class="ph__title">{{ title }}</h1>
      <p v-if="lede" class="ph__lede">{{ lede }}</p>
      <slot />
    </div>
  </header>
</template>

<style scoped>
.ph {
  position: relative;
  padding-top: calc(var(--nav-h) + clamp(3rem, 8vw, 6rem));
  padding-bottom: clamp(2.4rem, 6vw, 4.5rem);
  background: var(--sand-150);
  border-bottom: 1px solid rgba(20, 20, 24, 0.12);
  overflow: hidden;
}

.ph::before {
  opacity: 0.4;
}

.ph__inner {
  position: relative;
  display: grid;
  gap: 1.1rem;
  justify-items: start;
}

.ph__title {
  font-size: clamp(2.6rem, 7vw, 5.4rem);
  max-width: 20ch;
  text-wrap: balance;
}

.ph__lede {
  font-size: clamp(0.98rem, 1.3vw, 1.1rem);
  line-height: 1.72;
  color: var(--ink-700);
  max-width: 52ch;
}
</style>
