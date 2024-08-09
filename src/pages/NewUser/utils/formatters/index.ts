export const formatDate = (value: string): string => {
  const [year, month, day] = value.split('-');

  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  const formattedDay = String(date.getUTCDate()).padStart(2, '0');
  const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
  const formattedYear = date.getUTCFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}
