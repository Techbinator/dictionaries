import React from "react";
import { IDictionary, ITranslations } from "../store/Dictionaries.type";
import TransformedText from "./TransformedText";
interface IDatasetBodyProps {
  data: {
    [uuid: string]: any;
  };
  dictionary: IDictionary;
  translations: ITranslations;
}

function getUniqueDomains(
  dictionary: IDictionary,
  translations: ITranslations
): string[] {
  if (!dictionary || !dictionary.translationsUUID) return [];

  return dictionary.translationsUUID.map(uuid => {
    return translations[uuid].domain;
  });
}

export default ({ data, dictionary, translations }: IDatasetBodyProps) => {
  const domains = getUniqueDomains(dictionary, translations);

  return (
    <tbody>
      {data.map((dataSet: any, index: number) => (
        <tr key={index}>
          {Object.keys(dataSet).map(key => (
            <TransformedText
              key={dataSet[key]}
              domains={domains}
              text={dataSet[key]}
              translations={translations}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
};
