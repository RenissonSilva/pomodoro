module.exports = {
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}'
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [
        require('@tailwindcss/typography')
    ],
};
