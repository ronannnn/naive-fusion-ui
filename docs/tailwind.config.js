// tailwind.config.js
module.exports = {
  darkMode: 'class', // 或 'media'，根据您的需求选择
  content: [
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './content/**/*.{vue,js,ts,jsx,tsx}',
    './.vitepress/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
