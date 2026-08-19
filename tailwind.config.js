/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,js,html}'],
  theme: {
    extend: {
      colors: {
        // ===================================================================
        // Charte graphique FL2S Conseil — couleurs extraites du logo officiel
        // ===================================================================

        // Couleur principale — lettres F, L, S du logo
        navy: {
          DEFAULT: '#1C5565', // --color-primary
          50:  '#F3F8F6',     // --color-background-soft (fond doux)
          100: '#D0E2DD',     // reflet clair quasi givre (logo)
          200: '#76A6AA',     // bleu clair aqua (logo)
          300: '#60949E',     // --color-accent-teal
          400: '#5B8680',     // --color-text-muted / teal intermediaire
          500: '#376A78',     // --color-primary-soft / bleu petrole
          600: '#1E5462',     // Conseil + traits horizontaux
          700: '#1C5565',     // = DEFAULT
          800: '#244F58',     // --color-primary-dark / ombre
          900: '#2C4B5E',     // bleu nuit profond (logo)
        },

        // Couleur secondaire — AMOA & Projets (verts)
        emerald2: {
          DEFAULT: '#5A8A58', // --color-secondary
          50:  '#EDF3EC',
          100: '#D6E5D4',
          200: '#9FB798',     // vert pastel / reflet (logo)
          300: '#7E9B73',     // vert clair olive (logo)
          400: '#7F9D6F',     // degrade "2" vert clair olive
          500: '#608D5E',     // variante AMOA plus claire
          600: '#5A8A58',     // = DEFAULT
          700: '#3F6B4D',     // vert profond (logo)
          800: '#58805D',     // vert principal (logo)
          900: '#3C6949',
        },

        // Accent teal / degrade du "2"
        accent: {
          DEFAULT: '#60949E', // --color-accent-teal
          50:  '#D6EAEA',     // reflet tres clair degrade "2"
          100: '#B8D5D7',
          200: '#6A979D',     // bleu clair grise (degrade "2")
          300: '#448491',     // bleu-vert (degrade "2")
          400: '#3C7269',     // teal profond (degrade "2")
          500: '#58846D',     // vert/teal moyen (degrade "2")
          600: '#60949E',     // = DEFAULT
          700: '#376A78',     // bleu petrole
          800: '#2C4B5E',     // bleu nuit
        },

        // Fond
        sand: {
          50:  '#F3F8F6',     // fond doux
          100: '#E8F0ED',
          200: '#D0E2DD',
          300: '#B8D5D7',
        },

        // Ink (texte sur fond sombre)
        ink: {
          900: '#1C5565',
          800: '#244F58',
          700: '#2C4B5E',
        },
      },
      fontFamily: {
        // ui-ux-pro-max : Lexend (sans accessibility-first) + Source Sans 3 (lecture)
        sans: ['Lexend', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'system-ui', 'sans-serif'],
        prose: ['"Source Sans 3"', 'Source Sans Pro', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightish: '-0.015em',
      },
      opacity: {
        8: '0.08',
        12: '0.12',
        15: '0.15',
      },
      maxWidth: {
        prose2: '68ch',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(6, 16, 31, 0.04), 0 8px 24px -8px rgba(6, 16, 31, 0.10)',
        ring: '0 0 0 1px rgba(10, 37, 64, 0.08)',
      },
      animation: {
        'fade-up': 'fade-up .8s cubic-bezier(.16,.84,.36,1) both',
        shimmer: 'shimmer 2.4s linear infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'grain':
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
};
