// Safe polyfill for crypto.getRandomValues in Vitest (Node.js 16–20+)
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
