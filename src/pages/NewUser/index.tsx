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

          <TextField
            id="cpf"
            type="tel"
            label="CPF"
            registerWithMask={registerWithMask}
            required
            error={errors.cpf?.message as string}
          />
          {/* <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <TextField
                id="cpf"
                type="tel"
                label="CPF"
                required
                error={errors.cpf?.message as string}
                {...field}
                ref={withMask("999.999.999-99")}
              />
            )}
          /> */}

          <TextField
            id="admissionDate"
            type="date"
            label="Data de admissão"
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
