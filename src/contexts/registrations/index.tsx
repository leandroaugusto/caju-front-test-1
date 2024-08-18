import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { TRegistrationsData } from "~/types/registrations.types";
import { useFetchinitialRegistrationsHook } from "~/hooks/useRegistrations";

import {
  IRegistrationsProviderProps,
  TRegistrationsContextValue,
} from "./types";

export const RegistrationsContext = createContext<TRegistrationsContextValue>({
  registrationsState: [] as TRegistrationsData[],
});

export const RegistrationsContextProvider = ({
  children,
}: IRegistrationsProviderProps) => {
  const [registrationsState, setRegistrationsState] = useState<
    TRegistrationsData[]
  >([]);

  const { data } = useFetchinitialRegistrationsHook(1);

  const registrationsData: TRegistrationsData[] | undefined = data;

  const registrationsValue = useMemo(
    () => ({
      registrationsState,
    }),
    [registrationsState]
  );

  const setRegistrationsDataFetched = useCallback(() => {
    if (registrationsData) setRegistrationsState(registrationsData);
  }, [setRegistrationsState, registrationsData]);

  useEffect(() => setRegistrationsDataFetched(), [setRegistrationsDataFetched]);

  return (
    <RegistrationsContext.Provider value={registrationsValue}>
      {children}
    </RegistrationsContext.Provider>
  );
};
