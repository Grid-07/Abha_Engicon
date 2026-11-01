<template>
  <div class="page page--inner">
    <Navigation />
    <main>
      <Overview />
      <Specifications />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import Overview from '../components/Overview.vue'
import Specifications from '../components/Specifications.vue'
import Projects from '../components/Projects.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
</script>
