import { fileURLToPath, URL } from 'node:url'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import AppLoading from 'vite-plugin-app-loading'
import { compression } from 'vite-plugin-compression2'
import { envParse } from 'vite-plugin-env-parse'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [
        'src/hooks',
        'src/slots',
        'src/store/modules',
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/components.d.ts',
      dirs: ['src/components'],
    }),
    svgLoader(),
    // https://github.com/yue1123/vite-plugin-env-parse
    envParse({
      dtsPath: 'src/types/env.d.ts',
    }),
    AppLoading('loading.html'),
    // https://github.com/nonzzz/vite-plugin-compression
    compression({
      algorithms: ['gzip'],
    }),
    // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./src/types', import.meta.url)),
    },
  },
})
