const path = require('path');

module.exports = {
    env: {
        jest: true,
        browser: true,
        node: true,
    },
    extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier'],
    plugins: ['prettier', 'jest'],
    parserOptions: {
        project: [
            './tsconfig.json',
        ],
        tsconfigRootDir: path.resolve(__dirname, './'),
        createDefaultProgram: true,
    },
    rules: {
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
        'react/no-unstable-nested-components': 0,
        'arrow-body-style': 1,
        'prettier/prettier': ['error'],
        'react/require-default-props': 0,
        'import/prefer-default-export': 0,
        'import/no-default-export': 2,
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: false,
                peerDependencies: true,
            },
        ],
        'import/extensions': [
            'error',
            'never',
            {
                json: 'always',
            },
        ],
    },
    overrides: [],
};
