import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { TRegistrationsData } from "~/types/registrations.types";

const DashboardPage = () => {
  const registrations: TRegistrationsData[] = [
    {
      admissionDate: "22/10/2023",
      email: "luiz@caju.com.br",
      employeeName: "Luiz Filho",
      status: "APROVED",
      cpf: "56642105087",
      id: "3",
    },
  ];

  console.log("[OFF] 1", { registrations });

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
