/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          900: '#5f4c7c',
          800: '#9178bd',
          700: '#b199da'
        }
      }
    },
  },
  plugins: [],
}
