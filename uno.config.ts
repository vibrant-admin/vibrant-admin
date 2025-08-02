import { entriesToCss } from '@unocss/core'
import presetIcons from '@unocss/preset-icons'
import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { defineConfig, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'
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
    presetIcons({ warn: true }),
    presetLegacyCompat({
      commaStyleColorFunction: true,
      legacyColorSpace: true,
    }),
  ],
  transformers: [
    // 支持 UnoCSS 指令和变体组
    transformerDirectives(),
    // 支持变体组
    transformerVariantGroup(),
  ],
  preflights: [
    {
      // 将主题变量转换为 CSS
      getCSS: () =>
        Object.entries(themes).flatMap(([themeName, colors]) =>
          Object.entries(colors).map(([colorScheme, colorValues]) =>
            `html${colorScheme === 'dark' ? '.dark' : ''}[data-theme="${themeName}"]{color-scheme:${colorScheme};${entriesToCss(Object.entries(colorValues))}}`,
          ).join('\n'),
        ).join('\n'),
    },
  ],
  theme: {
    colors: {
      main: {
        DEFAULT: 'hsl(var(--color-main))',
        foreground: 'hsl(var(--color-main-foreground))',
        border: 'hsl(var(--color-main-border))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--color-secondary))',
        foreground: 'hsl(var(--color-secondary-foreground))',
        border: 'hsl(var(--color-secondary-border))',
      },
      tertiary: 'hsl(var(--color-tertiary))',
    },
  },
  configDeps: [
    'src/configs/themes.ts',
  ],
})
