import { isValid } from 'date-fns'

const currentDate = new Date();
const minDate = new Date("1970-01-01");

export const dateValidator = (value: string): boolean => {
  const parsedDate = new Date(value); // Parse date string to Date object
  const isValidDate = isValid(parsedDate)
    && parsedDate >= minDate
    && parsedDate <= currentDate;

  return isValidDate
}
