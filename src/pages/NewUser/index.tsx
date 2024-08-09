import { useContext, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHookFormMask } from "use-mask-input";

import { useRegistrationsHook } from "~/hooks/registrations.hook";
import { RegistrationsContext } from "~/contexts/registrations.context";
import {
  ERegistrationsStatus,
  TRegistrationsData,
} from "~/types/registrations.types";

import routes from "~/router/routes";

import { IconButton } from "~/components/Buttons/IconButton";
import { Form } from "./components/Form";
import { SnackBar } from "~/components/Snackbar";

import { formatDate } from "./utils/formatters";
import { schema } from "./utils/validations";
import * as S from "./styles";

const NewUserPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const { registrationsState: registrations } =
    useContext(RegistrationsContext);

  const { mutation } = useRegistrationsHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const registerWithMask = useHookFormMask(register);

  const history = useHistory();

  const goToHomePage = () => history.push(routes.dashboard);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const dateFormat = formatDate(data.admissionDate);
    const isUserAlreadyRegistered = registrations.some(
      (registration) => registration.cpf === data.cpf
    );
    const getHighestId: number = registrations.reduce(
      (acc: number, curr: TRegistrationsData) =>
        Number(curr.id) > acc ? Number(curr.id) : acc,
      0
    );

    const payload: Partial<TRegistrationsData> = {
      ...data,
      admissionDate: dateFormat,
      id: (getHighestId + 1).toString(),
      status: ERegistrationsStatus.REVIEW,
    };

    if (isUserAlreadyRegistered) {
      setOpenSnackbar(true);
    } else {
      mutation.mutate(payload);
    }
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={goToHomePage} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>

        <Form
          errors={errors}
          register={register}
          onSubmit={handleSubmit(onSubmit)}
          registerWithMask={registerWithMask}
        />

        <SnackBar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message="CPF de usuário já cadastrado!"
        />
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
