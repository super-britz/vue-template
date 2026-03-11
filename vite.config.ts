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

// MOCK=false 时关闭 mock 插件，直连真实后端
const enableMock = process.env.MOCK !== 'false'

// 禁止自动注入 Element Plus 的样式导入（CSS/SCSS）。
// 注意：关闭后组件将不再自带样式，需要你自己提供替代样式/主题。
const elementPlusResolver = ElementPlusResolver({ importStyle: false })

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: ['src/utils/**'],
      resolvers: [elementPlusResolver],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [
        elementPlusResolver,
        (name) => {
          // 自动按需导入 @ninebot/business-icon 图标组件
          if (/^Business[A-Z]/.test(name)) {
            return { from: '@ninebot/business-icon', name }
          }
        },
      ],
      dts: 'src/components.d.ts',
    }),
    enableMock && mockDevServerPlugin(),
    compression({ algorithms: ['gzip', 'brotliCompress'] }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'element-plus': ['element-plus', '@element-plus/icons-vue'],
          axios: ['axios'],
        },
      },
    },
  },
  server: {
    port: 18000,
    proxy: {
      // mock 模式：/api 代理到自身供 mock 插件拦截
      // 非 mock 模式：/api 代理到真实后端
      '/api': enableMock
        ? { target: 'http://localhost:18000', changeOrigin: true }
        : {
            target: 'http://api-console-localtest.ninebot.com/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            headers: {
              Host: 'localhost:18000',
              Origin: 'https://iot-test.ninebot.com',
            },
          },
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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
