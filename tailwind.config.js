module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                blink: {
                    '0%, 50%, 100%': { opacity: 1 },
                    '25%, 75%': { opacity: 0 },
                },
            },
            animation: {
                blink: 'blink 1s steps(2, start) infinite',
            },
        },
        screens: {
            'mobile-320': '320px',
            'mobile-375': '375px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            xs: '320px',
        },
    },

    plugins: [],
}
