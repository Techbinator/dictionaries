import React from "react";
import Dictionaries from "./Dictionaries";
import { mount } from "enzyme";
import { DictionariesProvider } from "../store/DictionariesContext";
import contextMock from "../helpers/__mocks__/context.mock";

describe("Dictionaries component", () => {
  it("should render snapshot with default values", () => {
    const wrapper = mount(
      <DictionariesProvider {...contextMock}>
        <Dictionaries />
      </DictionariesProvider>,
      { context: contextMock }
    );
    expect(wrapper).toMatchSnapshot();
  });
});
