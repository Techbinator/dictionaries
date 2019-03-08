import React from "react";
import App from "./App";
import { shallow } from "enzyme";

describe("App component", () => {
  it("should render snapshot with default values", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
