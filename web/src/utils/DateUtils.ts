export const FormattedDateBR = (date: string) => {
  const dateParser = new Date(date);
  const year = dateParser.getFullYear();
  const month = `${dateParser.getMonth() + 1}`.padStart(2, "0");
  const day = dateParser.getDate();

  return `${day}/${month}/${year}`;
};

export const FormattedDate = (date: string) => {
  const dateParser = new Date(date);
  const year = dateParser.getFullYear();
  const month = `${dateParser.getMonth() + 1}`.padStart(2, "0");
  const day = dateParser.getDate();

  return `${year}-${month}-${day}`;
};