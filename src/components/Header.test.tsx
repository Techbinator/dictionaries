import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";

describe("Header component", () => {
  it("should render snapshot with default values", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
