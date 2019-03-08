import React from "react";
import TransformedText from "./TransformedText";
import { shallow } from "enzyme";
import contextMock from "../helpers/__mocks__/context.mock";

describe("Header component", () => {
  it("should render snapshot with default text", () => {
    const wrapper = shallow(
      <TransformedText
        domains={["test"]}
        text="text"
        translations={contextMock.translations}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render snapshot with transformed text", () => {
    const wrapper = shallow(
      <TransformedText
        domains={["Turquoise"]}
        text="Turquoise"
        translations={contextMock.translations}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
