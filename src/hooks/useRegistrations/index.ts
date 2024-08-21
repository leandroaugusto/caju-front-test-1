import { useQuery, useMutation, useQueryClient, keepPreviousData, DefaultError } from "@tanstack/react-query";

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

export function useFetchAllRegistrationsHook() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => Services.fetchAllRegistrations(),
    enabled: true,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useRegistrationsHook() {
  const queryClient = useQueryClient();

  const saveUser = useMutation({
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

  return { saveUser, deleteUser, reviewUser }
}
