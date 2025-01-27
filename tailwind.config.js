/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5ee5d4",
        "primary-hover": "#4cd4c3",
        "text-color": "#fcfcfc",
        "bg-color": "#16181f",
        "input-bg": "#21222a",
        "border-color": "#3f3f4d",
      },
      fontFamily: {
        'pp-formula': ['PP Formula', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}