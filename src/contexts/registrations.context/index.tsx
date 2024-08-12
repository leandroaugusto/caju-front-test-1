import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { TRegistrationsData } from "~/types/registrations.types";
import { useFetchAllRegistrationsHook } from "~/hooks/registrations.hook";

import {
  IRegistrationsProviderProps,
  TRegistrationsContextValue,
} from "./types";

export const RegistrationsContext = createContext<TRegistrationsContextValue>({
  registrationsState: [] as TRegistrationsData[],
  refetch: () => {},
  isLoading: false,
  error: null,
});

export const RegistrationsContextProvider = ({
  children,
}: IRegistrationsProviderProps) => {
  const [registrationsState, setRegistrationsState] = useState<
    TRegistrationsData[]
  >([]);

  const { data, isLoading, error, refetch } = useFetchAllRegistrationsHook();
  console.log("[OFF] Context", { data });

  const registrationsData: TRegistrationsData[] | undefined = data;

  const registrationsValue = useMemo(
    () => ({
      error,
      registrationsState,
      isLoading,
      refetch,
    }),
    [registrationsState, isLoading, error, refetch]
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
