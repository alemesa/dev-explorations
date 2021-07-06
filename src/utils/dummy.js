/**
 * Get a random placeholder image from unsplash
 *
 * @param {string} alt custom alt text
 */
export function randomImage(width = 200, height = 125, alt = null) {
  const rand = `${Math.random() * 10000}`;

  return {
    src: `https://source.unsplash.com/random/${width}x${height}?sig=${rand}`,
    alt: alt || `Image ${rand}`
  };
}
