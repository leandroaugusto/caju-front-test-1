export const nameValidator = (str: string): boolean => {
  const regex = /^[a-zA-Z]+.*\s+.*$/;
  const isValid = regex.test(str);

  return isValid
};
