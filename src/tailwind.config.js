/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ========================================
        // TRANSITION TRAILS DESIGN SYSTEM (TTDS)
        // Brand Colors
        // ========================================
        'evergreen': 'rgb(47 107 78 / <alpha-value>)',
        'evergreen-dark': 'rgb(39 89 65 / <alpha-value>)',
        'summit-teal': 'rgb(37 76 89 / <alpha-value>)',
        'sky-blue': 'rgb(91 137 166 / <alpha-value>)',
        'trail-cream': 'rgb(242 234 211 / <alpha-value>)',
        'trail-cream-dark': 'rgb(230 220 195 / <alpha-value>)',
        'sun-amber': 'rgb(245 158 51 / <alpha-value>)',
        'sun-amber-dark': 'rgb(232 145 53 / <alpha-value>)',
        'neutral-gray': 'rgb(236 236 236 / <alpha-value>)',
        
        // Semantic Colors
        'primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'accent': 'rgb(var(--color-accent) / <alpha-value>)',
        'success': 'rgb(59 106 82 / <alpha-value>)',
        'warning': 'rgb(245 158 51 / <alpha-value>)',
        'error': 'rgb(211 47 47 / <alpha-value>)',
        'info': 'rgb(91 137 166 / <alpha-value>)',
        
        // Penny AI Mode Colors
        'penny-guide': 'rgb(44 105 117 / <alpha-value>)',
        'penny-guide-dark': 'rgb(35 84 94 / <alpha-value>)',
        'penny-assistant': 'rgb(249 160 63 / <alpha-value>)',
        'penny-career': 'rgb(59 106 82 / <alpha-value>)',
        
        // Extended palette for additional UI needs
        'trail-teal': 'rgb(44 105 117 / <alpha-value>)', // Alias for penny-guide
        'trail-teal-dark': 'rgb(35 84 94 / <alpha-value>)',
        
        // Legacy ShadCN compatibility
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
