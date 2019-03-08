import React from "react";
import RadioGroupToggle from "./RadioGroupToggle";
import { shallow } from "enzyme";
import contextMock from "../helpers/__mocks__/context.mock";

describe("RadioGroupToggle component", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(
      <RadioGroupToggle
        dictionaries={contextMock.dictionaries}
        activeDictionary={contextMock.activeDictionary}
        activateDictionary={contextMock.activateDictionary}
      />
    );
  });
  it("should render snapshot with default values", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should select the new radio value on label click", () => {
    const selectedUUID = "619ce930-4116-11e9-9306-ef359c18301d";
    wrapper.find(`label[htmlFor="${selectedUUID}"]`).simulate("click");
    expect(contextMock.activateDictionary).toBeCalledWith(selectedUUID);
    expect(wrapper.find(`#radio-${selectedUUID}`).props().checked).toBeTruthy();
    wrapper.find(`#radio-${selectedUUID}`).simulate("change");
  });

  it("should select the default no dictionary on click", () => {
    wrapper.find(`label[htmlFor="radio-0"]`).simulate("click");
    expect(contextMock.activateDictionary).toBeCalledWith("");
  });
});
