// Safe polyfill for crypto.getRandomValues in Node.js
if (!globalThis.crypto?.getRandomValues) {
  Object.defineProperty(globalThis.crypto ??= {}, 'getRandomValues', {
    value: (arr: any) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
    configurable: true,
    writable: true,
  });
}
