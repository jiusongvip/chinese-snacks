/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#C34A36',
          light: '#D96C5A',
          dark: '#A13B2A',
        },
        surface: {
          DEFAULT: '#FAFAF9',
          alt: '#F5F2EF',
        },
        ink: {
          DEFAULT: '#1C1917',
          muted: '#6B6560',
        },
        border: '#E7E2DD',
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
