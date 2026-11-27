import type { Config } from "tailwindcss";

// Colours are space-separated RGB channels in app/globals.css, so every token
// takes Tailwind's opacity modifier (bg-ink/10, text-red/80).
const c = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem" },
      screens: { "2xl": "1216px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-barlow)", "system-ui", "sans-serif"],
        label: ["var(--font-barlow-condensed)", "var(--font-barlow)", "system-ui", "sans-serif"],
        marker: ["var(--font-kalam)", "ui-rounded", "cursive"],
        apple: ["-apple-system", "BlinkMacSystemFont", "\"SF Pro Text\"", "\"Helvetica Neue\"", "Arial", "sans-serif"],
      },
      colors: {
        board: { DEFAULT: c("board"), shade: c("board-shade") },
        grid: c("grid"),
        rule: c("rule"),
        paper: c("paper"),
        ghost: c("ghost"),
        ink: { DEFAULT: c("ink"), 2: c("ink-2"), 3: c("ink-3") },
        red: { DEFAULT: c("red"), ink: c("red-ink") },
        blue: c("blue"),
        green: { DEFAULT: c("green"), ink: c("green-ink") },
        alu: { DEFAULT: c("alu"), light: c("alu-light"), dark: c("alu-dark") },

        // Older names, kept so every page speaks the same system.
        border: c("rule"),
        "border-subtle": c("grid"),
        "border-strong": c("ink-3"),
        ring: c("blue"),
        background: c("board"),
        foreground: c("ink"),
        bg: { DEFAULT: c("board"), subtle: c("board-shade"), elevated: c("paper") },
        surface: { DEFAULT: c("paper"), hover: c("board-shade"), active: c("grid") },
        fg: { DEFAULT: c("ink"), secondary: c("ink-2"), muted: c("ink-3"), inverse: c("paper") },
        brand: { DEFAULT: c("red"), light: c("red-ink"), dark: c("red") },
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "14px",
        "2xl": "18px",
        "3xl": "24px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
