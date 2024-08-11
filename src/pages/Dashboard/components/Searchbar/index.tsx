import { useEffect, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHookFormMask } from "use-mask-input";

import { schema } from "~/schemas/search.schema";
import { cpfValidator } from "~/utils/validations/cpf.validation";

import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import { TextField } from "~/components/TextField";

import routes from "~/router/routes";

import * as S from "./styles";

export const SearchBar = () => {
  const [debouncedCPF, setDebouncedCPF] = useState("");

  const { watch, register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const registerWithMask = useHookFormMask(register);
  const cpf = watch("cpf");

  const history = useHistory();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("[OFF] Submit", { data });
  };

  const goToNewAdmissionPage = () => history.push(routes.newUser);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedCPF(cpf), 500);
    return () => clearTimeout(timer);
  }, [cpf]);

  useEffect(() => {
    if (debouncedCPF && cpfValidator(debouncedCPF)) handleSubmit(onSubmit)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCPF]);

  return (
    <S.Container data-testid="search-bar-container">
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          id="cpf"
          type="tel"
          placeholder="Digite um CPF válido"
          {...registerWithMask("cpf", "999.999.999-99")}
        />
      </form>

      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
