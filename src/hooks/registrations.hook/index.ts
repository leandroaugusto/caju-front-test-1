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

export function useRegistrationsHook() {
  const queryClient = useQueryClient();

  const fetch = useQuery({
    queryKey: ["registrations"],
    queryFn: fetchRegistrations,
  });

  const mutation = useMutation({
    mutationFn: saveRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] })
    },
  })

  return { fetch, mutation }
}
