import React from "react";
import NewDictionary from "./NewDictionary";
import { shallow } from "enzyme";
import contextMock from "../helpers/__mocks__/context.mock";

describe("NewDictionary component", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(
      <NewDictionary addDictionary={contextMock.addDictionary} />
    );
  });
  it("should render snapshot with default values", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should add dictionary", () => {
    wrapper.find('input[placeholder="Name"]').simulate("change", {
      target: { value: "Name" }
    });
    expect(wrapper.instance().state).toEqual({ error: "", name: "Name" });
    wrapper.find('input[type="button"]').simulate("click");
    expect(contextMock.addDictionary).toBeCalledWith("Name");
  });

  it("should throw validation error", () => {
    wrapper.find('input[placeholder="Name"]').simulate("change", {
      target: { value: "" }
    });
    wrapper.find('input[type="button"]').simulate("click");
    expect(wrapper.instance().state).toEqual({
      error: "Please add a dictionary name",
      name: ""
    });

    expect(wrapper.find(".error").text()).toEqual(
      "Please add a dictionary name"
    );
  });
});
