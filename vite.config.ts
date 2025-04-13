import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
  },
  resolve: {
    alias: {
      "@modules": path.resolve(__dirname, "./src/modules"),	
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
    }
  }
})
