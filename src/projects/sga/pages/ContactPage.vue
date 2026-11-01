<template>
  <div class="page page--inner">
    <Navigation />
    <PageHead
      eyebrow="Contact"
      title="Talk to us"
      lead="Site office inside the project at Maghra, corporate office in Ranchi. Call, write, or send a message on WhatsApp."
      crumbs="Contact"
    />
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import PageHead from '../components/PageHead.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
</script>
