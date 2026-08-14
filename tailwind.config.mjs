/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#F7E47D',
          light: '#FFF3A8',
          dark: '#8A6F00',
        },
        surface: {
          DEFAULT: '#FFF9EB',
          alt: '#F5EDD6',
        },
        ink: {
          DEFAULT: '#1C1917',
          muted: '#6B6255',
        },
        border: '#E8E0C6',
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
