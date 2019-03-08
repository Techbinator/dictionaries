import React from "react";
import NewTranslation from "./NewTranslation";
import { shallow } from "enzyme";
import contextMock from "../helpers/__mocks__/context.mock";

describe("NewTranslation component", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(
      <NewTranslation
        addTranslation={contextMock.addTranslation}
        dictionaryUUID="619ce930-4116-11e9-9306-ef359c18301d"
        translations={contextMock.translations}
        translationsUUID={
          contextMock.dictionaries["619ce930-4116-11e9-9306-ef359c18301d"]
            .translationsUUID
        }
      />
    );
  });
  it("should render snapshot with default values", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should add translation", () => {
    wrapper.find('input[placeholder="Domain"]').simulate("change", {
      target: { value: "Domain" }
    });
    wrapper.find('input[placeholder="Range"]').simulate("change", {
      target: { value: "Range" }
    });
    wrapper.find('input[type="button"]').simulate("click");
    expect(contextMock.addTranslation).toBeCalledWith(
      "619ce930-4116-11e9-9306-ef359c18301d",
      {
        uuid: "",
        domain: "Domain",
        range: "Range"
      }
    );
  });

  it("should throw validation error", () => {
    const domainInput = wrapper.find('input[placeholder="Domain"]');
    const rangeInput = wrapper.find('input[placeholder="Range"]');
    domainInput.simulate("change", {
      target: { value: "Domain" }
    });
    rangeInput.simulate("change", {
      target: { value: "Domain" }
    });
    wrapper.find('input[type="button"]').simulate("click");
    expect(
      wrapper
        .find(".error")
        .first()
        .text()
    ).toEqual("Domain must not equal range");
    domainInput.simulate("focus");
    expect(wrapper.state().domainError).toEqual("");
    rangeInput.simulate("focus");
    expect(wrapper.state().rangeError).toEqual("");
  });
});
