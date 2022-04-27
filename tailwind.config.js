module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./views/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        50.5: "12.625rem" /*202px*/,
        61: "15.25rem" /* 244px */
      },
      minHeight: {
        50.5: "12.625rem" /*202px*/,
        61: "15.25rem" /* 244px */
      },
      minWidth: {
        20: "5rem" /* 80px */,
        28: "7rem" /* 112px */,
        36: "9rem" /*144px*/
      },
      maxWidth: {
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
