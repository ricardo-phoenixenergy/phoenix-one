export const basePath = process.env.NODE_ENV === 'production' ? '/phoenix-one' : '';

export function getAssetPath(path: string): string {
  return `${basePath}${path}`;
}