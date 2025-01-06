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
                "primary-50": palette.primary[50],
                "primary-100": palette.primary[100],
                "primary-200": palette.primary[200],
                "primary-300": palette.primary[300],
                "primary-400": palette.primary[400],
                "primary-500": palette.primary[500],
                "primary-600": palette.primary[600],
                "primary-700": palette.primary[700],
                "primary-800": palette.primary[800],
                "primary-900": palette.primary[900],
                "landing-blue": "#EFF6FF",
                "highlight-green-sea": "#24EEBD",
                "highlight-black-sea": "#182453",
                "carousel-video-gradient-blue-top": "#3F7EF2",
                "carousel-video-gradient-blue-bottom": "#24498C",
                optional: "#7A8C96",
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
