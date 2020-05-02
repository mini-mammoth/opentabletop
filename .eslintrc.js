module.exports = {
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  env: {
    es2020: true,
  },
  parserOptions: {},
  rules: {
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
