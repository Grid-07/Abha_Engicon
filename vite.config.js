import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { scopeProjectCss } from './scripts/scope-css.mjs'

export default defineConfig({
  plugins: [vue()],
  base: '/Abha_Engicon/',
  server: { port: 3200 },
  // The two merged project stylesheets are scoped to a body class at build
  // time; see scripts/scope-css.mjs for why that is necessary.
  css: { postcss: { plugins: [scopeProjectCss()] } },
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
  },
})
