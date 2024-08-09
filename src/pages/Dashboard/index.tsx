import { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { RegistrationsContext } from "~/contexts/registrations.context";

import { SnackBar } from "~/components/Snackbar";
import { Loading } from "~/components/Loading";

import { SearchBar } from "./components/Searchbar";
import { Columns } from "./components/Columns";

import * as S from "./styles";

const DashboardPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const {
    registrationsState: registrations,
    isLoading,
    error,
  } = useContext(RegistrationsContext);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.state === "registered") {
      setOpenSnackbar(true);
      history.replace(location.pathname, null);
    }
  }, [location.state, location.pathname, history]);

  if (isLoading) return <Loading />;

  if (error && error.message)
    return <p data-testid="error-container">{error.message}</p>;

  return (
    <S.Container>
      <SearchBar />
      <Columns registrations={registrations} />

      <SnackBar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={"Admissão salva com sucesso"}
      />
    </S.Container>
  );
};

export default DashboardPage;
