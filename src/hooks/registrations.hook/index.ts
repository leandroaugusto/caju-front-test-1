import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { TRegistrationsData } from "~/types/registrations.types";

async function fetchRegistrations() {
  const { data } = await axios.get("http://localhost:3000/registrations");
  return data;
}

async function saveRegistration(params: Partial<TRegistrationsData>) {
  const { data } = await axios.post("http://localhost:3000/registrations", params);
  return data;
}

async function deleteRegistration(id: string) {
  const { data } = await axios.delete(`http://localhost:3000/registrations/${id}`);
  return data;
}

async function reviewRegistration(params: Partial<TRegistrationsData>) {
  const { data } = await axios.patch(`http://localhost:3000/registrations/${params.id}`, params);
  return data;
}

export function useRegistrationsHook() {
  const queryClient = useQueryClient();

  const fetch = useQuery({
    queryKey: ["registrations"],
    queryFn: fetchRegistrations,
  });

  const save = useMutation({
    mutationFn: saveRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] })
    },
  });

  const deleteUser = useMutation({
    mutationFn: deleteRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] })
    },
  })

  const reviewUser = useMutation({
    mutationFn: reviewRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] })
    },
  })

  return { fetch, save, deleteUser, reviewUser }
}
