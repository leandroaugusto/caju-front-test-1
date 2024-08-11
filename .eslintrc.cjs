module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "eslint-config-prettier",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["node_modules/*", ".eslintcache"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/react-in-jsx-scope": "off",
    "import/no-named-as-default": 0,
    "import/no-unresolved": ["error", { ignore: ["^~/"] }],
    "react/display-name": "off",
    "@typescript-eslint/ban-types": "off",
    "import/named": "off",
    "react-hooks/exhaustive-deps": "warn",
  },
};
