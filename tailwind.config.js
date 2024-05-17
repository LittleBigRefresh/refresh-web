const defaultColors = {
  "background": "#0F0814",
  "header-background": "#261731",
  "container-background": "#2A1936",
  "backdrop": "#1B0F23",

  "divider": "#13071A",

  "header-foreground": "#F7F7F7",
  "foreground": "#F7F7F7",
  "gentle": "#C3C3C3",
  "link": "#d4c6d5",
  "link-hover": "#fde9ff",

  "primary": "#A13DE3",
  "secondary": "#87748A",
  "teritary": "#100915",

  "secondary-bright": "#E2CFE5",

  "success": "#52BC24",
  "dangerous": "#E52E2E",
  "warning": "#F2AA00",

  "rank-gold": "#FFD234",
  "rank-silver": "#F2F2F2",
  "rank-bronze": "#FF8845",
  "rank-other": "#ABABAB",

  "api-retrieve": "#52BC24",
  "api-remove": "#E52E2E",
  "api-push": "#2D43E5"
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: defaultColors,
    extend: {
      fontSize: {
        "md": "0.95rem"
      }
    },
    fontFamily: {
      'display': ['Rubik'],
      'body': ['Rubik']
    },
    borderRadius: {
      'none': '0',
      DEFAULT: '11px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
    },
    backgroundImage: {
      "hero": "url('/assets/hero.svg')",
      "logo": "url('/assets/logo.svg')",
    },
  },
  plugins: [],
}

