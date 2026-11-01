import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

// One page, four anchors. Old URLs from the multi-page version are folded
// back onto the section they used to live at, so bookmarks keep working.
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { title: 'Abha Engicon — Homes in Biharsharif, Nalanda' },
  },
  { path: '/projects', redirect: '/#projects' },
  { path: '/about', redirect: '/#company' },
  { path: '/contact', redirect: '/#contact' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    // html { scroll-padding-top } already clears the fixed header.
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (saved) return saved
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title
})

export default router
