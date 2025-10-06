module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
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
            colors: {
                yellow: '#FDB056',
                primary: '#1D5B43',
                secondary: '#FFBB00',
                error: '#FF4E4E',
                'red-div': '#FD5656',
                'text-div': '#DCDCDC',
                'div-green': '#81FE95',
                white: '#FFFFFF',
                bg: '#232829',
                gray: '#9B9B9B',
                'gray-100': '#919191',
                'gray-300': '#313637',
                'gray-check-box-600': '#606566',
                'gray-dark': '#484D4E',
                bgc: '#191E1F',
            },
        },
        screens: {
            'mobile-320': '320px',
            'mobile-375': '375px',
            'sm': '640px',
            md: '768px',
            'lg': '1024px',
            'xl': '1280px',
            xs: '320px',
        },
    },
    plugins: [],
}
