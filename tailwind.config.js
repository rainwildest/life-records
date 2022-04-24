module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./views/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        50.5: "12.625rem" /*202px*/
      },
      minHeight: {
        50.5: "12.625rem" /*202px*/
      },
      minWidth: {
        28: "7rem" /* 112px */,
        36: "9rem" /*144px*/
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/line-clamp")]
};
