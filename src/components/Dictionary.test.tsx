import React from "react";
import Dictionary from "./Dictionary";
import { shallow } from "enzyme";
import contextMock from "../helpers/__mocks__/context.mock";

describe("Header component", () => {
  const wrapper = shallow(
    <Dictionary
      dictionary={
        contextMock.dictionaries["619ce930-4116-11e9-9306-ef359c18301d"]
      }
      addTranslation={contextMock.addTranslation}
      removeDictionary={contextMock.removeDictionary}
      removeTranslation={contextMock.removeTranslation}
      translations={contextMock.translations}
      editTranslation={contextMock.editTranslation}
    />
  );
  it("should render snapshot with default values", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should remove dictionary on click", () => {
    wrapper.find(".warning").simulate("click");
    expect(contextMock.removeDictionary).toBeCalledWith(
      "619ce930-4116-11e9-9306-ef359c18301d"
    );
  });
});
