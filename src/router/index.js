import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import { hasPending } from '../data/handoff'

/**
 * One domain, three experiences.
 *
 * The group page is the only route that renders the Abha Engicon chrome. Each
 * project is a nested route group that renders its own shell — its own
 * navigation, its own footer, its own contact dock — so a visitor who walks
 * through a project banner stays inside the same document and the hand-off
 * overlay can cover the change instead of the browser unloading the page.
 *
 * Project children are lazy so the first paint of the group page never pays
 * for two other sites, and their media is only fetched when a route asks for
 * it (everything lives under public/projects/<name>/).
 */

const BimlaShell = () => import('../projects/bimla/App.vue')
const SgaShell = () => import('../projects/sga/App.vue')

// Explicit rather than a template-literal import: Vite would have to glob the
// folder for that, and a missing page would fail silently at runtime instead
// of loudly at build time.
const bimla = {
  home: () => import('../projects/bimla/pages/HomePage.vue'),
  about: () => import('../projects/bimla/pages/AboutPage.vue'),
  projects: () => import('../projects/bimla/pages/ProjectsPage.vue'),
  floorPlans: () => import('../projects/bimla/pages/FloorPlansPage.vue'),
  contact: () => import('../projects/bimla/pages/ContactPage.vue'),
}

const sga = {
  home: () => import('../projects/sga/pages/HomePage.vue'),
  about: () => import('../projects/sga/pages/AboutPage.vue'),
  projects: () => import('../projects/sga/pages/ProjectsPage.vue'),
  floorPlans: () => import('../projects/sga/pages/FloorPlansPage.vue'),
  contact: () => import('../projects/sga/pages/ContactPage.vue'),
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { title: 'Abha Engicon — Homes in Biharsharif, Nalanda' },
  },

  {
    path: '/bimla-mangal-gardens',
    component: BimlaShell,
    meta: { project: 'bimla' },
    children: [
      {
        path: '',
        name: 'bimla',
        component: bimla.home,
        meta: { title: 'Bimal Mangal Gardens — A Home That You Deserve | Abha Engicon' },
      },
      {
        path: 'about',
        name: 'bimla-about',
        component: bimla.about,
        meta: { title: 'About Bimal Mangal Gardens | Abha Engicon' },
      },
      {
        path: 'projects',
        name: 'bimla-projects',
        component: bimla.projects,
        meta: { title: 'Projects — Bimal Mangal Gardens | Abha Engicon' },
      },
      {
        path: 'floor-plans',
        name: 'bimla-floor-plans',
        component: bimla.floorPlans,
        meta: { title: 'Floor Plans — Bimal Mangal Gardens | Abha Engicon' },
      },
      {
        path: 'contact',
        name: 'bimla-contact',
        component: bimla.contact,
        meta: { title: 'Contact — Bimal Mangal Gardens | Abha Engicon' },
      },
    ],
  },

  {
    path: '/shri-ganesh-arpan',
    component: SgaShell,
    meta: { project: 'sga' },
    children: [
      {
        path: '',
        name: 'sga',
        component: sga.home,
        meta: { title: 'Shri Ganesh Arpan — 2 & 3 BHK Homes in Biharsharif | Abha Engicon' },
      },
      {
        path: 'about',
        name: 'sga-about',
        component: sga.about,
        meta: { title: 'About — Shri Ganesh Arpan | Abha Engicon' },
      },
      {
        path: 'projects',
        name: 'sga-projects',
        component: sga.projects,
        meta: { title: 'Projects — Shri Ganesh Arpan | Abha Engicon' },
      },
      {
        path: 'floor-plans',
        name: 'sga-floor-plans',
        component: sga.floorPlans,
        meta: { title: 'Floor Plans — Shri Ganesh Arpan | Abha Engicon' },
      },
      {
        path: 'contact',
        name: 'sga-contact',
        component: sga.contact,
        meta: { title: 'Contact — Shri Ganesh Arpan | Abha Engicon' },
      },
    ],
  },

  // Old URLs from the multi-page version are folded back onto the section they
  // used to live at, so bookmarks keep working.
  { path: '/projects', redirect: '/#projects' },
  { path: '/about', redirect: '/#company' },
  { path: '/contact', redirect: '/#contact' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    // Coming back out of a project: LiveProjects replays the reverse hand-off
    // and restores the scroll position itself, so the router must keep its
    // hands off — a jump to the top here would shrink the cover onto a card
    // that is no longer where the visitor left it.
    if (to.name === 'home' && from.meta.project) {
      // Unless there is nothing to replay — a deep link straight into a project
      // leaves no record, and the group page would otherwise open at whatever
      // scroll offset the project page happened to be at.
      return hasPending() ? false : { top: 0, behavior: 'instant' }
    }

    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (saved) return saved

    // `instant`, not the default: `html { scroll-behavior: smooth }` would
    // otherwise animate the jump, and on the way into a project that means the
    // cover lifts on a page that is still scrolling itself up from the group
    // page's offset. The hero has to already be there when the cover goes.
    return { top: 0, behavior: 'instant' }
  },
})

router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title
})

export default router
