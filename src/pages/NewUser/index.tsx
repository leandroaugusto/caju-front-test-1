import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { TextField } from "~/components/TextField";
import { TextMaskField } from "~/components/TextField/TextMask";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";

import routes from "~/router/routes";
import { cpfValidator } from "~/utils/cpfValidator";

import * as S from "./styles";

const schema = z.object({
  name: z
    .string()
    .toUpperCase()
    .min(2, { message: "Insira um nome válido" })
    .max(100, { message: "Nome deve conter no máximo 100 caracteres" }),
  email: z.string().email({ message: "Insira um email válido" }),
  cpf: z
    .string()
    .min(11, { message: "Insira um cpf completo" })
    .refine(
      (val: string) => {
        console.log("[OFF] CPF", { val, cpfValidator: cpfValidator(val) });
        return cpfValidator(val);
      },
      {
        message: "CPF inválido",
      }
    ),
  admissionDate: z
    .string()
    .refine(
      (val: string) => {
        const date: Date = new Date(val);
        console.log("[OFF] Date", { val, date });
        return !isNaN(date.getTime());
      },
      { message: "Insira uma data de admissão válida" }
    )
    .transform((val) => {
      const date = new Date(val);
      return /* new z.ZodDate(date) */ date;
    }),
});

const NewUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  console.log("[OFF] FORM", { errors });

  const history = useHistory();

  const goToHomePage = () => {
    history.push(routes.dashboard);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("onSubmit", { data });
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHomePage()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="name"
            label="Nome"
            register={register}
            required
            error={errors.name?.message as string}
          />

          <TextField
            id="email"
            label="Email"
            type="email"
            register={register}
            required
            error={errors.email?.message as string}
          />

          <TextMaskField
            id="cpf"
            type="tel"
            label="CPF"
            mask="999.999.999-99"
            register={register}
            required
            error={errors.cpf?.message as string}
          />

          <TextMaskField
            id="admissionDate"
            type="tel"
            label="Data de admissão"
            placeholder="dd/mm/aaaa"
            mask="99/99/9999"
            register={register}
            required
            error={errors.admissionDate?.message as string}
          />

          <Button type="submit">Cadastrar</Button>
        </S.Form>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
