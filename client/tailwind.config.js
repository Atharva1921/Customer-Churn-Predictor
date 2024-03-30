/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
          bg_blue: '#a7bee8',
          bg_blue_light: '#e2eaf7',
          bg_blue_dark: '#7d9dce',
      },
    },
  },
  plugins: [],
}
