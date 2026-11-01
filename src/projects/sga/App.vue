<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <ContactDock />
</template>

<script setup>
import ContactDock from './components/ContactDock.vue'
// This project's own stylesheet. It is rewritten at build time so every rule
// hangs off body.site-sga; see scripts/scope-css.mjs.
import './style.css'
</script>
