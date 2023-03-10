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
    }
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
