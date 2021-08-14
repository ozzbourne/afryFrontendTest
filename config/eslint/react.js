const path = require('path');

const pascalCasePattern = '^[A-Z][a-z]+(?:[A-Z][a-z]+)*$';

module.exports = {
  extends: [path.join(__dirname, './index.js'), 'prettier/react'],
  rules: {
    'react/no-multi-comp': 'off',
    'react/require-default-props': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['**/src/**/*.jsx'],
      excludedFiles: ['*.test.*', 'index.js'],
      rules: {
        'filenames/match-regex': ['error', pascalCasePattern],
      },
    },
    {
      files: ['**/docs/**'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
