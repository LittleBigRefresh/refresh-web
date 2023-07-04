/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      'display': ['Rubik'],
      'body': ['Rubik']
    },
    colors: {
      "background": "#0F0814",
      "header-background": "#261731",
      "form-background": "#2A1936",
      "backdrop": "#1B0F23",

      "divider": "#190B24",

      "foreground": "#F7F7F7",
      "gentle": "#C3C3C3",

      "primary": "#AA30F5",
      "secondary": "#87748A",
      "teritary": "#100915",

      "success": "#52BC24",
      "dangerous": "#E52E2E",
      "warning": "#E5B300",

      "rank-gold": "#FFD234",
      "rank-silver": "#F2F2F2",
      "rank-bronze": "#FF8845",
      "rank-other": "#ABABAB",

      "api-retrieve": "#52BC24",
      "api-remove": "#E52E2E",
      "api-push": "#2D43E5"
    },
    backgroundImage: {
      "hero": "url('/assets/hero.svg')",
      "logo": "url('/assets/logo.svg')",
    },
  },
  plugins: [],
  safelist: [ // force generation for notifications
    "bg-success",
    "bg-warning",
    "bg-dangerous"
  ]
}
