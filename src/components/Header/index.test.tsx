import { customRender, screen } from "~/test-utils";

import { Header } from ".";

describe("Header", () => {
  it("Should render header component", () => {
    const { container } = customRender(
      <Header data-testid="header">
        <h1 data-testid="heading-title">Caju Front Teste</h1>
      </Header>
    );
    const headingTitle = screen.getByTestId("heading-title");

    expect(headingTitle).toHaveTextContent("Caju Front Teste");
    expect(container).toMatchSnapshot();
  });
});
