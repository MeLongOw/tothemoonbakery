/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                roboto: "roboto",
                montserrat: "montserrat",
            },
            screens: {
                xl: "1280px",
            },

            aspectRatio: {
                "16/5": "16 / 5",
                "card": "4 / 5",
            },
            width: {
                main: "1280px",
            },
            maxWidth: {
                main: "1280px",
            },
            backgroundColor: {
                modal: "rgba(0,0,0,0.5)",
                "dark-main": "#0d1018",
            },
            colors: {
                card: "#161b22",
                "dark-main": "#0d1018",
                "orange-main": "#f0932b",
                "orange-yellow-main": "#f39c12",
                "yellow-main": "#f1c40f",
            },
            gridTemplateColumns: {
                14: "repeat(14, minmax(0, 1fr))",
                16: "repeat(16, minmax(0, 1fr))",
            },
            keyframes: {
                "spin-reverse": {
                    "to": {
                        transform: "rotate(-360deg)",
                    },
                  
                },
                "fade-out": {
                    "0%": {
                        opacity: "1",
                    },
                    "100%": {
                        opacity: "0",
                    },
                },
                "pulsate-fwd": {
                    "0%": {
                        transform: "scale(1)",
                    },
                    "50%": {
                        transform: "scale(1.1)",
                    },
                    "100%": {
                        transform: "scale(1)",
                    },
                },
            },
            animation: {
                "fade-out": "fade-out 0.7s ease-out both",
                "pulsate-fwd": "pulsate-fwd 1.5s ease-in-out infinite both",
                "spin-reverse": "spin-reverse 5s linear infinite",

            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
});
