/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order',
    '@stylistic/stylelint-config',
  ],
  ignoreFiles: [
    'node_modules/**/*',
    'dist*/**/*',
    'src/assets/fonts/**/*',
  ],
}
