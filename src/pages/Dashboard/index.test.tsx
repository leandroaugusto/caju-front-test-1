import { renderHook } from "@testing-library/react-hooks";
import { faker } from "@faker-js/faker";
import { DefaultError } from "@tanstack/react-query";

import {
  customRender,
  waitFor,
  QueryProvider as wrapper,
  queryClient,
} from "~/test-utils";

import {
  ERegistrationsStatus,
  TRegistrationsData,
} from "~/types/registrations.types";
import {
  useFetchAllRegistrationsHook,
  useFetchRegistrationsByCpfHook,
} from "~/hooks/useRegistrations";

import DashboardPage from ".";

const fakerCpf = faker.string.numeric(11);
const mockRegistrations: TRegistrationsData[] = [
  {
    admissionDate: "22/10/2023",
    email: "luiz@caju.com.br",
    employeeName: "Luiz Filho",
    status: ERegistrationsStatus.APPROVED,
    cpf: fakerCpf,
    id: "1",
  },
  {
    admissionDate: "22/10/2023",
    email: "luiz@caju.com",
    employeeName: "Luiz Neto",
    status: ERegistrationsStatus.REVIEW,
    cpf: faker.string.numeric(11),
    id: "2",
  },
];

const useQueryClient = vi.fn();
const mockUseFetchAllRegistrations = vi.hoisted(() =>
  vi.fn().mockReturnValue({
    isLoading: true,
    isSuccess: false,
    error: null as unknown as DefaultError,
    data: [] as TRegistrationsData[],
  })
);

const mockWatch = vi.fn();
const mockRegister = vi.fn();
const mockHandleSubmit = vi.fn();

const mockUseForm = vi.hoisted(() => vi.fn());
const mockYupResolver = vi.hoisted(() => vi.fn());
const mockYup = vi.hoisted(() => ({
  object: vi.fn(),
  string: vi.fn(),
  required: vi.fn(),
}));

vi.mock("react-hook-form", () => ({
  useForm: mockUseForm,
}));

vi.mock("@hookform/resolvers/yup", () => ({
  yupResolver: mockYupResolver,
}));

vi.mock("yup", () => mockYup);

vi.mock("react-router-dom", () => ({
  useHistory: () => ({ push: vi.fn() }),
  useLocation: () => ({ search: "" }),
}));

vi.mock("~/hooks/useRegistrations", () => ({
  useFetchAllRegistrationsHook: mockUseFetchAllRegistrations,
  useFetchRegistrationsByCpfHook: mockUseFetchAllRegistrations,
}));

vi.mock("./components/Searchbar", () => ({
  SearchBar: () => <div data-testid="mock-search-bar-container">SearchBar</div>,
}));

vi.mock("./components/Columns", () => ({
  Columns: ({ registrations }: { registrations: TRegistrationsData[] }) => (
    <div data-testid="mock-columns-container">
      {registrations?.map((i) => (
        <div key={i.id}>{i.id}</div>
      ))}
    </div>
  ),
}));

describe("DashboardPage", () => {
  beforeEach(() => {
    useQueryClient.mockImplementation(() => queryClient);
    mockUseForm.mockReturnValue({
      watch: mockWatch,
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
    });
  });

  it("Should show DashboardPage page", async () => {
    mockUseFetchAllRegistrations.mockImplementation(() => ({
      isLoading: false,
      isSuccess: true,
      error: null,
      data: mockRegistrations,
    }));

    const { result } = renderHook(() => useFetchAllRegistrationsHook(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const { container, getByTestId } = customRender(<DashboardPage />);

    const mockSearchBarContainer = getByTestId("mock-search-bar-container");
    const mockColumnsContainer = getByTestId("mock-columns-container");

    expect(mockSearchBarContainer).toBeInTheDocument();
    expect(mockColumnsContainer).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("Should render loading state when data is not available", async () => {
    mockUseFetchAllRegistrations.mockImplementation(() => ({
      isLoading: true,
    }));

    const { result } = renderHook(() => useFetchAllRegistrationsHook(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isLoading).toBe(true));

    const { getByTestId } = customRender(<DashboardPage />);

    const mockLoadingContainer = getByTestId("loading-container");

    expect(mockLoadingContainer).toBeInTheDocument();
  });

  it("Should render error message when error is available", async () => {
    mockUseFetchAllRegistrations.mockImplementation(() => ({
      error: { message: "Error message" },
    }));

    const { result } = renderHook(() => useFetchAllRegistrationsHook(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.error).not.toBeNull());

    const { findByTestId } = customRender(<DashboardPage />);

    const mockErrorContainer = await findByTestId("error-container");

    expect(mockErrorContainer).toBeInTheDocument();
    expect(mockErrorContainer).toHaveTextContent("Error message");
  });

  it("should call useForm with yupResolver", () => {
    const schema = mockYup.object.mockReturnValue({
      name: mockYup.string(),
    });

    mockUseForm.mockReturnValue({
      resolver: mockYupResolver(schema),
    });

    expect(mockUseForm).toHaveBeenCalledWith({
      resolver: mockYupResolver(schema),
    });
  });
});
