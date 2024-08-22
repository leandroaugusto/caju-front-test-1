import { FieldError } from "react-hook-form";

import { Form } from ".";

import { customRender } from "~/test-utils";

const mockOnSubmit = vi.fn();

const defaultProps = {
  onSubmit: mockOnSubmit,
  errors: {},
  register: vi.fn(),
  registerWithMask: vi.fn(),
};

describe("Form", () => {
  it("Should render Form", () => {
    const { container } = customRender(<Form {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("Should render Form with errors", () => {
    const errorMessage = "Required";
    const errors = {
      employeeName: { message: errorMessage } as FieldError,
      email: { message: errorMessage } as FieldError,
      cpf: { message: errorMessage } as FieldError,
      admissionDate: { message: errorMessage } as FieldError,
    };

    const { container } = customRender(
      <Form {...defaultProps} errors={errors} />
    );

    expect(container).toMatchSnapshot();
  });

  it("Should call onSubmit function", () => {
    const { getByText } = customRender(<Form {...defaultProps} />);
    const button = getByText("Cadastrar");

    button.click();

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
