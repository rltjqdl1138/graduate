module.exports = {
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns:["logger.js","controller.js"],
  extends: ["airbnb"],
  rules:{
    "import/no-unresolved": 0,
    "max-len":1
  }
};
