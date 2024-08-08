import { useContext } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHookFormMask } from "use-mask-input";

import { RegistrationsContext } from "~/contexts/registrationsContext";
import { IconButton } from "~/components/Buttons/IconButton";
import { Form } from "./components/Form";
import routes from "~/router/routes";

import { formatDate } from "./utils/formatters";
import { schema } from "./utils/validations";
import * as S from "./styles";

const NewUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const registerWithMask = useHookFormMask(register);

  const {
    registrationsState: registrations,
    isLoading,
    error,
  } = useContext(RegistrationsContext);

  console.log("[OFF] registrations", registrations, isLoading, error);

  const history = useHistory();

  const goToHomePage = () => {
    history.push(routes.dashboard);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const dateFormat = formatDate(data.admissionDate);
    console.log("onSubmit", { data, dateFormat });
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHomePage()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>

        <Form
          errors={errors}
          register={register}
          onSubmit={handleSubmit(onSubmit)}
          registerWithMask={registerWithMask}
        />
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
