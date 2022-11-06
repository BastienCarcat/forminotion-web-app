/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ED7966',
           100: '#FAE5DF',
        },
        white: '#FFF',
        secondary: {
          DEFAULT: '#7E80C8',
            100: '#bcbeff',
        }
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