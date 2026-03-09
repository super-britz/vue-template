import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',
    }),
    mockDevServerPlugin(),
    compression({ algorithms: ['gzip', 'brotliCompress'] }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus', '@element-plus/icons-vue'],
          'axios': ['axios'],
        },
      },
    },
  },
  server: {
    port: 18000,
    proxy: {
      '/login/': {
        target: 'http://api-console-localtest.ninebot.com/',
        changeOrigin: true,
        headers: {
          Host: 'localhost:18000',
          Origin: 'https://iot-test.ninebot.com',
        },
      },
      '/service/': {
        target: 'http://api-console-localtest.ninebot.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/service/, ''),
        headers: {
          Host: 'localhost:18000',
          Origin: 'https://iot-test.ninebot.com',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
