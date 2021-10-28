const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Mulish', sans-serif", ...defaultTheme.fontFamily.sans],
        roboto: ["'Roboto', sans-serif", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        fuchsia: colors.fuchsia,
        heart: '#FF004D',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
