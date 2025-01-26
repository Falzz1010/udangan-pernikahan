/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',
        secondary: '#6B7280',
        accent: '#EC4899',
        background: '#FFFFFF',
        card: '#F9FAFB',
        border: '#E5E7EB',
      }
    },
  },
  plugins: [],
}

