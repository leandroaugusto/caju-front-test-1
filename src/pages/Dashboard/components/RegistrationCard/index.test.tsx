import { render, screen } from "@testing-library/react";

import RegistrationCard from ".";
import { TRegistrationsData } from "~/types/registrations.types";

const registrationsMock: TRegistrationsData = {
  admissionDate: "22/10/2023",
  email: "luiz@caju.com.br",
  employeeName: "Luiz Filho",
  status: "APROVED",
  cpf: "56642105087",
  id: "3",
};

describe("RegistrationCard", () => {
  it("Should show RegistrationCard component", () => {
    const { container } = render(<RegistrationCard data={registrationsMock} />);
    expect(screen.getByRole("button", { name: /ativar/i }));
    expect(container).toMatchSnapshot();
  });
});
