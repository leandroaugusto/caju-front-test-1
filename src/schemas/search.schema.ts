import * as yup from "yup";

import { cpfValidator } from "~/utils/validations/cpf.validation";

export const schema = yup.object({
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .test("is-valid-cpf", "CPF inválido", (value) => cpfValidator(value))
    .transform((value) => value.replace(/\D/g, "")),
});
