import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchRegistrations() {
  const { data } = await axios.get("http://localhost:3000/registrations");
  return data;
}

async function saveRegistration(params: any) {
  console.log("[OFF] Saving", params)
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
