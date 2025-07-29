import { entriesToCss, toArray } from '@unocss/core'
import presetIcons from '@unocss/preset-icons'
import { defineConfig, presetAttributify, presetWind4, transformerAttributifyJsx, transformerDirectives, transformerVariantGroup } from 'unocss'
import themes from './src/assets/themes'

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
    {
      name: 'preset-theme',
      preflights: [
        {
          getCSS: () => {
            return Object.entries(themes).map(([themeName, colors]) => {
              return Object.entries(colors).map(([colorScheme, colorValues]) => {
                const css = entriesToCss(Object.entries(colorValues as Record<string, string>))
                const roots = toArray(
                  colorScheme === 'light'
                    ? `html[data-theme="${themeName}"]`
                    : `html.dark[data-theme="${themeName}"]`,
                )
                return roots.map(root => `${root}{color-scheme:${colorScheme};${css}}`).join('')
              }).join('\n')
            }).join('\n')
          },
        },
      ],
      theme: {
        colors: {
          border: 'var(--border)',
          background: 'var(--background)',
          main: {
            DEFAULT: 'var(--main)',
            foreground: 'var(--main-foreground)',
          },
          foreground: 'var(--foreground)',
          primary: {
            DEFAULT: 'var(--primary)',
            foreground: 'var(--primary-foreground)',
          },
          secondary: {
            DEFAULT: 'var(--secondary)',
            foreground: 'var(--secondary-foreground)',
          },
        },
      },
    },
  ],
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
