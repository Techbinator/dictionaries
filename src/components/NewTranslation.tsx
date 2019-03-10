import React from "react";
import { TaddTranslation, ITranslations } from "../store/Dictionaries.type";
import { validateTranslation } from "../helpers/validation";
interface INewTranslation {
  addTranslation: TaddTranslation;
  dictionaryUUID: string;
  translations: ITranslations;
  translationsUUID: string[];
}

const INITIAL_STATE = {
  domain: "",
  range: "",
  domainError: "",
  rangeError: "",
  severity: ""
};
export default class NewTranslation extends React.Component<INewTranslation> {
  state = INITIAL_STATE;
  onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    const { addTranslation, dictionaryUUID } = this.props;

    const { domain, range } = this.state;

    addTranslation(dictionaryUUID, {
      uuid: "",
      domain,
      range
    });

    this.setState({ ...INITIAL_STATE });
  };
  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { translationsUUID, translations } = this.props;

    const inputName = e.target.name as "range" | "domain";

    const { domain, range } = this.state;
    const validation = validateTranslation(
      inputName == "domain" ? e.target.value : domain,
      inputName == "range" ? e.target.value : range,
      translationsUUID,
      translations
    );
    this.setState({ ...validation, [inputName]: e.target.value });
  };
  render() {
    const { domain, range, domainError, rangeError, severity } = this.state;
    return (
      <tr>
        <td style={{ width: "40%" }}>
          <input
            value={domain}
            name="domain"
            onChange={this.onInputChange}
            type="text"
            placeholder="Domain"
          />
          {domainError && <span className={severity}>{domainError}</span>}
        </td>
        <td style={{ width: "40%" }}>
          <input
            value={range}
            onChange={this.onInputChange}
            name="range"
            type="text"
            placeholder="Range"
          />
          {rangeError && <span className={severity}>{rangeError}</span>}
        </td>
        <td style={{ width: "20%" }}>
          <input
            type="button"
            onClick={this.onSubmit}
            value="Add translation"
          />
        </td>
      </tr>
    );
  }
}
