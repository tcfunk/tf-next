module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Fjalla One', 'serif']
    },
    extend: { },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
