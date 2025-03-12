import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  "/api": "http://localhost:3000",
  "/auth": "http://localhost:3000"
})
