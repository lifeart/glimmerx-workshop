module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        '@glimmerx'
    ],
    "rules": {
        '@glimmerx/template-vars': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        "@typescript-eslint/ban-types": 'off'
    },
    "overrides": [
        {
            files: [
              './.eslintrc.js',
              './.template-lintrc.js',
              './server/**/*.js',
            ],
            parserOptions: {
              sourceType: 'script',
            },
            env: {
              browser: false,
              node: true,
            },
            plugins: ['node'],
            extends: ['plugin:node/recommended'],
            rules: {
              // this can be removed once the following is fixed
              // https://github.com/mysticatea/eslint-plugin-node/issues/77
              'node/no-unpublished-require': 'off',
            },
        }
    ]
};
