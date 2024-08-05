import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import { TextField } from "~/components/TextField";
import { TextMaskField } from "~/components/TextField/TextMask";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";

import routes from "~/router/routes";

import * as S from "./styles";

const NewUserPage = () => {
  const history = useHistory();
  const goToHomePage = () => {
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHomePage()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField placeholder="Nome" label="Nome" />
        <TextField placeholder="Email" label="Email" type="email" />
        <TextMaskField placeholder="CPF" label="CPF" mask="999.999.999-99" />
        <TextMaskField label="Data de admissão" type="date" mask="99/99/9999" />
        <Button onClick={() => {}}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
