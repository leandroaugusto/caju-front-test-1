import { faker } from "@faker-js/faker";

import { customRender, fireEvent } from "~/test-utils";
import {
  TRegistrationsData,
  ERegistrationsStatus,
} from "~/types/registrations.types";

import type { ISnackbarProps } from "~/components/Snackbar/types";
import type { IModalProps } from "~/components/Modal/types";
import type { IRegistrationCardProps } from "../../components/RegistrationCard/types";

import { Card } from ".";
import { promptMessages } from "./constants";

const reviewUserMutation = vi.fn();
const deleteUserMutation = vi.fn();
const deleteUser = {
  mutateAsync: deleteUserMutation,
};
const reviewUser = {
  mutateAsync: reviewUserMutation,
};

const registrationMock: TRegistrationsData = {
  admissionDate: "22/10/2023",
  email: "luiz@caju.com.br",
  employeeName: "Luiz Filho",
  status: ERegistrationsStatus.REVIEW,
  cpf: faker.string.numeric(11),
  id: faker.string.numeric(),
};

const mockedLocation = vi.hoisted(() =>
  vi.fn(() => ({ state: "Operação concluída com sucesso" }))
);

vi.mock("react-router-dom", () => ({
  useLocation: mockedLocation,
}));

vi.mock("~/hooks/useRegistrations", () => ({
  useRegistrationsHook: () => ({
    deleteUser,
    reviewUser,
  }),
}));

vi.mock("~/components/Snackbar", () => ({
  SnackBar: ({ message }: ISnackbarProps) => (
    <div data-testid="mock-snackbar">{message}</div>
  ),
}));

vi.mock("../../components/RegistrationCard", () => ({
  RegistrationCard: ({ onCardAction }: IRegistrationCardProps) => (
    <div data-testid="mock-registration-card">
      <button
        data-testid="mock-card-action-delete"
        onClick={() => onCardAction("delete")}
      >
        Delete
      </button>
      <button
        data-testid="mock-card-action-approve"
        onClick={() => onCardAction("approve")}
      >
        Approve
      </button>
      <button
        data-testid="mock-card-action-reprove"
        onClick={() => onCardAction("reprove")}
      >
        Reprove
      </button>
      <button
        data-testid="mock-card-action-review"
        onClick={() => onCardAction("review")}
      >
        Review
      </button>
    </div>
  ),
}));

vi.mock("~/components/Modal", () => ({
  Modal: ({ onConfirm, message }: IModalProps) => (
    <div data-testid="mock-modal">
      <span data-testid="mock-modal-message">{message}</span>
      <button data-testid="mock-modal-confirm" onClick={onConfirm}>
        onConfirm
      </button>
    </div>
  ),
}));

vi.mock("~/components/Loading", () => ({
  Loading: () => <div data-testid="mock-loading" />,
}));

describe("Card", () => {
  it("Should show Card container", () => {
    const { container } = customRender(<Card data={registrationMock} />);
    expect(container).toMatchSnapshot();
  });

  it("should display error message in snackbar when async operation fails", async () => {
    const errorMessage = "Error occurred";
    reviewUserMutation.mockRejectedValue(new Error(errorMessage));

    const { getByTestId, findByText } = customRender(
      <Card data={registrationMock} />
    );

    const approveButton = getByTestId("mock-card-action-approve");
    fireEvent.click(approveButton);

    const confirmButton = getByTestId("mock-modal-confirm");
    fireEvent.click(confirmButton);

    expect(await findByText(errorMessage)).toBeInTheDocument();
  });

  it("should display success message in snackbar when async operation succeeds", async () => {
    const modalMessage = `${promptMessages.approve} ${registrationMock.employeeName}?`;
    const { getByTestId } = customRender(<Card data={registrationMock} />);

    const approveButton = getByTestId("mock-card-action-approve");
    fireEvent.click(approveButton);

    const confirmButton = getByTestId("mock-modal-confirm");
    const modalMessageContainer = getByTestId("mock-modal-message");

    expect(modalMessageContainer).toHaveTextContent(modalMessage);

    fireEvent.click(confirmButton);

    expect(mockedLocation).toHaveBeenCalledTimes(3);
  });

  it("should reprove a registration", async () => {
    const { getByTestId } = customRender(<Card data={registrationMock} />);

    const reproveButton = getByTestId("mock-card-action-reprove");
    fireEvent.click(reproveButton);

    const confirmButton = getByTestId("mock-modal-confirm");
    fireEvent.click(confirmButton);

    expect(mockedLocation).toHaveBeenCalledTimes(3);
  });

  it("should review a registration", async () => {
    registrationMock.status = ERegistrationsStatus.APPROVED;
    const { getByTestId } = customRender(<Card data={registrationMock} />);

    const reviewButton = getByTestId("mock-card-action-review");
    fireEvent.click(reviewButton);

    const confirmButton = getByTestId("mock-modal-confirm");
    fireEvent.click(confirmButton);

    expect(mockedLocation).toHaveBeenCalledTimes(3);
  });

  it("should delete a registration", async () => {
    const { getByTestId } = customRender(<Card data={registrationMock} />);

    const deleteButton = getByTestId("mock-card-action-delete");
    fireEvent.click(deleteButton);

    const confirmButton = getByTestId("mock-modal-confirm");
    fireEvent.click(confirmButton);

    expect(mockedLocation).toHaveBeenCalledTimes(3);
  });
});
