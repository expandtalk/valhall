
export const parseCoordinates = (coordString: string): string | null => {
  const coords = coordString.split(',');
  if (coords.length === 2) {
    const lat = parseFloat(coords[0].trim());
    const lng = parseFloat(coords[1].trim());
    if (!isNaN(lat) && !isNaN(lng)) {
      return `(${lng},${lat})`;
    }
  }
  return null;
};
