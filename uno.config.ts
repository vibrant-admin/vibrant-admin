import { entriesToCss, toArray } from '@unocss/core'
import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetWind3, transformerAttributifyJsx, transformerCompileClass, transformerDirectives, transformerVariantGroup } from 'unocss'
import themes from './src/assets/themes'

export default defineConfig({
  presets: [
    presetWind3(),
    // 支持属性模式
    presetAttributify(),
    // 打印排版相关预设
    presetTypography(),
    // 支持图标字体
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    // 兼容旧版 CSS 变量和颜色函数
    presetLegacyCompat({
      commaStyleColorFunction: true,
      legacyColorSpace: true,
    }),
    {
      name: 'unocss-preset-shadcn',
      preflights: [
        {
          getCSS: () => {
            const returnCss: string[] = []
            Object.keys(themes).forEach((themeName) => {
              Object.keys(themes[themeName]).forEach((colorScheme) => {
                const css = entriesToCss(Object.entries(themes[themeName][colorScheme] as Record<string, string>))
                const roots = toArray(
                  colorScheme === 'light'
                    ? `[data-theme="${themeName}"]`
                    : `html.dark [data-theme="${themeName}"], [data-theme="${themeName}"] .dark`,
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
          border: 'var(--border)',
          background: 'var(--background)',
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
    // 支持编译类名
    transformerCompileClass(),
    // 支持 JSX 属性模式
    transformerAttributifyJsx(),
  ],
})
