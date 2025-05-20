import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ReactSSOTQuery',
      fileName: (format) => `react-ssot-query.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-router-dom'],
      output: {
        globals: {
          react: 'React',
          'react-router-dom': 'ReactRouterDOM'
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov']
    },
    exclude: [...configDefaults.exclude]
  }
});
