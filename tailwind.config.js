/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        bodyBackGround: "#f7f0d1",
        main: "#f0b31e",
        yellow200: "#f7f0d1",
        yellow100: "#F7F5EA",
        gray300: "#65717b",
        gray200: "#9d9d9d",
        gray100: "#dadada",
      },
      width: {
        width60: "60rem",
      },
      boxShadow: {
        shadow100: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      },
      borderRadius: {
        xl8: "0.8rem",
      },
    },
  },
  plugins: [],
};
