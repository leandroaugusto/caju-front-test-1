import { TRegistrationsData } from "~/types/registrations.types";

import { useRegistrationsHook } from "./hooks/registrationsHook";
import { SearchBar } from "./components/Searchbar";
import { Columns } from "./components/Columns";
import * as S from "./styles";

const DashboardPage = () => {
  const { data, isLoading, error } = useRegistrationsHook();
  const registrations: TRegistrationsData[] | undefined = data;

  if (isLoading) return <p data-testid="loading-container">Loading</p>;

  if (error && error.message)
    return <p data-testid="error-container">{error.message}</p>;

  return (
    <S.Container>
      <SearchBar />
      <Columns registrations={registrations} />
    </S.Container>
  );
};

export default DashboardPage;
