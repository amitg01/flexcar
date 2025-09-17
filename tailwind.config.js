/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'flexcar-blue': '#0049B7',
      },
    },
  },
  plugins: [],
};
