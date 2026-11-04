/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: [
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'storybook-static/**',
    'coverage/**',
  ],
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      {
        message: 'Expected class selector to be camelCase',
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
    'alpha-value-notation': 'number',
    'custom-property-empty-line-before': null,
    'media-feature-range-notation': null,
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: ['/^--/'],
        ignoreKeywords: ['currentColor'],
      },
    ],
  },
};

export default config;
