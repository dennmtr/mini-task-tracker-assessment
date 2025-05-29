import tsLint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import eslint from '@eslint/js'

export default [
  eslint.configs.recommended,
  {
    ignores: ['node_modules/**']
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    settings: {},
    plugins: {
      '@typescript-eslint': tsLint,
      prettier: prettier
    },
    rules: {
      ...tsLint.configs['recommended-type-checked'].rules,
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ],
      '@typescript-eslint/unbound-method': 'off'
    }
  }
]
