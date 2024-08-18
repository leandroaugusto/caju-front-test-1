import { renderHook } from "@testing-library/react-hooks";

import { customRender, screen, waitFor } from "~/test-utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  ERegistrationsStatus,
  TRegistrationsData,
} from "~/types/registrations.types";
import { useRegistrationsHook } from "~/hooks/useRegistrations";

import DashboardPage from ".";

const mockRegistrations: TRegistrationsData[] = [
  {
    admissionDate: "22/10/2023",
    email: "luiz@caju.com.br",
    employeeName: "Luiz Filho",
    status: ERegistrationsStatus.APPROVED,
    cpf: "56642105087",
    id: "3",
  },
  {
    admissionDate: "22/10/2023",
    email: "luiz@caju.com",
    employeeName: "Luiz Neto",
    status: ERegistrationsStatus.REVIEW,
    cpf: "56642105088",
    id: "2",
  },
];

const mockUseQuery = jest.fn(() => ({
  isLoading: true,
  isSuccess: false,
  error: null,
  data: null,
})) as jest.Mock;

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: () => mockUseQuery(),
}));

jest.mock("./components/Searchbar", () => ({
  SearchBar: () => <div data-testid="mock-search-bar-container">SearchBar</div>,
}));

jest.mock("./components/Columns", () => ({
  Columns: ({ registrations }: { registrations: TRegistrationsData[] }) => (
    <div data-testid="mock-columns-container">
      {registrations.map((i) => (
        <div key={i.id}>{i.id}</div>
      ))}
    </div>
  ),
}));

describe("DashboardPage", () => {
  it("Should show DashboardPage page", async () => {
    mockUseQuery.mockImplementation(() => ({
      isLoading: false,
      isSuccess: true,
      error: null,
      data: mockRegistrations,
    }));

    const { result } = renderHook(() => useRegistrationsHook(), { wrapper });
    await waitFor(() => expect(result.current.fetch.isSuccess).toBe(true));

    const { container } = customRender(<DashboardPage />);

    const mockSearchBarContainer = screen.getByTestId(
      "mock-search-bar-container"
    );
    const mockColumnsContainer = screen.getByTestId("mock-columns-container");

    expect(mockSearchBarContainer).toBeInTheDocument();
    expect(mockColumnsContainer).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("Should render loading state when data is not available", async () => {
    mockUseQuery.mockImplementation(() => ({
      ...mockUseQuery,
      isLoading: true,
    }));

    const { result } = renderHook(() => useRegistrationsHook(), { wrapper });
    await waitFor(() => expect(result.current.fetch.isLoading).toBe(true));

    customRender(<DashboardPage />);

    const mockLoadingContainer = screen.getByTestId("loading-container");

    expect(mockLoadingContainer).toBeInTheDocument();
  });

  it("Should render error message when error is available", async () => {
    mockUseQuery.mockImplementation(() => ({
      ...mockUseQuery,
      error: {
        message: "Error message",
      },
    }));

    const { result } = renderHook(() => useRegistrationsHook(), { wrapper });
    await waitFor(() => expect(result.current.fetch.error).not.toBeNull());

    customRender(<DashboardPage />);

    const mockErrorContainer = screen.getByTestId("error-container");

    expect(mockErrorContainer).toBeInTheDocument();
    expect(mockErrorContainer).toHaveTextContent("Error message");
  });
});
