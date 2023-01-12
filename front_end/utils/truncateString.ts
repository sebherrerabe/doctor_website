const truncateString = (title: string, length: number) => {
  if (title.length <= length) return title;
  return title.slice(0, length) + "...";
};

export default truncateString;
