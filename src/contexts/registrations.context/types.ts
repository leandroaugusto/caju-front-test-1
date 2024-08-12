import { ReactNode } from "react";

import { TRegistrationsData } from "~/types/registrations.types";

export type TRegistrationsContextValue = {
  registrationsState: TRegistrationsData[],
  refetch: () => void,
  isLoading: boolean,
  error: Error | null,
}

export interface IRegistrationsProviderProps {
  children: ReactNode;
}
