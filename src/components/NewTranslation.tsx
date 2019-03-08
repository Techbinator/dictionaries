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
    const {
      addTranslation,
      dictionaryUUID,
      translationsUUID,
      translations
    } = this.props;

    const { domain, range } = this.state;

    const validation = validateTranslation(
      domain,
      range,
      translationsUUID,
      translations
    );

    if (validation.severity !== "error") {
      addTranslation(dictionaryUUID, {
        uuid: "",
        domain,
        range
      });

      this.setState({ ...INITIAL_STATE, ...validation });
    }
    this.setState({ ...validation });
  };
  render() {
    const { domain, range, domainError, rangeError, severity } = this.state;
    return (
      <tr>
        <td style={{ width: "40%" }} className="p-relative">
          {domainError && <span className={severity}>{domainError}</span>}
          <input
            value={domain}
            onChange={e => this.setState({ domain: e.target.value })}
            onFocus={e => this.setState({ domainError: "" })}
            type="text"
            placeholder="Domain"
          />
        </td>
        <td style={{ width: "40%" }} className="p-relative">
          {rangeError && <span className={severity}>{rangeError}</span>}
          <input
            value={range}
            onChange={e => this.setState({ range: e.target.value })}
            onFocus={e => this.setState({ rangeError: "" })}
            type="text"
            placeholder="Range"
          />
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
