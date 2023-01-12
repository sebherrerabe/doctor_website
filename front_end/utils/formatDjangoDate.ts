const formatDjangoDate = (date: string) => {
  const [year, month, day] = date.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};

export default formatDjangoDate;
