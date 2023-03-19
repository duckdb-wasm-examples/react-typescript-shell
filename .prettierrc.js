module.exports = {
    tabWidth: 4,
    semi: true,
    arrowParens: 'avoid',
    printWidth: 120,
    singleQuote: true,
    jsxSingleQuote: false,
    trailingComma: 'all',
    importOrder: ['^react$', '<THIRD_PARTY_MODULES>', '^~[./]components', '^~[./]utils', '^~[./]', '^[./]'],
    importOrderSeparation: true,
    overrides: [
        {
            files: '*.yml',
            options: {
                singleQuote: false,
            },
        },
    ],
};
