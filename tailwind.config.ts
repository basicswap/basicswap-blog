import type { Config } from "tailwindcss";

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        footerLink: '#b4c0d0',
        'footerLink-hover': '#9da8b8',
        titleColor: '#2b3343',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
