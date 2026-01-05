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
                brand: {
                    "blue-light": "#4169E1",
                    "blue-deep": "#2D3DCC",
                    "orange": "#FF5C00",
                },
            },
            screens: {
                '3xl': '1920px',
            },
        },
    },
    plugins: [],
};
export default config;
