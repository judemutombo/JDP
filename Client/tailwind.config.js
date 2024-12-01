/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    
    extend: {
      colors: {
        "primary" : "#334155",
        "glass" : "#f3f4f6",
        "background" : "#fb923c",
        "secondary" : "#ffffff",
        "foreground" : "#000000",
      }
    },
  },
  plugins: [
    daisyui,
  ],
}

