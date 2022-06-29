/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6726',
          100: '#ffa47d',
          200: '#ff9567',
          300: '#ff8551',
          400: '#ff763c',
          500: '#ff6726',
          600: '#e65d22',
          700: '#cc521e',
          800: '#b3481b',
          900: '#993e17'
        }
      },
      fontFamily: {
        main: ['DM Sans']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
