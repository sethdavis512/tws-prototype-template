import type { Config } from 'tailwindcss';

export default {
    darkMode: 'class',
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors(theme) {
                return {
                    primary: { ...theme.colors.amber },
                    secondary: { ...theme.colors.orange },
                    success: { ...theme.colors.green },
                    info: { ...theme.colors.blue },
                    warning: { ...theme.colors.yellow },
                    alert: { ...theme.colors.red },
                    green: {
                        '50': '#f1fcf3',
                        '100': '#dff9e6',
                        '200': '#c0f2cf',
                        '300': '#8fe6a9',
                        '400': '#56d27b',
                        '500': '#2fb558',
                        '600': '#229746',
                        '700': '#1e7739',
                        '800': '#1d5e32',
                        '900': '#194e2b',
                        '950': '#082b15'
                    }
                };
            }
        }
    },
    plugins: [
        require('tailwindcss-animate'),
        require('tailwindcss-react-aria-components')
    ]
} satisfies Config;
