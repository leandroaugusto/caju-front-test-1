import { useEffect, useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHookFormMask } from "use-mask-input";

import { schema } from "~/schemas/search.schema";

import { cpfValidator } from "~/utils/validations/cpf.validation";

import { SearchBar } from "../../components/Searchbar";

import { ISearchProps } from "./types";

export function Search({ setCpfValueAsProp, cpfValueAsProp }: ISearchProps) {
  const [debouncedCPF, setDebouncedCPF] = useState<string>("");

  const { watch, register, setValue, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const registerWithMask = useHookFormMask(register);
  const cpf = watch("cpf");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("[OFF] Submit CPF", { data });
    setCpfValueAsProp(data.cpf);
  };

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
    console.log("[OFF] value as prop", { cpfValueAsProp });
    if (cpfValueAsProp) {
      setValue("cpf", cpfValueAsProp);
    }
  }, [cpfValueAsProp, setValue]);

  return <SearchBar register={registerWithMask} />;
}
