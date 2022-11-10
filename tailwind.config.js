/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          // DEFAULT: '#ED7966',
          // 50: '#FFFFFF',
          // 100: '#FEF9F8',
          // 150: '#FAE5DF',
          // 200: '#FAD9D4',
          // 300: '#F6B9AF',
          // 400: '#F1998B',
          // 500: '#ED7966',
          // 600: '#E74D34',
          // 700: '#CB3118',
          // 800: '#992512',
          // 900: '#67190C'
          DEFAULT: '#E74D34',
          50: '#FADDD8',
          100: '#F8CDC6',
          150: '#FAE5DF',
          200: '#F4ADA1',
          300: '#F08D7D',
          400: '#EB6D58',
          500: '#E74D34',
          600: '#CB3118',
          700: '#992512',
          800: '#67190C',
          900: '#340D06'
        },
        white: '#FFF',
        secondary: {
          100: '#bcbeff',
          DEFAULT: '#7E80C8',
          50: '#FFFFFF',
          // '100': '#F0F1F9',
          200: '#D4D4ED',
          300: '#B7B8E0',
          400: '#9B9CD4',
          500: '#7E80C8',
          600: '#5759B7',
          700: '#404296',
          800: '#2F316F',
          900: '#1E1F47'
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
