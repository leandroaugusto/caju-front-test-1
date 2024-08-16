import { faker } from "@faker-js/faker";

import Button, { ButtonSmall } from ".";
import { IconButton } from "./IconButton";
import { customRender, screen } from "~/test-utils";

import theme from "~/theme";

const MockSvgIcon = () => (
  <img data-testid="icon" src={faker.image.avatar()} alt="icon" />
);

describe("Button", () => {
  it("Should render button", () => {
    const { container } = customRender(<Button>Ativar</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Ativar");
    expect(button).toHaveStyle("background-color: #64a98c");
    expect(container).toMatchSnapshot();
  });

  it("Should render button with another child text", () => {
    customRender(<Button data-testid="button">Aprovar</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Aprovar");
  });

  it("Should render small button without theme", () => {
    const { container } = customRender(
      <ButtonSmall data-testid="button">Aprovar</ButtonSmall>
    );
    const button = screen.getByTestId("button");
    expect(button).toHaveTextContent("Aprovar");
    expect(button).toHaveStyle(`background-color: ${theme.colors.primary}`);
    expect(container).toMatchSnapshot();
  });

  it("Should render small button with specific theme", () => {
    customRender(
      <ButtonSmall data-testid="button" $buttonTheme="approved">
        Aprovar
      </ButtonSmall>
    );

    const button = screen.getByTestId("button");
    expect(button).toHaveTextContent("Aprovar");
    expect(button).toHaveStyle(
      `background-color: ${theme.colors.buttons.approved}`
    );
  });

  it("Should render icon button", () => {
    customRender(
      <IconButton data-testid="button">
        <MockSvgIcon />
      </IconButton>
    );
    const icon = screen.getByTestId("icon");

    expect(icon).toBeInTheDocument();
  });
});
