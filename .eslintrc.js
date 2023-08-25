const commonRules = {
  'import/prefer-default-export': 'off',
  'import/no-default-export': 'error',
  'react/react-in-jsx-scope': 'off',
  'import/imports-first': ['error', 'absolute-first'],
  'no-param-reassign': [
    'error',
    { props: true, ignorePropertyModificationsFor: ['draft'] },
  ],
  'react/function-component-definition': [
    2,
    {
      namedComponents: ['function-declaration', 'arrow-function'],
    },
  ],
  'react/jsx-no-useless-fragment': [
    'error',
    {
      allowExpressions: true,
    },
  ],
  '@typescript-eslint/explicit-function-return-type': 'error',
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: ['return', 'block-like'] },
    { blankLine: 'always', prev: ['block-like'], next: '*' },
  ],
  'import/order': 'off',
  'react/prop-types': 'off',
  'react/jsx-props-no-spreading': 'off',
  'react/require-default-props': 'off',
};

module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: { ...commonRules },
  overrides: [
    {
      files: ['app/**/page.tsx', 'app/**/layout.tsx'],
      rules: {
        ...commonRules,
        'import/no-default-export': 'off',
      },
    },
  ],
};
