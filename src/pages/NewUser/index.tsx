import { useContext, useRef, useState } from "react";
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
import { Modal } from "~/components/Modal";

import { formatDate } from "./utils/formatters";
import { schema } from "./utils/validations";
import * as S from "./styles";

const NewUserPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const payload = useRef<Partial<TRegistrationsData>>({});

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

  const goToHomePage = ({ state }: { state?: string }) =>
    history.push(routes.dashboard, state);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const dateFormat = formatDate(data.admissionDate);
    const isUserAlreadyRegistered = registrations.some(
      (registration) => registration.cpf === data.cpf
    );
    const getHighestId: number = registrations.reduce(
      (acc: number, curr: TRegistrationsData) =>
        Number(curr.id) > acc ? Number(curr.id) : acc,
      0
    );
    const id: string = (getHighestId + 1).toString();

    payload.current = {
      ...data,
      id,
      admissionDate: dateFormat,
      status: ERegistrationsStatus.REVIEW,
    };

    if (isUserAlreadyRegistered) {
      setErrorMessage("CPF de usuário já cadastrado");
      setOpenSnackbar(true);
    } else {
      setOpenModal(true);
    }
  };

  const saveUser = async () => {
    if (!Object.hasOwn(payload.current, "id")) return;

    try {
      await mutation.mutateAsync(payload.current);
      goToHomePage({ state: "registered" });
    } catch (error) {
      setOpenModal(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHomePage({})} aria-label="back">
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
          message={errorMessage}
        />

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          message="Registrar novo usuário?"
          confirm={saveUser}
        />
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
