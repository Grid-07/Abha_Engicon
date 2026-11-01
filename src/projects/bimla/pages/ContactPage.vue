<template>
  <div class="page page--inner">
    <Navigation />
    <main>
      <Contact />
      <Location />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import Contact from '../components/Contact.vue'
import Location from '../components/Location.vue'
import Footer from '../components/Footer.vue'
</script>
