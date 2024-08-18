import { useEffect, useMemo, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHookFormMask } from "use-mask-input";

import {
  useFetchAllRegistrationsHook,
  useFetchRegistrationsByCpfHook,
} from "~/hooks/useRegistrations";

import { schema } from "~/schemas/search.schema";

import { cpfValidator } from "~/utils/validations/cpf.validation";

import { SnackBar } from "~/components/Snackbar";
import { Loading } from "~/components/Loading";
import { Columns } from "./components/Columns";
import { SearchBar } from "./components/Searchbar";

import * as S from "./styles";

const DashboardPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [cpfValueState, setCpfValueState] = useState<string>("");
  const [debouncedCPF, setDebouncedCPF] = useState<string>("");

  const {
    data: registrations,
    isLoading: allRegistrationsLoading,
    error: allRegistrationsError,
    isRefetching,
  } = useFetchAllRegistrationsHook();

  const {
    data: filteredRegistrations,
    isLoading: filteredRegistrationsLoading,
    error: filteredRegistrationsError,
  } = useFetchRegistrationsByCpfHook(cpfValueState);

  const location = useLocation();
  const history = useHistory();

  const { watch, register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const registerWithMask = useHookFormMask(register);
  const cpf = watch("cpf");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setCpfValueState(data.cpf);
  };

  const fetchedData = useMemo(() => {
    return filteredRegistrations || registrations;
  }, [registrations, filteredRegistrations])?.flat();

  const isLoading = useMemo(() => {
    return filteredRegistrationsLoading || allRegistrationsLoading;
  }, [allRegistrationsLoading, filteredRegistrationsLoading]);

  const error = useMemo(() => {
    return filteredRegistrationsError || allRegistrationsError;
  }, [allRegistrationsError, filteredRegistrationsError]);

  useEffect(() => {
    if (location.state) {
      setOpenSnackbar(true);
      setSnackbarMessage(location.state as string);
      history.replace(location.pathname, null);
    }
  }, [location.state, location.pathname, history]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedCPF(cpf), 500);
    return () => clearTimeout(timer);
  }, [cpf]);

  useEffect(() => {
    if (debouncedCPF && cpfValidator(debouncedCPF)) {
      handleSubmit(onSubmit)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCPF]);

  useEffect(() => {
    const onlyCpfNumbers = debouncedCPF?.replace(/\D/g, "");

    if (cpfValueState && onlyCpfNumbers.length !== cpfValueState.length) {
      setCpfValueState("");
    }
  }, [debouncedCPF, cpfValueState]);

  useEffect(() => {
    if (isRefetching) setCpfValueState("");
  }, [isRefetching]);

  if (isLoading) return <Loading />;

  if (error && error.message)
    return <p data-testid="error-container">{error.message}</p>;

  return (
    <S.Container>
      <SearchBar register={registerWithMask} />

      <Columns registrations={fetchedData} />

      <SnackBar
        open={openSnackbar}
        message={snackbarMessage}
        onClose={() => setOpenSnackbar(false)}
      />
    </S.Container>
  );
};

export default DashboardPage;
