module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 16,
      propList: ["*"],
      unitPrecision: 5,
      selectorBlackList: [],
      replace: true,
      mediaQuery: true,
      minPixelValue: 1
    }
  }
};
