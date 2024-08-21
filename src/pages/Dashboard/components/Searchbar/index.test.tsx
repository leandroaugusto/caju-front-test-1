import { customRender } from "~/test-utils";

import { SearchBar } from ".";

const mockRegister = vi.fn();

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: mockRegister,
  }),
}));

vi.mock(import("react-router-dom"), () => ({
  useHistory: () => ({ push: vi.fn() }),
}));

describe("SearchBar", () => {
  it("Should show SearchBar component", () => {
    const { container } = customRender(<SearchBar register={mockRegister} />);

    expect(mockRegister).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
