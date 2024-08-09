import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { TRegistrationsData } from "~/types/registrations.types";
import { useRegistrationsHook } from "~/hooks/registrations.hook";

import {
  IRegistrationsProviderProps,
  TRegistrationsContextValue,
} from "./types";

export const RegistrationsContext = createContext<TRegistrationsContextValue>({
  registrationsState: [] as TRegistrationsData[],
  isLoading: false,
  error: null,
});

export const RegistrationsContextProvider = ({
  children,
}: IRegistrationsProviderProps) => {
  const [registrationsState, setRegistrationsState] = useState<
    TRegistrationsData[]
  >([]);

  const { data, isLoading, error } = useRegistrationsHook().fetch;

  const registrationsData: TRegistrationsData[] | undefined = data;

  const registrationsValue = useMemo(
    () => ({ registrationsState, isLoading, error }),
    [registrationsState, isLoading, error]
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
