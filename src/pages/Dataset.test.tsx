import React from "react";
import Dataset from "./Dataset";
import { mount } from "enzyme";
import { DictionariesProvider } from "../store/DictionariesContext";
import contextMock from "../helpers/__mocks__/context.mock";
jest.mock(
  "../helpers/__mocks__/dataset.json",
  () => require("../helpers/__mocks__/smallDataset.json"),
  {
    virtual: true
  }
);
describe("Dataset component", () => {
  it("should render snapshot with default values", () => {
    const wrapper = mount(
      <DictionariesProvider {...contextMock}>
        <Dataset />
      </DictionariesProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
