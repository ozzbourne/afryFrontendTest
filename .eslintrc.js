const path = require('path');

module.exports = {
  extends: [path.join(__dirname, './config/eslint/react.js')],
  globals: {
    fixture: false,
  },
  rules: {
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'react/jsx-filename-extension': [0],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['url'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        allowChildren: true,
        components: ['FieldLabel'],
        required: {
          every: ['nesting', 'id'],
        },
      },
    ],
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__typename'],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        name: 'lodash/get',
        message:
          "Use optional chaining and nullish coalescing instead, e.g. 'foo?.bar ?? defaultValue'",
      },
    ],
    'react/boolean-prop-naming': [
      'warn',
      {
        rule: '^(is|are|has|have|should)[A-Z]([A-Za-z0-9]?)+',
        validateNested: true,
      },
    ],
    'no-console': 'error',
  },
};
