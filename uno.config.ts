import presetIcons from '@unocss/preset-icons'
import { defineConfig, presetAttributify, presetWind4, transformerAttributifyJsx, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}',
      ],
    },
  },
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    // 支持属性模式
    presetAttributify(),
    // 支持图标字体
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
      },
      ...Object.fromEntries(
        Array.from({ length: 21 }, (_, i) => {
          const name = `basic${i !== 0 ? (`-${i}`) : ''}`
          return [name, `var(--${name})`]
        }),
      ),
    },
  },
  transformers: [
    // 支持 UnoCSS 指令和变体组
    transformerDirectives(),
    // 支持变体组
    transformerVariantGroup(),
    // 支持 JSX 属性模式
    transformerAttributifyJsx(),
  ],
  configDeps: [
    'src/assets/themes.ts',
  ],
})
