/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'light': '#EDEDED',
        'dark': '#070709'
      },
      colors: {
        'seclight': '#D9D9D9',
        'secdark': '#1A1A1A',
        'txtlight': '#121212',
        'txtdark': '#EDEDED'
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

