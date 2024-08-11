import { useEffect, useMemo, useState } from "react";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

import { SnackBar } from "~/components/Snackbar";
import { Modal } from "~/components/Modal";
import { Loading } from "~/components/Loading";

import { RegistrationCard } from "../../components/RegistrationCard";

import { ERegistrationsStatus } from "~/types/registrations.types";
import { useRegistrationsHook } from "~/hooks/registrations.hook";

import { ICardContainerProps, TActionType } from "./types";

import { promptMessages } from "./constants";

export const Card = ({ data }: ICardContainerProps) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [action, setAction] = useState<TActionType>("review");
  const [loading, setLoading] = useState<boolean>(false);

  const { deleteUser, reviewUser } = useRegistrationsHook();

  const modalMessage = useMemo(() => {
    return `${promptMessages[action]} ${data.employeeName}?`;
  }, [action, data]);

  const handleAction = async (fn: Promise<UseMutateAsyncFunction>) => {
    setLoading(true);
    try {
      (await fn)();
      setSnackbarMessage("Operação concluída");
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
      }
    } finally {
      setLoading(false);
      setOpenModal(false);
      setOpenSnackbar(true);
    }
  };

  const handleActionsMap = {
    approve: () =>
      handleAction(
        reviewUser.mutateAsync({
          id: data.id,
          status: ERegistrationsStatus.APPROVED,
        })
      ),
    reprove: () =>
      handleAction(
        reviewUser.mutateAsync({
          id: data.id,
          status: ERegistrationsStatus.REPROVED,
        })
      ),
    review: () =>
      handleAction(
        reviewUser.mutateAsync({
          id: data.id,
          status: ERegistrationsStatus.REVIEW,
        })
      ),
    delete: () => handleAction(deleteUser.mutateAsync(data.id)),
  };

  const handleOpenModal = (key: TActionType) => {
    setOpenModal(true);
    setAction(key);
  };

  useEffect(() => {
    console.log("[OFF] Snackbar", { snackbarMessage, openSnackbar });
  }, [snackbarMessage, openSnackbar]);

  if (loading) return <Loading />;

  return (
    <>
      <RegistrationCard data={data} onCardAction={handleOpenModal} />

      <SnackBar
        open={openSnackbar}
        message={snackbarMessage}
        onClose={() => setOpenSnackbar(false)}
      />

      <Modal
        open={openModal}
        message={modalMessage}
        onClose={() => setOpenModal(false)}
        confirm={() => handleActionsMap[action]()}
      />
    </>
  );
};
