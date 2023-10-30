const { createThemes } = require('tw-colors');

const defaultColors = {
  "background": "#0F0814",
  "header-background": "#261731",
  "form-background": "#2A1936",
  "backdrop": "#1B0F23",

  "divider": "#13071A",

  "foreground": "#F7F7F7",
  "gentle": "#C3C3C3",

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
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
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
    colors: defaultColors,
    backgroundImage: {
      "hero": "url('/assets/hero.svg')",
      "logo": "url('/assets/logo.svg')",
    },
  },
  plugins: [
    createThemes({
      default: defaultColors,
      hack: {
        "background": "#010101",
        "header-background": "#010101",
        "form-background": "#001100",
        "backdrop": "#000000",

        "divider": "#00EE00",

        "foreground": "#00FF00",
        "gentle": "#00DD00",

        "primary": "#009900",
        "secondary": "#008800",
        "teritary": "#001100",

        "success": "#009900",
        "dangerous": "#005500",
        "warning": "#005500",

        "rank-gold": "#00FF00",
        "rank-silver": "#00AA00",
        "rank-bronze": "#009900",
        "rank-other": "#005500",
      },
      ultraDark: {
        "background": "#000000",
        "header-background": "#0f0f0f",
        "form-background": "#000000",
        "backdrop": "#050505",

        "divider": "#000000",

        "foreground": "#F7F7F7",
        "gentle": "#C3C3C3",

        "primary": "#723896",
        "secondary": "#575757",
        "teritary": "#0f0f0f",

        "secondary-bright": "#AAAAAA",

        "success": "#52BC24",
        "dangerous": "#E52E2E",
        "warning": "#d99800",
      },
      soundShapes: {
        "background": "#2F2A2A",
        "header-background": "#181515",
        "form-background": "#EED4BF",
        "backdrop": "#FFF0E4",

        "divider": "#61493C",

        "foreground": "#181515",
        "gentle": "#8A7261",

        "primary": "#F07167",
        "secondary": "#F4DECC",
        "teritary": "#e5d2c3",

        "secondary-bright": "#E2CFE5",

        "success": "#79c501",
        "dangerous": "#ea574d",
        "warning": "#eeb231",

        "api-retrieve": "#79c501",
        "api-remove": "#ea574d",
        "api-push": "#eeb231"
      }
    })
  ],
  safelist: [ // force generation for notifications
    "bg-success",
    "bg-warning",
    "bg-dangerous"
  ]
}
