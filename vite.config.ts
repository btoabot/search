import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // chunks optimization
  build: {
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Bundle third-party libraries separately
          react: ['react'],
          reactDom: ['react-dom']
        },
        format: 'es',
        entryFileNames: 'main-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
        chunkFileNames: '[name]-[hash].js',
      },
    },
  },
})