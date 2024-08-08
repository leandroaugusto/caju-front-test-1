import { useQuery } from "@tanstack/react-query";

async function fetchRegistrations() {
  const response = await fetch("http://localhost:3000/registrations/");
  const data = await response.json();
  return data;
}

export function useRegistrationsHook() {
  return useQuery({
    queryKey: ["registrations"],
    queryFn: fetchRegistrations,
  });
}
