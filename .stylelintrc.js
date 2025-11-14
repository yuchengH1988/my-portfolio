module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order'
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-type-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
      }
    ],
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'no-empty-source': null,
    'string-quotes': 'single',
    'at-rule-no-unknown': null
  }
} 