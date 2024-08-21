import { customRender } from "~/test-utils";

import { EmptyCard } from ".";

describe("Columns", () => {
  it("Should render Columns component with correct data", () => {
    const { container } = customRender(<EmptyCard />);

    expect(container).toMatchSnapshot();
  });
});
