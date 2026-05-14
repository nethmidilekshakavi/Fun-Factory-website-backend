import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        hmr: { overlay: false },
    },
    optimizeDeps: {
        include: ['react', 'react-dom'],
    },
    plugins: [
        react({
            include: ['**/*.jsx', '**/*.js'],
        }),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
    ],
});
