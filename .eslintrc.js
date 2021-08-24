module.exports = {
    env : {
        "browser" : true,
        "node" : true,
        "es6" : true
    },
    extends: "eslint-config-egg",
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module"
  },
  ecmaFeatures: {
    "modules": true,
    "spread" : true,
    "restParams" : true
    },
    rules : {
        "no-unused-vars" : 2,
        "no-undef" : 2
    }
}