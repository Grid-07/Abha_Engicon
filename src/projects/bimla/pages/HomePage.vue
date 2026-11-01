<template>
  <div class="page">
    <Navigation />
    <main>
      <Hero />
      <Overview />
      <FloorPlans />
      <Amenities />
      <Specifications />
      <Walkthrough />
      <Location />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import Hero from '../components/Hero.vue'
import Overview from '../components/Overview.vue'
import FloorPlans from '../components/FloorPlans.vue'
import Amenities from '../components/Amenities.vue'
import Specifications from '../components/Specifications.vue'
import Walkthrough from '../components/Walkthrough.vue'
import Location from '../components/Location.vue'
import Projects from '../components/Projects.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
</script>
