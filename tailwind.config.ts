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
                background: "#0a0a0a",
                foreground: "#ededed",
                primary: "#06b6d4",
                secondary: "#7c3aed",
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
            },
            keyframes: {
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
            },
            animation: {
                blink: "blink 1.3s infinite",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;
