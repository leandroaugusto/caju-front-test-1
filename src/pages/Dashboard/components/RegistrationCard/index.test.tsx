import { customRender, screen } from "~/test-utils";

import { RegistrationCard } from ".";
import {
  ERegistrationsStatus,
  TRegistrationsData,
} from "~/types/registrations.types";

const registrationsMock: TRegistrationsData = {
  admissionDate: "22/10/2023",
  email: "luiz@caju.com.br",
  employeeName: "Luiz Filho",
  status: ERegistrationsStatus.APPROVED,
  cpf: "56642105087",
  id: "3",
};

describe("RegistrationCard", () => {
  it("Should show RegistrationCard component", () => {
    const { container } = customRender(
      <RegistrationCard data={registrationsMock} />
    );

    const employeeNameContainer = screen.getByTestId("employee-name");
    const employeeEmailContainer = screen.getByTestId("employee-email");
    const employeeAdmissionDateContainer = screen.getByTestId(
      "employee-admission-date"
    );
    const reviewButton = screen.getByTestId("review-button");

    expect(employeeNameContainer).toHaveTextContent(
      registrationsMock.employeeName
    );
    expect(employeeEmailContainer).toHaveTextContent(registrationsMock.email);
    expect(employeeAdmissionDateContainer).toHaveTextContent(
      registrationsMock.admissionDate
    );
    expect(reviewButton).toHaveTextContent("Revisar novamente");

    expect(container).toMatchSnapshot();
  });

  it("Should show RegistrationCard with review status", () => {
    registrationsMock.status = ERegistrationsStatus.REVIEW;

    const { container } = customRender(
      <RegistrationCard data={registrationsMock} />
    );

    const approvedButton = screen.getByTestId("approved-button");
    const reproveButton = screen.getByTestId("reproved-button");

    expect(approvedButton).toHaveTextContent("Aprovar");
    expect(reproveButton).toHaveTextContent("Reprovar");

    expect(container).toMatchSnapshot();
  });
});
