import { nextui } from "@nextui-org/theme"
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|input|navbar|ripple|spinner).js"
  ],
  theme: {
    animation: {
      "spin-slow": "spin 8s linear infinite",
      "spin-fast": "spin 1s linear infinite",
    },
  },
  variants: {
    extend: {
      animation: ["motion-safe"],
    },
  },
  plugins: [nextui()],
}

export default config
