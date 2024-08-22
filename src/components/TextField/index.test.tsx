import { userEvent } from "@testing-library/user-event";
import { customRender, screen } from "~/test-utils";

import { TextField } from ".";

const testCases = [
  {
    id: "name",
    label: "Test 1",
    type: "text",
    placeholder: "Enter text",
    error: "Error message",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    error: "Error message",
  },
  {
    id: "cpf",
    type: "tel",
    error: "",
  },
];

describe("TextField", () => {
  it.each(testCases)("renders TextField with props: %s", async (input) => {
    customRender(<TextField {...input} />);

    const inputElement = screen.getByRole("textbox", { name: input.label });

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", input.type);

    if (input.label) {
      const labelElement = screen.getByText(input.label);
      const labelColor = getComputedStyle(labelElement).color;

      expect(labelElement).toHaveStyle(`color: ${labelColor}`);
      expect(labelElement).toBeInTheDocument();
    }

    if (input.error) {
      const errorElement = screen.getByText(input.error);

      expect(inputElement).toHaveStyle("border-color: #ff0000");
      expect(errorElement).toBeInTheDocument();
    } else {
      expect(inputElement).toHaveStyle("border-color: #241c154d");
    }

    await userEvent.type(inputElement, "test");

    expect(inputElement).toHaveValue("test");
  });
});
