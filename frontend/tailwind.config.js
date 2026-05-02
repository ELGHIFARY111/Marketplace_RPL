export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F3EFEC",
          200: "#D9D9D9",
          300: "#ECEBEA",
          400: "#b19174",
          500: "#8B5E3C",
          600: "#A0A5B7",
          700: "#2D0101",
        },
        secondary: "#F3EFE9",
        accent: "#D9D9D9",
        tombol : {
          100:"#A0A5B7",
          200:"#2D0101",
          300:"#378A2E",
        }
      },
    },
  },
  plugins: [],
}