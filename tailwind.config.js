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
      "background": "#160D1D",
      "header-background": "#261731",
      "form-background": "#2A1936",
      "backdrop": "#1B1023",

      "foreground": "#FFFFFF",
      "gentle": "#A3A3A3",

      "primary": "#AA30F5",
      "secondary": "#87748A",
      "teritary": "#140C1A",
      "dangerous": "#E52E2E",
      "warning": "#E5B300",
    },
    backgroundImage: {
      "hero": "url('/assets/hero.svg')",
    },
  },
  plugins: [],
  safelist: [ // force generation of all bg-colors-600 for notifications
    "bg-slate-600",
    "bg-gray-600",
    "bg-zinc-600",
    "bg-neutral-600",
    "bg-stone-600",
    "bg-red-600",
    "bg-orange-600",
    "bg-amber-600",
    "bg-yellow-600",
    "bg-lime-600",
    "bg-green-600",
    "bg-emerald-600",
    "bg-teal-600",
    "bg-cyan-600",
    "bg-sky-600",
    "bg-blue-600",
    "bg-violet-600",
    "bg-purple-600",
    "bg-fuchsia-600",
    "bg-pink-600",
    "bg-rose-600",
  ]
}
