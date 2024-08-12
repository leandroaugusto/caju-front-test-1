import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as Services from "~/services";

const key: string = "registrations";

export function useFetchRegistrationsByCpfHook(cpf: string) {
  return useQuery({
    queryKey: [key, cpf],
    queryFn: () => Services.fetchRegistrationByCPF(cpf),
    enabled: !!cpf,
  });
}

export function useFetchAllRegistrationsHook(refetch: boolean = false) {
  return useQuery({
    queryKey: [key],
    queryFn: Services.fetchAllRegistrations,
    enabled: true,
    refetchOnMount: refetch,
    refetchOnWindowFocus: false,
  });
}

export function useRegistrationsHook() {
  const queryClient = useQueryClient();

  const save = useMutation({
    mutationFn: Services.saveRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    },
  });

  const deleteUser = useMutation({
    mutationFn: Services.deleteRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    },
  })

  const reviewUser = useMutation({
    mutationFn: Services.reviewRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    },
  })

  return { save, deleteUser, reviewUser }
}
