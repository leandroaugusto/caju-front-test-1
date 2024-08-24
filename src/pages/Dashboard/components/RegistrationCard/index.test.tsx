import { userEvent } from "@testing-library/user-event";

import { customRender } from "~/test-utils";

import { RegistrationCard } from ".";
import {
  ERegistrationsStatus,
  TRegistrationsData,
} from "~/types/registrations.types";

const registrationsMock: TRegistrationsData = {
  admissionDate: "22/10/2023",
  email: "luiz@caju.com.br",
  employeeName: "Luiz Filho",
  status: ERegistrationsStatus.REVIEW,
  cpf: "56642105087",
  id: "3",
};

const mockOnCardAction = vi.fn();

const actionButtons = ["review", "reprove", "approve"];

describe("RegistrationCard", () => {
  it("Should render RegistrationCard component", async () => {
    const { container, getByTestId } = customRender(
      <RegistrationCard
        data={registrationsMock}
        onCardAction={mockOnCardAction}
      />
    );

    const employeeNameContainer = getByTestId("employee-name");
    const employeeEmailContainer = getByTestId("employee-email");
    const employeeAdmissionDateContainer = getByTestId(
      "employee-admission-date"
    );

    const deleteButton = getByTestId("delete-button");

    expect(employeeNameContainer).toHaveTextContent(
      registrationsMock.employeeName
    );
    expect(employeeEmailContainer).toHaveTextContent(registrationsMock.email);
    expect(employeeAdmissionDateContainer).toHaveTextContent(
      registrationsMock.admissionDate
    );

    await userEvent.click(deleteButton);

    expect(deleteButton).toBeInTheDocument();
    expect(mockOnCardAction).toHaveBeenCalledOnce();
    expect(container).toMatchSnapshot();
  });

  it.each(actionButtons)(
    "Should call onCardAction when %s button is clicked",
    (testCase) => {
      if (testCase === "review") {
        registrationsMock.status = ERegistrationsStatus.APPROVED;
      } else {
        registrationsMock.status = ERegistrationsStatus.REVIEW;
      }

      const { getByTestId } = customRender(
        <RegistrationCard
          data={registrationsMock}
          onCardAction={mockOnCardAction}
        />
      );

      const button = getByTestId(`${testCase}-button`);
      const clickCount = 0;

      if (testCase === "review") {
        expect(button).toHaveTextContent("Revisar novamente");
      }
      if (testCase === "approve") expect(button).toHaveTextContent("Aprovar");
      if (testCase === "reprove") {
        expect(button).toHaveTextContent("Reprovar");
      }

      button.click();

      expect(mockOnCardAction).toHaveBeenCalledTimes(clickCount + 1);
    }
  );
});
