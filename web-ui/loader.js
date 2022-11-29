export default function myImageLoader({ src, width, quality }) {
  return `https://powco.dev/${src}?w=${width}&q=${quality || 75}`;
}
