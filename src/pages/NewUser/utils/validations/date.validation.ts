export const dateValidator = (value: string): boolean => {
  const inputDate = new Date(value);
  const currentDate = new Date();
  const minDate = new Date("1970-01-01");

  const isValidDate = inputDate < currentDate && inputDate > minDate;

  return isValidDate
}
