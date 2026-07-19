import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary: {
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
        },
        accent: {
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
        },
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
          elevated: "var(--bg-elevated)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        glass: {
          border: "rgba(255, 255, 255, 0.2)",
        },
        danger: {
          50: "var(--danger-50)", 100: "var(--danger-100)", 200: "var(--danger-200)", 300: "var(--danger-300)", 400: "var(--danger-400)", 500: "var(--danger-500)", 600: "var(--danger-600)", 700: "var(--danger-700)", 800: "var(--danger-800)", 900: "var(--danger-900)",
        },
        warning: {
          50: "var(--warning-50)", 100: "var(--warning-100)", 200: "var(--warning-200)", 300: "var(--warning-300)", 400: "var(--warning-400)", 500: "var(--warning-500)", 600: "var(--warning-600)", 700: "var(--warning-700)", 800: "var(--warning-800)", 900: "var(--warning-900)",
        },
        success: {
          50: "var(--success-50)", 100: "var(--success-100)", 200: "var(--success-200)", 300: "var(--success-300)", 400: "var(--success-400)", 500: "var(--success-500)", 600: "var(--success-600)", 700: "var(--success-700)", 800: "var(--success-800)", 900: "var(--success-900)",
        },
        info: {
          50: "var(--info-50)", 100: "var(--info-100)", 200: "var(--info-200)", 300: "var(--info-300)", 400: "var(--info-400)", 500: "var(--info-500)", 600: "var(--info-600)", 700: "var(--info-700)", 800: "var(--info-800)", 900: "var(--info-900)",
        },
        error: {
          50: "var(--danger-50)", 100: "var(--danger-100)", 200: "var(--danger-200)", 300: "var(--danger-300)", 400: "var(--danger-400)", 500: "var(--danger-500)", 600: "var(--danger-600)", 700: "var(--danger-700)", 800: "var(--danger-800)", 900: "var(--danger-900)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
