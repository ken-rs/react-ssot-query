export function buildViewerString(obj: Record<string, string>): string {
  return Object.entries(obj)
    .map(([k, v]) => `${k}~${v}`)
    .join(',');
}
