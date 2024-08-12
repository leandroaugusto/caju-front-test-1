import { useRef, useState, useContext } from "react";
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

import { Form } from "./components/Form";

import { IconButton } from "~/components/Buttons/IconButton";
import { SnackBar } from "~/components/Snackbar";
import { Modal } from "~/components/Modal";
import { Loading } from "~/components/Loading";

import { formatDate } from "./utils/formatters";
import { schema } from "~/schemas/new-user.schema";

import * as S from "./styles";

const NewUserPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const payload = useRef<Partial<TRegistrationsData>>({});

  const { registrationsState: registrations } =
    useContext(RegistrationsContext);

  const { save } = useRegistrationsHook();

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
      (registration: TRegistrationsData) => registration.cpf === data.cpf
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

    setLoading(true);

    try {
      await save.mutateAsync(payload.current);
      goToHomePage({ state: "Admissão salva com sucesso" });
    } catch (error) {
      setOpenModal(false);
      setLoading(false);

      if (error instanceof Error) {
        setErrorMessage(error.message);
        setOpenSnackbar(true);
      }
    }
  };

  if (loading) return <Loading />;

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
          message="Deseja registrar nova admissão?"
          confirm={saveUser}
        />
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
