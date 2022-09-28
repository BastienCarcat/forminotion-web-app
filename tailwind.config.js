/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary: {
        //   DEFAULT: '#ff6726',
        //   50: '#ffccb6',
        //   100: '#ffa47d',
        //   200: '#ff9567',
        //   300: '#ff8551',
        //   400: '#ff763c',
        //   500: '#ff6726',
        //   600: '#e65d22',
        //   700: '#cc521e',
        //   800: '#b3481b',
        //   900: '#993e17'
        // },
        white: '#FFF',
        primary: '#ED7966',
        secondary: '#7E80C8',
        pink: '#F5CAC2',
        pale: '#FAE5DF'
      },
      fontFamily: {
        main: ['DM Sans']
      },
      width: {
        xl: '76rem'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
