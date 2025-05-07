import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // Simula el entorno del navegador
    setupFiles: '/src/tests/setup.ts' // Archivo de configuración inicial
  }
})
