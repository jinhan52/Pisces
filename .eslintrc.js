module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-tabs': 'off',
		'no-trailing-spaces': 'off',
		'no-mixed-spaces-and-tabs': 'off',
    'semi':'off',
    'eol-last':'off',
    'comma-dangle':'off',
    'indent': 'off',
    'space-before-function-paren': 'off',
    'space-before-blocks': 'off',
    'padded-blocks': 'off'
  }
}
