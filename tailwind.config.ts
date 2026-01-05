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
                    blue: "#4361ee",
                    orange: "#ff6b35",
                    headerStart: "#4169e1",
                    headerEnd: "#2d3dcc",
                },
            },
        },
    },
    plugins: [],
};
export default config;
