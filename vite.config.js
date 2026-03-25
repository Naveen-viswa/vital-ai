// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    exclude: ['pdfjs-dist']
  },
  define: {
    global: 'globalThis',
  },
  build: {
    commonjsOptions: {
      include: [/pdfjs-dist/, /node_modules/]
    }
  },
  worker: {
    format: 'es'
  }
})
