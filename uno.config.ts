import { entriesToCss, toArray } from '@unocss/core'
import presetIcons from '@unocss/preset-icons'
import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { defineConfig, presetAttributify, presetWind3, transformerAttributifyJsx, transformerDirectives, transformerVariantGroup } from 'unocss'
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
    presetWind3(),
    // 支持属性模式
    presetAttributify(),
    // 支持图标字体
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetLegacyCompat({
      // options
      commaStyleColorFunction: true,
      legacyColorSpace: true,
    }),
  ],
  preflights: [
    {
      getCSS: () => Object.entries(themes).flatMap(([themeName, colors]) =>
        Object.entries(colors).map(([colorScheme, colorValues]) => {
          const lightness = colorScheme === 'light' ? 100 : 0
          return toArray(
            colorScheme === 'light'
              ? `html[data-theme="${themeName}"]`
              : `html.dark[data-theme="${themeName}"]`,
          ).map(root => `${root}{color-scheme:${colorScheme};${entriesToCss(Object.entries({
            ...colorValues,
            ...Object.fromEntries(
              Array.from({ length: 21 }, (_, i) => [
                `--basic${i !== 0 ? `-${i}` : ''}`,
                `${colorValues['--basic-hs']} ${colorScheme === 'light' ? lightness - 5 * i : lightness + 5 * i}%`,
              ]),
            ),
          }))}}`).join('')
        }).join('\n'),
      ).join('\n'),
    },
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      success: {
        DEFAULT: 'hsl(var(--success))',
        foreground: 'hsl(var(--success-foreground))',
      },
      info: {
        DEFAULT: 'hsl(var(--info))',
        foreground: 'hsl(var(--info-foreground))',
      },
      warning: {
        DEFAULT: 'hsl(var(--warning))',
        foreground: 'hsl(var(--warning-foreground))',
      },
      danger: {
        DEFAULT: 'hsl(var(--danger))',
        foreground: 'hsl(var(--danger-foreground))',
      },
      ...Object.fromEntries(
        Array.from({ length: 21 }, (_, i) => {
          const name = `basic${i !== 0 ? (`-${i}`) : ''}`
          return [name, `hsl(var(--${name}))`]
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
