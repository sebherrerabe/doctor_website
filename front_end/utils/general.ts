export const truncateString = (title: string, length: number) => {
  if (title.length <= length) return title;
  return title.slice(0, length) + "...";
};

export const formatDjangoDate = (date: string) => {
  const [year, month, day] = date.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};

export const convertHexToRGBColor = (color?: string, transparency?: string) => {
  if (!color) return "";
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b}, ${transparency})`;
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
