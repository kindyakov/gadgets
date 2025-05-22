import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Глобальные переменные или миксины (по необходимости)
        additionalData: `@use "./src/styles/settings/_variables.scss" as *;`,
      },
    },
  }
})
