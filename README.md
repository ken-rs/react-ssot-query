# react-ssot-query

[![CI](https://github.com/ken-rs/react-ssot-query/actions/workflows/test.yml/badge.svg)](https://github.com/ken-rs/react-ssot-query/actions/workflows/test.yml)
[![npm version](https://img.shields.io/npm/v/react-ssot-query.svg)](https://www.npmjs.com/package/react-ssot-query)
[![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen.svg)](./coverage)

React hooks for managing hierarchical query parameters as a Single Source of Truth (SSOT).

---

## 📘 Overview

`react-ssot-query` is a lightweight set of React hooks that treat URL query parameters as the single source of truth (SSOT) for application state. It enables a predictable and maintainable state management model—without the need for Redux or Context APIs.

- `useSubParamState` allows you to handle a specific subkey within a query parameter just like `useState`, enabling intuitive URL-based state management.
- `useParamConfig` lets you manage a full namespace (`paramKey`) of state entries as a unified object.
- `useParamChangeWatcher` detects changes in the config and safely triggers side effects when the structure is updated.

The format `paramKey=subKey~value,...` supported by this library is flexible enough to handle view modes, filters, tab states, form preservation, and more.  
It also enhances shareability, browser history support, and integration with external systems—making your application easier to debug, share, and scale.

---

## 🚀 Installation

```bash
npm install react-ssot-query
# or
yarn add react-ssot-query
```

---

## 🔧 Usage

### `useSubParamState`

```tsx
const [mode, setMode] = useSubParamState('viewer1', 'mode');

return (
  <button onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}>
    Mode: {mode}
  </button>
);
```

### `useParamConfig`

```tsx
const [config, setConfig] = useParamConfig('viewer1');

useEffect(() => {
  if (config.id) flyToById(config.id);
}, [config.id]);

setConfig({ city: 'Sapporo', rotate: 'off' });
```

### `useParamChangeWatcher`

```tsx
useParamChangeWatcher('viewer1', (config) => {
  if (config.rotate === 'on') startCameraRotation();
});
```

---

## 🧩 API

### `useSubParamState(paramKey: string, subKey: string): [string | null, (value: string | null) => void]`

Treats a single subkey in the query as local state.

### `useParamConfig(paramKey: string): [Record<string, string>, (updates: Record<string, string>) => void]`

Returns the full key-value object under a given paramKey and a setter to update part of it.

### `useParamChangeWatcher(paramKey: string, onChange: (config: Record<string, string>) => void): void`

Watches for changes in the paramMap and triggers `onChange(config)` if the structure updates.

---

## 🧪 Development & Testing

```bash
npm run dev       # Start dev server
npm run test      # Run tests (Vitest)
npm run build     # Build (Vite)
```

GitHub Actions CI runs tests and coverage on Node.js 16 / 18 / 20.

---

## 📄 License

MIT © 2024 [ken-rs](https://github.com/ken-rs)

---

## 🙌 Contributing

Contributions are welcome!  
Feel free to submit issues or pull requests for improvements, naming suggestions, utility extensions, or better typings.

Please follow the existing code style (TypeScript, ESLint, Prettier) and include test coverage for new features.
