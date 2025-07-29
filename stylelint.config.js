/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order',
    '@stylistic/stylelint-config',
  ],
  rules: {
    'declaration-empty-line-before': 'never',
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
  },
  ignoreFiles: [
    'node_modules/**/*',
    'dist*/**/*',
    'src/assets/fonts/**/*',
  ],
}
