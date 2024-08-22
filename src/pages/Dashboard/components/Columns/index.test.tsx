import { customRender, screen } from "~/test-utils";

import { Columns } from ".";
import {
  TRegistrationsData,
  ERegistrationsStatus,
} from "~/types/registrations.types";

const registrationsMock: TRegistrationsData[] = [
  {
    admissionDate: "22/10/2023",
    email: "luiz@caju.com.br",
    employeeName: "Luiz Filho",
    status: ERegistrationsStatus.APPROVED,
    cpf: "56642105087",
    id: "3",
  },
  {
    admissionDate: "22/10/2022",
    email: "luiz@caju.com.br",
    employeeName: "Luiz Filho Jr",
    status: ERegistrationsStatus.REVIEW,
    cpf: "56642105088",
    id: "2",
  },
];

vi.mock("../../containers/Card", () => ({
  Card: ({ data }: { data: TRegistrationsData }) => (
    <div data-testid="mock-card-container">{data.status}</div>
  ),
}));

vi.mock("../../components/EmptyCard", () => ({
  EmptyCard: () => <div>EmptyCard</div>,
}));

describe("Columns", () => {
  it("Should render Columns component with correct data", () => {
    const { container } = customRender(
      <Columns registrations={registrationsMock} />
    );

    const columnsTitle = screen.getAllByTestId("column-title");
    const columnsContent = screen.getAllByTestId("column-content");
    const cardContainer = screen.getAllByTestId("mock-card-container");

    expect(columnsTitle).toHaveLength(3);
    expect(columnsContent).toHaveLength(3);
    expect(cardContainer).toHaveLength(2);

    expect(columnsContent[0]).toContainElement(cardContainer[0]);
    expect(columnsContent[1]).toContainElement(cardContainer[1]);
    expect(columnsContent[2]).toBeEmptyDOMElement();

    expect(container).toMatchSnapshot();
  });

  it("Should render Columns component with empty data", () => {
    const { container } = customRender(<Columns registrations={[]} />);

    const emptyCard = screen.getByText("EmptyCard");

    expect(emptyCard).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
