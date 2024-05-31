/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'system-ui'],
        'dotgothic16-regular': ['"DotGothic16"', 'sans-serif']
      }
    },
  },
  plugins: [],
}