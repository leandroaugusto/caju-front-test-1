import * as yup from "yup";

import { cpfValidator, emailValidator, nameValidator, dateValidator } from ".";

export const schema = yup
  .object({
    employeeName: yup
      .string()
      .required("Nome é obrigatório")
      .min(2, "Nome deve ter ao menos 2 caracteres")
      .test("is-valid-name", "Insira um nome válido", (value) => {
        return !value.endsWith(" ") && nameValidator(value)
      }),

    email: yup
      .string()
      .required("Email é obrigatório")
      .email("Email inválido")
      .test("is-valid-email", "Email inválido", (value) => emailValidator(value)),

    cpf: yup
      .string()
      .required("CPF é obrigatório")
      .test("is-valid-cpf", "CPF inválido", (value) => cpfValidator(value))
      .transform((value) => value.replace(/\D/g, '')), // Remove all non-digits

    admissionDate: yup
      .string()
      .required("Data inválida")
      .test(
        "is-valid-date",
        "A data não pode ser anterior a 01/01/1970 ou posterior à data atual",
        (value) => dateValidator(value)
      )
  })
  .required();
