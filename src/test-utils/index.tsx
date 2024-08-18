import { ReactElement } from "react";
import { ThemeProvider } from "styled-components";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RegistrationsContextProvider } from "~/contexts/registrations";
import { ITestUtils } from "./types";

import theme from "~/theme";
import type * as React from "react";

export const queryClient = new QueryClient();

export const QueryProvider = ({ children }: ITestUtils) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const AllTheProviders: React.FC = ({ children }: ITestUtils) => {
  return (
    <QueryProvider>
      <RegistrationsContextProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </RegistrationsContextProvider>
    </QueryProvider>
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
