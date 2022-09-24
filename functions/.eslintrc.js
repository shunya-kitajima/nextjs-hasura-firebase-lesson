export const root = true
export const env = {
  es6: true,
  node: true,
}
export const extend = [
  'plugin:import/errors',
  'plugin:import/warnings',
  'plugin:import/typescript',
  'next/core-web-vitals',
]
export const parser = '@typescript-eslint/parser'
export const parserOptions = {
  project: ['tsconfig.json', 'tsconfig.dev.json'],
  sourceType: 'module',
}
export const ignorePatterns = [
  '/lib/**/*', // Ignore built files.
]
export const plugins = ['@typescript-eslint', 'import']
export const rules = {
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  '@typescript-eslint/no-empty-function': 'error',
  '@typescript-eslint/no-empty-interface': 'warn',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-namespace': 'error',
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  '@typescript-eslint/prefer-for-of': 'warn',
  '@typescript-eslint/triple-slash-reference': 'error',
  '@typescript-eslint/unified-signatures': 'warn',
  'constructor-super': 'error',
  eqeqeq: ['warn', 'always'],
  'import/no-deprecated': 'warn',
  'import/no-extraneous-dependencies': 'error',
  'import/no-unassigned-import': 'warn',
  'no-cond-assign': 'error',
  'no-duplicate-case': 'error',
  'no-duplicate-imports': 'error',
  'no-empty': [
    'error',
    {
      allowEmptyCatch: true,
    },
  ],
  'no-invalid-this': 'error',
  'no-new-wrappers': 'error',
  'no-param-reassign': 'error',
  'no-redeclare': 'error',
  'no-sequences': 'error',
  'no-shadow': [
    'error',
    {
      hoist: 'all',
    },
  ],
  'no-throw-literal': 'error',
  'no-unsafe-finally': 'error',
  'no-unused-labels': 'error',
  'no-var': 'warn',
  'no-void': 'error',
  'prefer-const': 'warn',
}
export const settings = {
  jsdoc: {
    tagNamePreference: {
      returns: 'return',
    },
  },
}
