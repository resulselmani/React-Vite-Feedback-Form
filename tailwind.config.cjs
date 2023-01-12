/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "form-bg": "rgb(148, 148, 161)",
      },
    },
  },
  plugins: [],
};
