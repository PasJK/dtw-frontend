import type { Config } from "tailwindcss";
import palette from "./src/configs/palette";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/*.{js,ts,jsx,tsx,mdx}",
        "./src/layouts/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            width: {
                "screen-xs": "300px",
                "screen-sm": "600px",
                "screen-md": "900px",
                "screen-lg": "1200px",
                "screen-xl": "1536px",
                "screen-2xl": "1920px",
                "screen-3xl": "2048px",
                "screen-4xl": "2560px",
            },
            screens: {
                xs: "300px",
                sm: "600px",
                md: "900px",
                lg: "1200px",
                xl: "1536px",
                "2xl": "1920px",
                "3xl": "2048px",
                "4xl": "2560px",
                tablet: "640px",
                laptop: "1024px",
                desktop: "1200px",
            },
            minWidth: {
                scatterPlot: "40vw",
                lineChart: "40vw",
            },
            maxWidth: {
                scatterPlot: "40vw",
                lineChart: "40vw",
            },
            minHeight: {
                scoreCard: "120px",
            },
            colors: {
                black: palette.black.main,
                secondary: palette.secondary.main,
                primary: palette.primary.main,
                optional: "#7A8C96",
                gold: palette.primary.gold,
            },
            borderRadius: {
                "4xl": "2rem",
                "5xl": "2.5rem",
                "6xl": "3rem",
                "7xl": "3.5rem",
            },
        },
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [],
    important: true,
};
export default config;
