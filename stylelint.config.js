module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recess-order',
    'stylelint-config-html/vue',
    'stylelint-config-recommended-vue'
  ],
  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'tailwind',
        'apply',
        'layer',
        'variants',
        'responsive',
        'screen'
      ]
    }],
    'selector-nested-pattern': '^&',
    'no-descending-specificity': null,
    'no-invalid-position-at-import-rule': null
  }
}
