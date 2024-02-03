/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundColor: {
        main: "#f0b31e",
        yellow200: "#f7f0d1",
        yellow100: "#F7F5EA",
      },
      borderColor: {
        main: "#f0b31e",
        bbb: "#bbb",
      },
      colors: {
        white: "#fff",
        main: "#f0b31e",
        yellow200: "#f7f0d1",
        yellow100: "#F7F5EA",
        gray300: "#65717b",
        gray200: "#9d9d9d",
        gray100: "#dadada",
        pink100: "#fc8e8e",
      },
      width: {
        width60: "60rem",
        width33: "33rem",
      },
      height: {
        height40: "40rem",
        height60: "63rem",
      },
      boxShadow: {
        shadow100: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        shadow200: "0 4px 10px #4b57a90d",
      },
      borderRadius: {
        xl8: "0.8rem",
      },
    },
  },
  plugins: [],
};
