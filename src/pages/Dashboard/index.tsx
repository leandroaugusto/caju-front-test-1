import { useEffect, useMemo, useState, memo, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";

import {
  useFetchAllRegistrationsHook,
  useFetchRegistrationsByCpfHook,
} from "~/hooks/registrations.hook";

import { SnackBar } from "~/components/Snackbar";
import { Loading } from "~/components/Loading";
import { Columns } from "./components/Columns";

import { Search } from "./containers/Search";

import * as S from "./styles";

const SearchMemo = memo(Search, () => true);

function DashboardPage() {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [cpfValueState, setCpfValueState] = useState<string>("");

  const {
    data: registrations,
    isFetchedAfterMount,
    refetch,
    isRefetching,
    isLoading: allRegistrationsLoading,
    error: allRegistrationsError,
  } = useFetchAllRegistrationsHook();

  const {
    data: filteredRegistrations,
    isLoading: filteredRegistrationsLoading,
    error: filteredRegistrationsError,
  } = useFetchRegistrationsByCpfHook(cpfValueState);

  const fetchedData = useMemo(() => {
    return filteredRegistrations || registrations;
  }, [registrations, filteredRegistrations]);

  const isLoading = useMemo(() => {
    return filteredRegistrationsLoading || allRegistrationsLoading;
  }, [allRegistrationsLoading, filteredRegistrationsLoading]);

  const error = useMemo(() => {
    return filteredRegistrationsError || allRegistrationsError;
  }, [allRegistrationsError, filteredRegistrationsError]);

  const handleSetCpfValue = useCallback(
    (cpf: string) => {
      setCpfValueState(cpf);
    },
    [setCpfValueState]
  );

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.state) {
      setOpenSnackbar(true);
      setSnackbarMessage(location.state as string);
      history.replace(location.pathname, null);
    }
  }, [location.state, location.pathname, history]);

  useEffect(() => {
    console.log("[OFF] Dashboard CPF", { cpfValueState });
  }, [cpfValueState]);

  useEffect(() => {
    if (isRefetching) setCpfValueState("");
  }, [isRefetching, setCpfValueState]);

  if (isLoading) return <Loading />;

  if (error && error.message)
    return <p data-testid="error-container">{error.message}</p>;

  return (
    <S.Container>
      <Search
        cpfValueAsProp={cpfValueState}
        setCpfValueAsProp={handleSetCpfValue}
      />

      <Columns registrations={fetchedData} />

      <SnackBar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </S.Container>
  );
}

export default DashboardPage;
