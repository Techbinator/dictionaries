import React from "react";

import Dictionary from "../components/Dictionary";
import NewDictionary from "../components/NewDictionary";
import { DictionariesContext } from "../store/DictionariesContext";

export default class Dictionaries extends React.Component {
  render() {
    const {
      dictionaries,
      translations,
      addDictionary,
      addTranslation,
      removeDictionary,
      removeTranslation,
      editTranslation
    } = this.context;
    return (
      <table className="one-edge-shadow">
        <thead>
          <tr>
            <th colSpan={2}>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <NewDictionary addDictionary={addDictionary} />
          {Object.keys(dictionaries).map((keyName: string) => (
            <Dictionary
              key={dictionaries[keyName].uuid}
              dictionary={dictionaries[keyName]}
              translations={translations}
              addTranslation={addTranslation}
              removeDictionary={removeDictionary}
              removeTranslation={removeTranslation}
              editTranslation={editTranslation}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
Dictionaries.contextType = DictionariesContext;
