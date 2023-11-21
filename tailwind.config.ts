import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
    content: [],
    plugins: [
        plugin(({ matchUtilities }) => {
            matchUtilities({
                'grid-area': (value) => ({
                    gridArea: value,
                }),
            });
        }),
    ],
    theme: {
        extend: {
            animation: {
                'pulse-color': 'pulse-color 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'pulse-color': {
                    '0%, 100%': { color: '#fff' },
                    '50%': { color: '#aaa' },
                },
            },
        },
    },
} satisfies Config;
