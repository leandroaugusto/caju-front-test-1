import { customRender, screen } from "~/test-utils";

import { Loading } from ".";

describe("Header", () => {
  it("Should render loading component", () => {
    const { container } = customRender(<Loading />);
    const loading = screen.getByTestId("loading-container");

    expect(loading).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
