import dictionariesData from "./dictionaries.json";
export default {
  dictionaries: dictionariesData.dictionaries,
  activeDictionary: dictionariesData.activeDictionary,
  translations: dictionariesData.translations,
  activateDictionary: jest.fn(),
  editTranslation: jest.fn(),
  removeDictionary: jest.fn(),
  removeTranslation: jest.fn(),
  addDictionary: jest.fn(),
  addTranslation: jest.fn()
};
