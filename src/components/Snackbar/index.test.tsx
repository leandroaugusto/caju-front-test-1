import { customRender, fireEvent } from "~/test-utils";
import { SnackBar } from ".";

vi.useFakeTimers();

describe("SnackBar", () => {
  const onCloseMock = vi.fn();

  const testCases = [
    { open: true, message: "Test message 1", autoHideDuration: 5000 },
    { open: false, message: "Test message 2", autoHideDuration: 3000 },
  ];

  it.each(testCases)("should render correctly with props: %s", (testCase) => {
    const { getByRole, queryByRole } = customRender(
      <SnackBar
        open={testCase.open}
        message={testCase.message}
        onClose={onCloseMock}
        autoHideDuration={testCase.autoHideDuration}
      />
    );

    if (testCase.open) {
      const snackbar = getByRole("alert");

      expect(snackbar).toBeInTheDocument();
      expect(snackbar).toHaveTextContent(testCase.message);

      vi.advanceTimersByTime(testCase.autoHideDuration);

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    } else {
      expect(queryByRole("alert")).toBeNull();
    }
  });

  it("should close when OK button is clicked", () => {
    const { getByTestId } = customRender(
      <SnackBar
        open={true}
        message={testCases[0].message}
        onClose={onCloseMock}
        autoHideDuration={testCases[0].autoHideDuration}
      />
    );

    const button = getByTestId("small-button");

    fireEvent.click(button);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
