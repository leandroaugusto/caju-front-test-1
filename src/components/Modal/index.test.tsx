import { vi } from "vitest";

import { customRender, fireEvent, screen } from "~/test-utils";
import { Modal } from ".";

describe("Modal", () => {
  const mockOnClose = vi.fn();
  const mockConfirm = vi.fn();

  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    message: "Mock message",
    confirm: mockConfirm,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render correctly when open", () => {
    const { container } = customRender(<Modal {...defaultProps} />);

    const modal = screen.getByTestId("modal-container");
    const message = screen.getByText("Mock message");
    const modalBackdrop = screen.getByTestId("modal-backdrop");
    const modalContent = screen.getByTestId("modal-content");

    expect(modal).toBeInTheDocument();
    expect(message).toBeInTheDocument();

    expect(modalBackdrop).toHaveStyle(
      "opacity: 1; visibility: visible; pointer-events: all;"
    );
    expect(modalContent).toHaveStyle(
      "opacity: 1; visibility: visible; pointer-events: all;"
    );

    expect(container).toMatchSnapshot();
  });

  it("should does not render when not open", () => {
    const { queryByTestId } = customRender(
      <Modal {...defaultProps} open={false} />
    );

    const modal = queryByTestId("modal-container");
    const modalBackdrop = screen.getByTestId("modal-backdrop");
    const modalContent = screen.getByTestId("modal-content");

    expect(modalBackdrop).toHaveStyle(
      "opacity: 0; visibility: hidden; pointer-events: none;"
    );
    expect(modalContent).toHaveStyle(
      "opacity: 0; visibility: hidden; pointer-events: none;"
    );

    expect(modal).toHaveAttribute("aria-hidden", "true");
  });

  it("should call onClose when cancel button is clicked", () => {
    const { getByLabelText } = customRender(<Modal {...defaultProps} />);

    const closeButton = getByLabelText("cancel");

    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call confirm when confirm button is clicked", () => {
    const { getByLabelText } = customRender(<Modal {...defaultProps} />);

    const confirmButton = getByLabelText("confirm");

    fireEvent.click(confirmButton);
    expect(mockConfirm).toHaveBeenCalled();
  });
});
