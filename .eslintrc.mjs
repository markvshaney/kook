export default {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.test.json"],
  },
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    // Strict TypeScript rules
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/restrict-template-expressions": "error",
    // Allow require in .cjs files only
    "@typescript-eslint/no-var-requires": "off",
    // Additional code quality rules
    eqeqeq: ["error", "always"],
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
    "no-duplicate-imports": "error",
    "no-unused-expressions": "error",
  },
  overrides: [
    {
      files: ["*.js", "*.mjs"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
    {
      files: ["__tests__/**/*.ts", "__tests__/**/*.tsx"],
      env: {
        jest: true,
        node: true,
      },
    },
  ],
};
