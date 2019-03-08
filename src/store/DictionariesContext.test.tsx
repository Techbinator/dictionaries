import React from "react";
import { DictionariesProvider } from "./DictionariesContext";
import { shallow } from "enzyme";
import { IDictionaryProvider } from "./Dictionaries.type";

const dummyUUID = "11111-22222-33333-44444";
jest.mock("uuid", () => ({
  v1: jest.fn(() => "11111-22222-33333-44444")
}));

describe("Header component", () => {
  const wrapper: any = shallow(<DictionariesProvider />);
  let state: IDictionaryProvider;
  beforeEach(() => {
    state = wrapper.state();
  });
  it("should render snapshot with default values", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have correct default state", () => {
    expect(state.dictionaries).toEqual({});
    expect(state.translations).toEqual({});
    expect(state.activeDictionary).toEqual("");
  });

  it("should add dictionary", () => {
    state.addDictionary("test");
    const expected = {
      [dummyUUID]: {
        name: "test",
        translationsUUID: [],
        uuid: dummyUUID
      }
    };
    expect(wrapper.instance().state.dictionaries).toEqual(expected);
  });
  // it("should set item to localstorage", () => {

  //   const localstorageMock = jest.spyOn(
  //     window.localStorage.__proto__,
  //     "setItem"
  //   );
  //   expect(localstorageMock).toHaveBeenCalledWith(
  //     "translations",
  //     '{"11111-22222-33333-44444":{"uuid":"11111-22222-33333-44444","domain":"domainDummyEdited","range":"rangeDummyEdited"}}'
  //   );
  // });
  it("should activate dictionary", () => {
    state.activateDictionary(dummyUUID);
    expect(wrapper.instance().state.activeDictionary).toEqual(dummyUUID);
  });

  it("should add translation", () => {
    state.addTranslation(dummyUUID, {
      uuid: "",
      domain: "domainDummy",
      range: "rangeDummy"
    });
    const expected = {
      [dummyUUID]: {
        uuid: dummyUUID,
        domain: "domainDummy",
        range: "rangeDummy"
      }
    };
    expect(wrapper.instance().state.translations).toEqual(expected);
    expect(
      wrapper.instance().state.dictionaries[dummyUUID].translationsUUID
    ).toContain(dummyUUID);
  });

  it("should edit translation", () => {
    state.editTranslation({
      uuid: dummyUUID,
      domain: "domainDummyEdited",
      range: "rangeDummyEdited"
    });
    const expected = {
      [dummyUUID]: {
        uuid: dummyUUID,
        domain: "domainDummyEdited",
        range: "rangeDummyEdited"
      }
    };
    expect(wrapper.instance().state.translations).toEqual(expected);
  });

  it("should remove translation", () => {
    state.removeTranslation(dummyUUID, dummyUUID);
    const expected = {};
    expect(wrapper.instance().state.translations).toEqual(expected);
    expect(
      wrapper.instance().state.dictionaries[dummyUUID].translationsUUID
    ).toEqual([]);
  });

  it("should remove dictionary", () => {
    state.removeDictionary(dummyUUID);

    expect(wrapper.instance().state.dictionaries).toEqual({});
    expect(wrapper.instance().state.translations).toEqual({});
    expect(wrapper.instance().state.activeDictionary).toEqual("");
  });
});
