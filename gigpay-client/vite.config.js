import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: process.env.NODE_ENV === 'production' 
      ? ['all'] 
      : ['localhost', '127.0.0.1']
  }
})