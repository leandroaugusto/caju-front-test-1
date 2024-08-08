import * as yup from "yup";
import { parse, format, isValid } from "date-fns";

import { cpfValidator, emailValidator, nameValidator, dateValidator } from "./utils/validations";

export const schema = yup
  .object({
    name: yup
      .string()
      .test("is-valid-name", "Insira o nome completo", (value) => nameValidator(value as string))
      .min(2, "Nome deve ter ao menos 2 caracteres")
      .required("Nome é obrigatório"),
    email: yup.string()
      .test("is-valid-email", "Email inválido", (value) => emailValidator(value as string))
      .email()
      .required("Email é obrigatório"),
    cpf: yup
      .string()
      .test("is-valid-cpf", "CPF inválido", (value) => cpfValidator(value as string))
      .transform((value) => value.replace(/\D/g, '')) // Remove all non-digits
      .required("CPF é obrigatório"),
    admissionDate: yup.string()
      .required("A data é obrigatória")
      .test(
        "is-valid-date",
        "A data não pode ser anterior a 01/01/1970 ou posterior à data atual",
        (value) => dateValidator(value)
      )
      .transform((_, originalValue) => {
        const parsedDate = parse(originalValue, "yyyy-mm-dd", new Date()); // Parse the date into a new Date object
        return isValid(parsedDate) ? format(parsedDate, "dd/mm/yyyy") : originalValue;
      })
      .typeError("O campo de data é obrigatório e deve conter uma data válida")
  })
  .required();
