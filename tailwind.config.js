const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        display: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
        body: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      gray: { ...colors.neutral, 850: "#1f1f1f" },
      blue: colors.sky,
      green: colors.lime,
      red: colors.red,
      yellow: colors.yellow,
      black: "#111111",
      //       yellow: colors.amber,
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
