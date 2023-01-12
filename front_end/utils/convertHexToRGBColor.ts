const convertHexToRGBColor = (color?: string, transparency?: string) => {
  if (!color) return "";
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b}, ${transparency})`;
};

export default convertHexToRGBColor;
