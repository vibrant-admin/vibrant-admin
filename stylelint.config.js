export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
    '@stylistic/stylelint-config',
  ],
  plugins: [
    'stylelint-scss',
  ],
  ignoreFiles: [
    'node_modules/**/*',
    'dist*/**/*',
    'src/assets/fonts/**/*',
  ],
}
