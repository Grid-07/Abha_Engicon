<script setup>
import PageHead from '../components/PageHead.vue'
import LiveProjects from '../components/LiveProjects.vue'
import Portfolio from '../components/Portfolio.vue'
</script>

<template>
  <PageHead
    eyebrow="Portfolio"
    title="Every address we have built."
    lede="Twelve developments — two selling today, ten already handed over. Both live projects have their own site with plans, areas and walkthroughs."
  />
  <LiveProjects />
  <Portfolio />
</template>
