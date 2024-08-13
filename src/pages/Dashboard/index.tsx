import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { useFetchAllRegistrationsHook } from "~/hooks/registrations.hook";

import { SnackBar } from "~/components/Snackbar";
import { Loading } from "~/components/Loading";

import { Search } from "./containers/Search";
import { Columns } from "./components/Columns";

import * as S from "./styles";

const DashboardPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const {
    data: registrations,
    isLoading,
    error,
  } = useFetchAllRegistrationsHook();

  console.log("[OFF] Dashboard", { registrations });

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.state) {
      setOpenSnackbar(true);
      setSnackbarMessage(location.state as string);
      history.replace(location.pathname, null);
    }
  }, [location.state, location.pathname, history]);

  if (isLoading) return <Loading />;

  if (error && error.message)
    return <p data-testid="error-container">{error.message}</p>;

  return (
    <S.Container>
      <Search />

      <Columns registrations={registrations} />

      <SnackBar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </S.Container>
  );
};

export default DashboardPage;
