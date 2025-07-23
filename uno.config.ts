import { entriesToCss, toArray } from '@unocss/core'
import { defineConfig, presetAttributify, presetIcons, presetWind4, transformerAttributifyJsx, transformerDirectives, transformerVariantGroup } from 'unocss'
import themes from './src/assets/themes'

export default defineConfig({

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
            const returnCss: string[] = []
            Object.keys(themes).forEach((themeName) => {
              Object.keys(themes[themeName]).forEach((colorScheme) => {
                const css = entriesToCss(Object.entries(themes[themeName][colorScheme] as Record<string, string>))
                const roots = toArray(
                  colorScheme === 'light'
                    ? `html[data-theme="${themeName}"]`
                    : `html.dark[data-theme="${themeName}"]`,
                )
                returnCss.push(roots.map(root => `${root}{color-scheme:${colorScheme};${css}}`).join(''))
              })
            })

            return returnCss.join('\n')
          },
        },
      ],
      theme: {
        colors: {
          border: 'hsl(var(--border))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))',
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
})
