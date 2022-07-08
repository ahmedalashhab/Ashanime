module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        redor: "#FC4747",
        "whole-page": "#10141E",
        "blue-gray": "#5A698F",
        "navy-blue": "#161D2F",
        white: "#FFF",
        black: "#000",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
