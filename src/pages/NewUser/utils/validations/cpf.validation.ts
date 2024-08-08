export function cpfValidator(cpf: string): boolean {
  let isValid = false;

  // Remove all non-digit characters
  cpf = cpf.replace(/[^\d]+/g, '');

  // validate cpf length
  if (cpf.length !== 11) return false;

  // validate invalid cpf characters
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let rest;

  // check first verify digit
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;

  // check second verify digit
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(10, 11))) return false;

  isValid = true;
  console.log("[OFF] Valid CPF", isValid)

  return isValid;
}
