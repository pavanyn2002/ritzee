import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'hard-shadow-pop': {
          '0%': {
            'box-shadow': '4px 4px 0px 0px hsl(var(--primary))'
          },
          '100%': {
            'box-shadow': '8px 8px 0px 0px hsl(var(--primary))'
          }
        },
        'glitch-anim': {
          '0%': { clip: 'rect(32px, 9999px, 94px, 0)' },
          '25%': { clip: 'rect(42px, 9999px, 100px, 0)' },
          '50%': { clip: 'rect(22px, 9999px, 66px, 0)' },
          '75%': { clip: 'rect(35px, 9999px, 80px, 0)' },
          '100%': { clip: 'rect(50px, 9999px, 75px, 0)' },
        },
        'glitch-anim-2': {
          '0%': { clip: 'rect(85px, 9999px, 90px, 0)' },
          '25%': { clip: 'rect(35px, 9999px, 50px, 0)' },
          '50%': { clip: 'rect(65px, 9999px, 70px, 0)' },
          '75%': { clip: 'rect(10px, 9999px, 45px, 0)' },
          '100%': { clip: 'rect(75px, 999-px, 85px, 0)' },
        },
        'glitch-skew': {
          '0%': { transform: 'skew(0deg)' },
          '10%': { transform: 'skew(1deg)' },
          '20%': { transform: 'skew(-1deg)' },
          '30%': { transform: 'skew(2deg)' },
          '40%': { transform: 'skew(0deg)' },
          '50%': { transform: 'skew(-2deg)' },
          '60%': { transform: 'skew(0deg)' },
          '70%': { transform: 'skew(1.5deg)' },
          '80%': { transform: 'skew(-1.5deg)' },
          '90%': { transform: 'skew(0deg)' },
          '100%': { transform: 'skew(0deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee': 'marquee 30s linear infinite',
        'hard-shadow-pop': 'hard-shadow-pop 0.15s ease-out forwards',
        'glitch-main': 'glitch-skew 1s infinite linear alternate-reverse',
        'glitch-before': 'glitch-anim 5s infinite linear alternate-reverse',
        'glitch-after': 'glitch-anim-2 1s infinite linear alternate-reverse'
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
