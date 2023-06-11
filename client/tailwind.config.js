export default {
  content: [
    "./pages/**/*.jsx",
    "./components/**/*.jsx",
    "./app/**/*.jsx",
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    fontFamily: {
      quicksand: ['Quicksand', 'sans-serif'],
      readex: ['Readex Pro', 'sans-serif'],
    },
    extend: {
      fixBoxShadow: {
        'custom-box-shadow': '0px -3px 13px 0px rgba(163, 163, 163, 0.25)'
      }
    },
  },
  plugins: [],
};
