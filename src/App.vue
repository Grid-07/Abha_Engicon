<script setup>
/**
 * One document, three experiences.
 *
 * The group page is the only route that gets the Abha Engicon chrome. A
 * project route renders its own shell — its own navigation, footer and contact
 * dock — so the group chrome has to step out of the way entirely rather than
 * merely hide, or the visitor would see two headers stacked.
 *
 * Both project stylesheets are scoped to `body.site-<name>` at build time (see
 * scripts/scope-css.mjs). The class goes on <body>, not on a wrapper <div>,
 * because both projects teleport their drawers and lightboxes straight out of
 * the component tree — a wrapper would leave that markup outside the scope,
 * with none of the project's variables and none of its rules.
 */
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from './components/Navigation.vue'
import SiteFooter from './components/SiteFooter.vue'
import ContactDock from './components/ContactDock.vue'

const route = useRoute()

const project = computed(() => route.meta.project || null)

watch(
  project,
  (now, before) => {
    if (before) document.body.classList.remove(`site-${before}`)
    if (now) document.body.classList.add(`site-${now}`)
  },
  { immediate: true },
)
</script>

<template>
  <router-view v-if="project" />

  <template v-else>
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
</template>
