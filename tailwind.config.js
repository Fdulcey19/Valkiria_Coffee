/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // El reset y los estilos base ya viven en style.css: Tailwind solo aporta utilidades.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      // Los colores apuntan a las variables de style.css para que todo siga una sola paleta.
      colors: {
        espresso: { 900: "var(--espresso-900)", 950: "var(--espresso-950)" },
        gold: "var(--gold)",
        ink: { DEFAULT: "var(--ink)", soft: "var(--ink-soft)" },
        // on-dark usa canales RGB para poder aplicar opacidad (bg-on-dark/10)
        "on-dark": { DEFAULT: "rgb(var(--ink-on-dark-rgb) / <alpha-value>)", soft: "var(--ink-on-dark-soft)" },
        accent: "var(--caramel-700)",
        paper: "var(--paper)",
        latte: "var(--latte)",
        roast: "var(--roast)",
        card: "var(--card)",
        line: "var(--line)",
        up: "var(--up)",
        down: { DEFAULT: "var(--down)", bg: "var(--down-bg)" },
      },
      fontFamily: { display: ["var(--font-display)"] },
      spacing: { gutter: "var(--gutter)" },
    },
  },
  plugins: [],
}
