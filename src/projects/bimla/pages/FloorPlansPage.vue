<template>
  <div class="page page--inner">
    <Navigation />
    <main>
      <FloorPlans />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import FloorPlans from '../components/FloorPlans.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
</script>
