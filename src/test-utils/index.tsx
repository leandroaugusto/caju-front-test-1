import { ReactElement } from "react";
import { ThemeProvider } from "styled-components";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

import { ITestUtils } from "./types";

import theme from "~/theme";

const AllTheProviders: React.FC = ({ children }: ITestUtils) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
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
