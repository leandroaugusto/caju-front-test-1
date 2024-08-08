export const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, '') // Remove all non-digits
    .replace(/(\d{3})(\d)/, '$1.$2') // Add a dot between 3rd and 4th digits
    .replace(/(\d{3})(\d)/, '$1.$2') // Add a dot between 6th and 7th digits
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Add a dash between 9th and 10th digits
};
