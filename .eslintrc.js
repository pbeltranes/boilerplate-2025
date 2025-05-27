module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.json'], // para que funcione bien en monorepo
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};