import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import { TextField } from "~/components/TextField";

import { useFetchAllRegistrationsHook } from "~/hooks/useRegistrations";

import routes from "~/router/routes";

import { ISearchBarProps } from "./types";
import * as S from "./styles";

export const SearchBar = ({ register }: ISearchBarProps) => {
  const { refetch } = useFetchAllRegistrationsHook();

  const history = useHistory();

  const goToNewAdmissionPage = () => history.push(routes.newUser);

  return (
    <S.Container data-testid="search-bar-container">
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          id="cpf"
          type="tel"
          placeholder="Digite um CPF válido"
          {...register("cpf", "999.999.999-99")}
        />
      </form>

      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh onClick={() => refetch()} />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
