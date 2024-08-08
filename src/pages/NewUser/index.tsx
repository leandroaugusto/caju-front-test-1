import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHookFormMask } from "use-mask-input";

import { TextField } from "~/components/TextField";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";

import routes from "~/router/routes";

import { schema } from "./schema.validator";
import * as S from "./styles";

const NewUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const registerWithMask = useHookFormMask(register);

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
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
