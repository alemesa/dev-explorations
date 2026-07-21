export default {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  rules: {
    'scss/load-partial-extension': 'never',
    'selector-class-pattern': null,
  },
};
