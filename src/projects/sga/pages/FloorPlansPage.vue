<template>
  <div class="page page--inner">
    <Navigation />
    <PageHead
      eyebrow="Residences"
      title="Floor Plans"
      lead="Four layouts in A Tower and two in B Tower — every area figure from the sanctioned statement, every plan from the brochure."
      crumbs="Floor Plans"
    />
    <FloorPlans />
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import PageHead from '../components/PageHead.vue'
import FloorPlans from '../components/FloorPlans.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
</script>
