import React from "react";
import { ITranslations } from "../store/Dictionaries.type";

interface ITransformedText {
  domains: string[];
  text: string;
  translations: ITranslations;
}
export default ({ domains, text, translations }: ITransformedText) => {
  if (!domains.includes(text.toString())) {
    return <td>{text}</td>;
  }
  const translationUUID = Object.keys(translations).find(
    key => translations[key].domain.toString() == text.toString()
  );
  if (!translationUUID) {
    return <td>{text}</td>;
  }
  const translation = translations[translationUUID];

  return (
    <td>
      <span style={{ color: "red" }}>{translation.domain}</span>/
      <span style={{ color: "green" }}>{translation.range}</span>
    </td>
  );
};
