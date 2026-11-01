<template>
  <div class="page page--inner">
    <Navigation />
    <main>
      <Projects />
      <Walkthrough />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import Projects from '../components/Projects.vue'
import Walkthrough from '../components/Walkthrough.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
</script>
