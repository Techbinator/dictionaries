import React from "react";
import {
  IDictionaryProvider,
  IDictionaries,
  ITranslation,
  ITranslations
} from "./Dictionaries.type";
import { v1 } from "uuid";

export const DictionariesContext = React.createContext({});
export class DictionariesProvider extends React.Component {
  addDictionary = (name: string) => {
    const uuid = v1();
    const newDictionary = {
      uuid,
      name,
      translationsUUID: []
    };
    this.setState({
      dictionaries: { [uuid]: newDictionary, ...this.state.dictionaries }
    });
  };

  activateDictionary = (dictionaryUUID: string) => {
    this.setState({ activeDictionary: dictionaryUUID });
  };

  removeDictionary = (uuid: string) => {
    const { activeDictionary, dictionaries, translations } = this.state;
    const dictionary = dictionaries[uuid];
    const newDictionaries: IDictionaries = {
      ...dictionaries
    };
    const NewTranslations = {
      ...translations
    };
    dictionary.translationsUUID.forEach(uuid => delete NewTranslations[uuid]);

    delete newDictionaries[uuid];
    this.setState({
      dictionaries: newDictionaries,
      activeDictionary: activeDictionary === uuid ? "" : activeDictionary,
      translations: NewTranslations
    });
  };

  removeTranslation = (dictionaryUUID: string, translationUUID: string) => {
    const { dictionaries, translations } = this.state;
    const newTranslations: ITranslations = {
      ...translations
    };
    delete newTranslations[translationUUID];
    this.setState({
      translations: newTranslations,
      dictionaries: {
        ...dictionaries,
        [dictionaryUUID]: {
          ...dictionaries[dictionaryUUID],
          translationsUUID: dictionaries[
            dictionaryUUID
          ].translationsUUID.filter(tuuid => tuuid !== translationUUID)
        }
      }
    });
  };

  addTranslation = (dictionaryUUID: string, translation: ITranslation) => {
    const { dictionaries, translations } = this.state;
    const uuid = v1();
    const newTranslation = {
      ...translation,
      uuid
    };

    const dictionaryTranslations = dictionaries[dictionaryUUID];
    this.setState({
      translations: {
        [uuid]: newTranslation,
        ...translations
      },
      dictionaries: {
        ...dictionaries,
        [dictionaryUUID]: {
          ...dictionaryTranslations,
          translationsUUID: [uuid, ...dictionaryTranslations.translationsUUID]
        }
      }
    });
  };

  editTranslation = (translation: ITranslation) => {
    this.setState({
      translations: {
        ...this.state.translations,
        [translation.uuid]: translation
      }
    });
  };

  state: IDictionaryProvider = {
    dictionaries: {},
    translations: {},
    activeDictionary: "",
    addDictionary: this.addDictionary,
    removeDictionary: this.removeDictionary,
    removeTranslation: this.removeTranslation,
    addTranslation: this.addTranslation,
    editTranslation: this.editTranslation,
    activateDictionary: this.activateDictionary
  };

  //get from localstorage
  componentWillMount() {
    const dictionaries = localStorage.getItem("dictionaries");
    if (dictionaries) {
      this.setState({ dictionaries: JSON.parse(dictionaries) });
    }

    const translations = localStorage.getItem("translations");
    if (translations) {
      this.setState({ translations: JSON.parse(translations) });
    }
  }
  //save to localstorage
  componentDidUpdate({}, prevState: IDictionaryProvider) {
    const { dictionaries, translations } = this.state;
    if (
      JSON.stringify(dictionaries) !== JSON.stringify(prevState.dictionaries)
    ) {
      // save to localstorage
      localStorage.setItem("dictionaries", JSON.stringify(dictionaries));
    }
    if (
      JSON.stringify(translations) !== JSON.stringify(prevState.translations)
    ) {
      // save to localstorage
      localStorage.setItem("translations", JSON.stringify(translations));
    }
  }

  render() {
    return (
      <DictionariesContext.Provider value={this.state}>
        {this.props.children}
      </DictionariesContext.Provider>
    );
  }
}
