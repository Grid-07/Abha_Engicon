<script setup>
/**
 * The whole company lives on one page. Nothing in the nav leaves it — every
 * nav item is an anchor, and the only outbound links are the project sites
 * themselves (and the contact channels).
 */
import Hero from '../components/Hero.vue'
import Statement from '../components/Statement.vue'
import LiveProjects from '../components/LiveProjects.vue'
import CompanyIntro from '../components/CompanyIntro.vue'
import VisionMission from '../components/VisionMission.vue'
import ContactBlock from '../components/ContactBlock.vue'
</script>

<template>
  <Hero />
  <Statement />
  <LiveProjects />
  <CompanyIntro />
  <VisionMission />
  <ContactBlock />
</template>
