/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                blue: {
                    DEFAULT: '#007BFF',
                },
            },
        },
    },
    plugins: [],
};
