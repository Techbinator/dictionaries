import React from "react";
import Translation from "./Translation";
import { shallow } from "enzyme";
import contextMock from "../helpers/__mocks__/context.mock";

describe("Translation component", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(
      <Translation
        translationUUID="58f6b540-4116-11e9-9306-ef359c18301d"
        dictionaryUUID="619ce930-4116-11e9-9306-ef359c18301d"
        translations={contextMock.translations}
        translationsUUID={
          contextMock.dictionaries["619ce930-4116-11e9-9306-ef359c18301d"]
            .translationsUUID
        }
        removeTranslation={contextMock.removeTranslation}
        editTranslation={contextMock.editTranslation}
      />
    );
  });
  it("should render snapshot with default values", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should remove translation", () => {
    wrapper.find(".warning").simulate("click");
    expect(contextMock.removeTranslation).toBeCalledWith(
      "619ce930-4116-11e9-9306-ef359c18301d",
      "58f6b540-4116-11e9-9306-ef359c18301d"
    );
  });

  it("should edit translation", () => {
    wrapper.find('input[name="domain"]').simulate("change", {
      target: { value: "Domain" }
    });
    wrapper.find('input[name="range"]').simulate("change", {
      target: { value: "Range" }
    });
    wrapper.find(".info").simulate("click");
    expect(contextMock.editTranslation).toBeCalledWith({
      uuid: "58f6b540-4116-11e9-9306-ef359c18301d",
      domain: "Domain",
      range: "Range"
    });
  });

  it("should throw validation error", () => {
    const domainInput = wrapper.find('input[name="domain"]');
    const rangeInput = wrapper.find('input[name="range"]');
    domainInput.simulate("change", {
      target: { value: "Domain" }
    });
    wrapper.find('input[name="range"]').simulate("change", {
      target: { value: "Domain" }
    });
    wrapper.find(".info").simulate("click");
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
