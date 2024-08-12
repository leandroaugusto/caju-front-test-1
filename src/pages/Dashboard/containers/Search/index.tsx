import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHookFormMask } from "use-mask-input";

import { schema } from "~/schemas/search.schema";

import { RegistrationsContext } from "~/contexts/registrations.context";
import { cpfValidator } from "~/utils/validations/cpf.validation";

import { SearchBar } from "../../components/Searchbar";

import routes from "~/router/routes";

export const Search = () => {
  const [debouncedCPF, setDebouncedCPF] = useState<string>("");
  const [validCpf, setValidCpf] = useState<string>("");

  const { refetch } = useContext(RegistrationsContext);

  const { watch, register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const registerWithMask = useHookFormMask(register);
  const cpf = watch("cpf");

  const history = useHistory();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("[OFF] Submit", { data, validCpf });
    setValidCpf(data.cpf);
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
    <SearchBar
      onClick={goToNewAdmissionPage}
      register={registerWithMask}
      refetch={refetch}
    />
  );
};
