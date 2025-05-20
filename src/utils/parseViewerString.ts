export function parseViewerString(str: string): Record<string, string> {
  return Object.fromEntries(
    str
      .split(',')
      .map((pair) => pair.split('~'))
      .filter(([k, v]) => k && v)
  );
}
