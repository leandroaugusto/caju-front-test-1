import { customRender, fireEvent, act, waitFor } from "~/test-utils";
import routes from "~/router/routes";

import { SearchBar } from ".";

const mockRegister = vi.fn();
const mockRefetch = vi.hoisted(() => vi.fn());
const mockUseHistory = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: mockRegister,
  }),
}));

vi.mock("react-router-dom", () => ({
  useHistory: () => mockUseHistory,
}));

vi.mock("~/hooks/useRegistrations", () => ({
  useFetchAllRegistrationsHook: () => ({
    refetch: mockRefetch,
  }),
}));

describe("SearchBar", () => {
  it("Should show SearchBar component", () => {
    const { container } = customRender(<SearchBar register={mockRegister} />);

    expect(mockRegister).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  it("Should show SearchBar component with refetch function", () => {
    const { getByTestId } = customRender(<SearchBar register={mockRegister} />);

    const refetchButton = getByTestId("refetch-button");
    fireEvent.click(refetchButton);

    expect(mockRefetch).toHaveBeenCalled();
  });

  it("Should call history hook when new admission button is clicked", () => {
    const { getByTestId } = customRender(<SearchBar register={mockRegister} />);

    const newAdmissionButton = getByTestId("new-admission-button");

    fireEvent.click(newAdmissionButton);

    expect(mockUseHistory.push).toHaveBeenCalledTimes(1);
    expect(mockUseHistory.push).toHaveBeenCalledWith(routes.newUser);
  });

  it("Should prevent onSubmit action by default", async () => {
    const { getByTestId } = customRender(<SearchBar register={mockRegister} />);
    const form = getByTestId("search-form");
    const mockPreventDefault = vi.fn();

    form.addEventListener("submit", mockPreventDefault);
    fireEvent.submit(form, { preventDefault: mockPreventDefault });

    expect(mockPreventDefault).toHaveBeenCalled();
  });
});
