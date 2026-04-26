module.exports = {
  root: process.cwd(),
  env: process.env,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@babel/eslint-parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  }
}
