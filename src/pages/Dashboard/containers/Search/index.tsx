import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHookFormMask } from "use-mask-input";
import { useQueryClient } from "@tanstack/react-query";

import * as Services from "~/services";

import { schema } from "~/schemas/search.schema";

import { useFetchAllRegistrationsHook } from "~/hooks/registrations.hook";
import { cpfValidator } from "~/utils/validations/cpf.validation";

import { TRegistrationsData } from "~/types/registrations.types";

import { SearchBar } from "../../components/Searchbar";
import { SnackBar } from "~/components/Snackbar";

import routes from "~/router/routes";

import { queryKey } from "~/constants";

export const Search = () => {
  const [debouncedCPF, setDebouncedCPF] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<TRegistrationsData[]>([]);

  const { refetch, isFetchedAfterMount } = useFetchAllRegistrationsHook();

  const { watch, register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const registerWithMask = useHookFormMask(register);
  const cpf = watch("cpf");

  const history = useHistory();

  const queryClient = useQueryClient();

  // const fetchRegistrationByCPF = useCallback(async (cpf: string) => {
  //   try {
  //     const data = await Services.fetchRegistrationByCPF(cpf);
  //     setFetchedData(data);
  //   } catch (error) {
  //     setOpenSnackbar(true);
  //   }
  // }, []);

  const updateCacheWithFilteredData = (cpf: string) => {
    queryClient.setQueryData([queryKey], (oldData: TRegistrationsData[]) => {
      if (!oldData) return;

      // const filteredUser = oldData.map((user) =>
      //   user.cpf === cpf
      //     ? { ...user, active: true }
      //     : { ...user, active: false }
      // );

      const filteredUser = oldData.filter((user) => user.cpf === cpf);

      if (filteredUser.length) return filteredUser;

      console.log("[OFF] updateCacheWithFilteredData > filteredUser", {
        filteredUser,
        oldData,
      });

      setOpenSnackbar(true);

      return oldData;
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("[OFF] Submit CPF", { data });
    updateCacheWithFilteredData(data.cpf);
  };

  const goToNewAdmissionPage = () => history.push(routes.newUser);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedCPF(cpf), 500);
    return () => clearTimeout(timer);
  }, [cpf]);

  useEffect(() => {
    console.log("[OFF] Debounce", {
      cpf,
      debouncedCPF,
      isFetchedAfterMount,
      length: debouncedCPF.length,
    });
    if (!debouncedCPF && isFetchedAfterMount) {
      refetch();
    }
    if (debouncedCPF && cpfValidator(debouncedCPF)) {
      handleSubmit(onSubmit)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCPF]);

  return (
    <>
      <SearchBar
        refetch={refetch}
        register={registerWithMask}
        onClick={goToNewAdmissionPage}
      />

      <SnackBar
        open={openSnackbar}
        message="Usuário não encontrado"
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  );
};
