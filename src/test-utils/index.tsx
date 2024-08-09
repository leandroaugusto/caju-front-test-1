import { ReactElement } from "react";
import { ThemeProvider } from "styled-components";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RegistrationsContextProvider } from "~/contexts/registrations.context";
import { ITestUtils } from "./types";

import theme from "~/theme";

const queryClient = new QueryClient();

const AllTheProviders: React.FC = ({ children }: ITestUtils) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RegistrationsContextProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </RegistrationsContextProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

export * from "@testing-library/react";

export { customRender };
