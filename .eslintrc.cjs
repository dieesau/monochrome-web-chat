module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        "@typescript-eslint/no-var-requires": 1,
        "@typescript-eslint/no-empty-function": 1,
        "@typescript-eslint/ban-ts-comment": 1,
        "no-extra-boolean-cast": 1,
        "@typescript-eslint/no-unused-vars": 1,
        "@typescript-eslint/no-this-alias": 1,
        "no-prototype-builtins": 1
    }
};
