<script setup>
import Navigation from './components/Navigation.vue'
import SiteFooter from './components/SiteFooter.vue'
import ContactDock from './components/ContactDock.vue'
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <Navigation />
  <main id="main">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <SiteFooter />
  <ContactDock />
</template>
