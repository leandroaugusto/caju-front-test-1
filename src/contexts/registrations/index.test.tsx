import { vi } from "vitest";

import { customRender } from "~/test-utils";

import { RegistrationsContextProvider, RegistrationsContext } from ".";
// import { useFetchinitialRegistrationsHook } from "~/hooks/useRegistrations";

const mockData = [
  { id: 1, name: "Test Registration 1" },
  { id: 2, name: "Test Registration 2" },
];

const useFetchinitialRegistrationsHook = vi.fn();

vi.doMock(import("~/hooks/useRegistrations"), () => ({
  useFetchinitialRegistrationsHook,
}));

describe("RegistrationsContextProvider", () => {
  beforeEach(() => {
    useFetchinitialRegistrationsHook.mockReturnValue({
      data: mockData,
    });
  });

  it("should provide the correct context value", () => {
    let contextValue;

    customRender(
      <RegistrationsContextProvider>
        <RegistrationsContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </RegistrationsContext.Consumer>
      </RegistrationsContextProvider>
    );

    expect(contextValue).toEqual({
      registrationsState: mockData,
    });
  });

  it("should handle no data from the hook", () => {
    useFetchinitialRegistrationsHook.mockReturnValue({
      data: undefined,
    });

    let contextValue;
    customRender(
      <RegistrationsContextProvider>
        <RegistrationsContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </RegistrationsContext.Consumer>
      </RegistrationsContextProvider>
    );

    expect(contextValue).toEqual({
      registrationsState: [],
    });
  });
});
