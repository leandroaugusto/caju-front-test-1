import { useContext } from "react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";

import { RegistrationsContext } from "~/contexts/registrations";

import { TRegistrationsData } from "~/types/registrations.types";

import * as Services from "~/services";

import { queryKey } from "~/constants";

export const useFetchRegistrationsByCpfHook = (cpf: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [queryKey, cpf],
    queryFn: async () => {
      const cachedData: TRegistrationsData[] | undefined = queryClient.getQueryData([queryKey]);

      if (cachedData) {
        const data = cachedData?.filter((user) => user.cpf === cpf);
        if (data.length) return data;
      }

      const fetchedData = await Services.fetchRegistrationByCPF(cpf);

      queryClient.setQueryData([queryKey], (oldData: TRegistrationsData[]) => {
        return oldData ? [...oldData, fetchedData] : [fetchedData];
      });

      return fetchedData;
    },
    enabled: !!cpf
  });
};

export function useFetchinitialRegistrationsHook(page: number) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => Services.fetchAllRegistrations({ page }),
    enabled: true,
    refetchOnWindowFocus: false,
  });
}

export function useFetchAllRegistrationsHook(page: number = 0, refetchOnMount: boolean = false) {
  const { registrationsState } = useContext(RegistrationsContext);

  return useQuery({
    queryKey: [queryKey],
    queryFn: () => Services.fetchAllRegistrations({ page }),
    enabled: true,
    initialData: registrationsState,
    placeholderData: keepPreviousData,
    refetchOnMount,
    refetchOnWindowFocus: false,
  });
}

export function useRegistrationsHook() {
  const queryClient = useQueryClient();

  const save = useMutation({
    mutationFn: Services.saveRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  });

  const deleteUser = useMutation({
    mutationFn: Services.deleteRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  })

  const reviewUser = useMutation({
    mutationFn: Services.reviewRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  })

  return { save, deleteUser, reviewUser }
}
