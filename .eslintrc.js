module.exports = {
  extends: ["plugin:react/recommended"],
  plugins: ["react-hooks"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-trailing-spaces": 1,
    "no-const-assign": 2,
    "react/jsx-no-bind": 0,
    "react/jsx-no-duplicate-props": 2,
    "react/display-name": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 2,
    "react/no-deprecated": 1,
    "react-hooks/rules-of-hooks": "error",
  },
};
