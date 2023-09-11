module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'standard-with-typescript',
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    ignorePatterns: ['.eslintrc.js'],
    parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig-eslint.json',
    },
    rules: {
        'import/extensions': ['off', 'never'],
        'quotes': 'off',
        '@typescript-eslint/quotes': ['warn', 'double'],
        'semi': 'always',
        '@typescript-eslint/semi': ['warn', 'always'],
        'no-console': ['error', {
            allow: ['log', 'warn', 'error'],
        }],
    },
};
