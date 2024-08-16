import { vi } from "vitest";
import { UseFormRegister } from "react-hook-form";

import { customRender, screen } from "~/test-utils";
import { TextField } from ".";

describe("TextField", () => {
  const mockRegister: ReturnType<UseFormRegister<any>> = vi.fn();

  const testCases = [
    {
      id: "test1",
      label: "Test 1",
      type: "text",
      placeholder: "Enter text",
      error: "Error message",
      register: mockRegister,
    },
    {
      id: "test2",
      label: "Test 2",
      type: "password",
      placeholder: "Enter password",
      error: "",
      register: mockRegister,
    },
    {
      id: "test3",
      label: "",
      type: "email",
      placeholder: "Enter email",
      error: "Error message",
      register: mockRegister,
    },
    {
      id: "test4",
      label: "Test 4",
      type: "text",
      placeholder: "",
      error: "",
      register: mockRegister,
    },
  ];

  testCases.forEach((testCase) => {
    it(`renders TextField with id ${testCase.id}`, () => {
      customRender(<TextField {...testCase} />);

      const inputElement = screen.getByTestId(testCase.id);
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute("type", testCase.type);

      if (testCase.label) {
        const labelElement = screen.getByText(testCase.label);
        expect(labelElement).toBeInTheDocument();
      }

      if (testCase.error) {
        const errorElement = screen.getByText(testCase.error);
        expect(errorElement).toBeInTheDocument();
      }
    });
  });
});
