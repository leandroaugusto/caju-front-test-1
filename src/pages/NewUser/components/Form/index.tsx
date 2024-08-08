import { TextField } from "~/components/TextField";
import Button from "~/components/Buttons";

import { IFormProps } from "./types";
import * as S from "./styles";

export const Form = ({
  onSubmit,
  errors,
  register,
  registerWithMask,
}: IFormProps) => {
  return (
    <S.Form onSubmit={onSubmit}>
      <TextField
        id="name"
        label="Nome"
        {...register("name", { required: true })}
        error={errors.name?.message as string}
      />

      <TextField
        id="email"
        label="Email"
        type="email"
        {...register("email", { required: true })}
        error={errors.email?.message as string}
      />

      <TextField
        id="cpf"
        type="tel"
        label="CPF"
        {...registerWithMask("cpf", "999.999.999-99", {
          required: true,
        })}
        error={errors.cpf?.message as string}
      />

      <TextField
        id="admissionDate"
        type="date"
        label="Data de admissão"
        {...register("admissionDate", { required: true })}
        error={errors.admissionDate?.message as string}
      />

      <Button type="submit">Cadastrar</Button>
    </S.Form>
  );
};
