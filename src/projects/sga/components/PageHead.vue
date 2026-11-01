<template>
  <header class="page-head texture">
    <div class="shell">
      <span class="eyebrow eyebrow--light">{{ eyebrow }}</span>
      <h1 class="page-head__title">{{ title }}</h1>
      <p v-if="lead" class="page-head__lead">{{ lead }}</p>
      <nav v-if="crumbs" class="page-head__crumbs" aria-label="Breadcrumb">
        <router-link to="/shri-ganesh-arpan">Home</router-link>
        <span aria-hidden="true">/</span>
        <span>{{ crumbs }}</span>
      </nav>
    </div>
  </header>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  crumbs: { type: String, default: '' },
})
</script>

<style scoped>
.page-head {
  position: relative;
  background: var(--ink-900);
  color: var(--on-dark);
  padding-block: clamp(3rem, 7vw, 5.5rem) clamp(2.4rem, 5vw, 3.6rem);
  border-bottom: 1px solid rgba(193, 160, 116, 0.2);
}

.page-head::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-600), transparent);
  opacity: 0.5;
}

.page-head__title {
  margin-top: 1rem;
  font-size: clamp(2rem, 5.2vw, 3.6rem);
  letter-spacing: 0.055em;
  color: var(--gold-100);
  text-transform: uppercase;
  line-height: 1.1;
}

.page-head__lead {
  margin-top: 1rem;
  max-width: 60ch;
  font-size: clamp(0.95rem, 1.4vw, 1.06rem);
  line-height: 1.78;
  color: rgba(241, 233, 219, 0.66);
}

.page-head__crumbs {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1.6rem;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(241, 233, 219, 0.4);
}

.page-head__crumbs a:hover {
  color: var(--gold-300);
}

.page-head__crumbs span:last-child {
  color: var(--gold-500);
}
</style>
