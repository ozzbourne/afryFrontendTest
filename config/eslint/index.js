module.exports = {
  env: {
    browser: true,
    jasmine: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: ['airbnb', 'prettier'],
  // parser: '@babel/eslint-parser',
  plugins: ['@babel', 'filenames', 'prettier', 'react-hooks', 'no-snapshots', 'promise'],
  rules: {
    'prettier/prettier': 'error',
    curly: ['error', 'all'],
    'import/order': ['error', { groups: ['builtin', 'external', 'parent', 'sibling', 'index'] }],
    'no-useless-constructor': 'error',
    'no-implicit-coercion': ['error', { boolean: true }],
    'no-snapshots/snapshots': 'error',
    'require-await': 'error',
    'promise/always-return': 'off',
    'promise/no-return-wrap': 'error',
    'promise/catch-or-return': ['error', { allowFinally: true }],
    'promise/no-native': 'off',
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',
  },
  overrides: [
    {
      files: ['**/src/**'],
      rules: {
        'import/prefer-default-export': 'off',
        'no-restricted-syntax': [
          'error',
          {
            selector: 'ForInStatement',
            message:
              'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
          },
          {
            selector: 'LabeledStatement',
            message:
              'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
          },
          {
            selector: 'WithStatement',
            message:
              '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
          },
        ],
      },
    },
    {
      files: ['**/src/**/*.js'],
      excludedFiles: ['*.test.*', '*.data.*', 'index.js'],
      rules: {
        'filenames/match-regex': 'error',
      },
    },
    {
      files: ['**/__tests__/**'],
      rules: {
        'filenames/match-regex': ['error', '[a-zA-Z]*.test$'],
      },
    },
  ],
};
