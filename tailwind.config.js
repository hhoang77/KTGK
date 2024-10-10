/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Quét các file trong thư mục src
    './public/index.html', // Nếu bạn có file HTML trong thư mục public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
