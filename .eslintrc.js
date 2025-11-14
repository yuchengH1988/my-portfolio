module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    'no-undef': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'any',
          component: 'any'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/component-tags-order': ['error', {
      order: ['script', 'template', 'style']
    }],
    'tailwindcss/no-custom-classname': 'off',
    'node/no-missing-import': 'off',
    'no-unsafe-optional-chaining': 'off'
  }
}
