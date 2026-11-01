import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/Abha_Engicon/',
  server: { port: 3200 },
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
  },
})
