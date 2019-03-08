export interface IDictionary {
  uuid: string;
  name: string;
  translationsUUID: string[];
}

export interface ITranslation {
  uuid: string;
  domain: string;
  range: string;
}

export interface IDictionaries {
  [uuid: string]: IDictionary;
}

export interface ITranslations {
  [uuid: string]: ITranslation;
}
export type TeditTranslation = (translation: ITranslation) => void;
export type TaddTranslation = (
  dictionaryUUID: string,
  translation: ITranslation
) => void;
export type TremoveTranslation = (
  dictionaryUUID: string,
  translationUUID: string
) => void;
export type TaddDictionary = (name: string) => void;
export type TremoveDictionary = (uuid: string) => void;
export type TactivateDictionary = (uuid: string) => void;
export interface IDictionaryProvider {
  dictionaries: IDictionaries;
  translations: ITranslations;
  addDictionary: TaddDictionary;
  activeDictionary: string;
  removeDictionary: TremoveDictionary;
  removeTranslation: TremoveTranslation;
  addTranslation: TaddTranslation;
  editTranslation: TeditTranslation;
  activateDictionary: TactivateDictionary;
}
