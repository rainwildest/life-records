module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    zIndex: {
      5: 5
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
