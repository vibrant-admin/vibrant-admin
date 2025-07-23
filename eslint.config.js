import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  vue: true,
  formatters: {
    html: true,
    markdown: 'prettier',
  },
})
