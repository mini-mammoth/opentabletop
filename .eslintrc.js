module.exports = {
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended',
    // 'plugin:jsdoc/recommended', We enable this in the future
    'plugin:react-hooks/recommended',
  ],
  env: {
    es2020: true,
  },
  parserOptions: {},
  rules: {
    'react/prop-types': 'off',
    // This mess with react functions as it enforces a `@returns {React.ReactNode}` which leeds to several TypeScript errors.
    'jsdoc/require-returns': 'off',
    'jsdoc/require-returns-description': 'off',
    // ESLint is not very smart in finding types across files. This is also checked with Typescript
    'jsdoc/no-undefined-types': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
