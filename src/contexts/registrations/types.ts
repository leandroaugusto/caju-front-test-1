import { ReactNode } from "react";

import { TRegistrationsData } from "~/types/registrations.types";

export type TRegistrationsContextValue = {
  registrationsState: TRegistrationsData[],
}

export interface IRegistrationsProviderProps {
  children: ReactNode;
}
