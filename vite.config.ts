import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

// Polyfill for crypto.getRandomValues (Node.js 16–20+)
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = {} as Crypto;
}
if (typeof globalThis.crypto.getRandomValues === 'undefined') {
  globalThis.crypto.getRandomValues = (arr: any) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256);
    }
    return arr;
  };
}

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
    exclude: [...configDefaults.exclude],
    setupFiles: ['./tests/setup.ts']
  }
});
