/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
  corePlugins: {
    preflight: false, // Reset’i kapat: kendi CSS’in bozulmasın
  },
};