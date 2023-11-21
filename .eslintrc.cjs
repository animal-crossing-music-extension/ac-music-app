module.exports = {
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.vue'],
            extends: ['pikadude-ts', '@nuxtjs/eslint-config-typescript'],
            parserOptions: {
                parser: "@typescript-eslint/parser",
                sourceType: "module"
            },
            rules: {
                'semi': ['off'],
                'indent': ['off'],
                'comma-dangle': ['off'],
                'space-before-function-paren': ['off'],
                'arrow-parens': ['off'],
                'eqeqeq': ['off'],
                'require-await': ['warn'],
                'no-use-before-define': ['off'],
                'curly': ['off'],
                '@typescript-eslint/no-unused-vars': ['off'],
                'no-console': ['off'],

                'vue/html-indent': ['warn', 4],
                'vue/html-self-closing': ['warn', { html: { void: 'always' } }],
                'vue/max-attributes-per-line': ['off'],
                'vue/multi-word-component-names': ['off'],
                'vue/singleline-html-element-content-newline': ['off'],
            },
        },
    ],
};