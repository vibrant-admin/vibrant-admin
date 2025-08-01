import { entriesToCss } from '@unocss/core'
import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { defineConfig, presetAttributify, presetIcons, presetWind3, transformerAttributifyJsx } from 'unocss'
import themes from './src/configs/themes'

export default defineConfig({
  presets: [
    presetWind3(),
    // 属性化
    presetAttributify(),
    // 图标
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'block',
      },
    }),
    // 兼容旧版 CSS
    presetLegacyCompat({
      commaStyleColorFunction: true,
      legacyColorSpace: true,
    }),
  ],
  transformers: [
    // JSX 属性化
    transformerAttributifyJsx(),
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
})
