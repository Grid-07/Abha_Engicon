import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import reveal from './directives/reveal'
import { latticeUrl } from './utils/asset'
import './style.css'

document.documentElement.style.setProperty('--lattice', latticeUrl)

createApp(App).use(router).directive('reveal', reveal).mount('#app')
