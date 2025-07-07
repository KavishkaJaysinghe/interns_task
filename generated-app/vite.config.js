import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { coverageConfigDefaults } from '@vitest/coverage-c8';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/'],
    },
  },
});