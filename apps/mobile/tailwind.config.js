/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // V-Bakery 디자인 토큰
        primary: '#43A047',
        secondary: '#8D6E63',
        active: '#FF7043',
        scheduled: '#FFA726',
        soldout: '#9E9E9E',
        background: '#FAFAFA',
        card: '#FFFFFF',
        'text-primary': '#212121',
        'text-secondary': '#757575',
        disabled: '#BDBDBD',
        // 인기 티어
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32',
        // 특수 태그
        'tag-new': '#4CAF50',
        'tag-renewal': '#2196F3',
        'tag-rare': '#9C27B0',
        'tag-limited': '#FF5722',
      },
    },
  },
  plugins: [],
}