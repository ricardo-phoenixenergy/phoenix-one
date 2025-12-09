export default function imageLoader({ src, width, quality }) {
  const basePath = process.env.NODE_ENV === 'production' ? '/phoenix-one' : '';
  return `${basePath}${src}?w=${width}&q=${quality || 75}`;
}