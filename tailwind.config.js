/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'light': '#EDEDED'
      }
    },
  },
  plugins: [],
  darkMode: 'media',
}

