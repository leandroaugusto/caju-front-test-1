import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { TRegistrationsData } from "~/types/registrations.types";
import { useRegistrationsHook } from "~/hooks/registrationsHook";

import {
  IRegistrationsContextProps,
  TRegistrationsContextValue,
} from "./types";

export const RegistrationsContext = createContext<TRegistrationsContextValue>({
  registrationsState: [] as TRegistrationsData[],
  isLoading: false,
  error: null,
});

export const RegistrationsContextProvider = ({
  children,
}: IRegistrationsContextProps) => {
  const { data, isLoading, error } = useRegistrationsHook();

  const registrationsData: TRegistrationsData[] | undefined = data;

  const [registrationsState, setRegistrationsState] = useState<
    TRegistrationsData[]
  >([]);

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
