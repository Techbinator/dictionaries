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
    wrapper.find('input[name="domain"]').simulate("change", {
      target: { value: "Domain", name: "domain" }
    });
    wrapper.find('input[name="range"]').simulate("change", {
      target: { value: "Range", name: "range" }
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
    wrapper.find('input[name="domain"]').simulate("change", {
      target: { value: "Domain", name: "domain" }
    });
    wrapper.find('input[name="range"]').simulate("change", {
      target: { value: "Domain", name: "range" }
    });
    expect(
      wrapper
        .find(".error")
        .first()
        .text()
    ).toEqual("Domain must not equal range");
  });
});
