import React from "react";
import {
  IDictionary,
  ITranslations,
  TaddDictionary,
  TremoveDictionary,
  TremoveTranslation,
  TeditTranslation
} from "../store/Dictionaries.type";
import NewTranslation from "./NewTranslation";
import Translation from "./Translation";

interface IDictionaryProps {
  dictionary: IDictionary;
  translations: ITranslations;
  addTranslation: TaddDictionary;
  removeDictionary: TremoveDictionary;
  removeTranslation: TremoveTranslation;
  editTranslation: TeditTranslation;
}

export default ({
  dictionary,
  addTranslation,
  removeDictionary,
  removeTranslation,
  translations,
  editTranslation
}: IDictionaryProps) => (
  <tr>
    <td className="align-middle" style={{ width: "10%" }}>
      {dictionary.name}
    </td>
    <td style={{ width: "80%" }} className="no-padding">
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Range</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <NewTranslation
            dictionaryUUID={dictionary.uuid}
            addTranslation={addTranslation}
            translations={translations}
            translationsUUID={dictionary.translationsUUID}
          />
          {dictionary.translationsUUID.map(uuid => (
            <Translation
              key={uuid}
              translationUUID={uuid}
              dictionaryUUID={dictionary.uuid}
              translations={translations}
              translationsUUID={dictionary.translationsUUID}
              removeTranslation={removeTranslation}
              editTranslation={editTranslation}
            />
          ))}
        </tbody>
      </table>
    </td>
    <td className="align-middle" style={{ width: "10%" }}>
      <button
        className="warning"
        onClick={() => removeDictionary(dictionary.uuid)}
      >
        Delete
      </button>
    </td>
  </tr>
);
