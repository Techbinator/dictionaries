import * as React from "react";
import {
  ITranslations,
  TremoveTranslation,
  TeditTranslation
} from "../store/Dictionaries.type";
import { validateTranslation } from "../helpers/validation";

export interface IDictionaryDataProps {
  dictionaryUUID: string;
  translationsUUID: string[];
  translationUUID: string;
  translations: ITranslations;
  removeTranslation: TremoveTranslation;
  editTranslation: TeditTranslation;
}
interface ITranslationState {
  domain: string;
  range: string;
  domainError: string;
  rangeError: string;
  severity: string;
}
export default class Translation extends React.Component<
  IDictionaryDataProps,
  ITranslationState
> {
  state = {
    domain: this.props.translations[this.props.translationUUID].domain,
    range: this.props.translations[this.props.translationUUID].range,
    domainError: "",
    rangeError: "",
    severity: ""
  };

  static getDerivedStateFromProps(
    props: IDictionaryDataProps,
    state: ITranslationState
  ) {
    const { translationsUUID, translations, translationUUID } = props;
    const { domain, range } = state;
    const validation = validateTranslation(
      domain,
      range,
      translationsUUID,
      translations,
      translationUUID
    );
    return validation;
  }

  editTranslationsHandler = () => {
    const { editTranslation, translationUUID } = this.props;
    const { domain, range } = this.state;

    editTranslation({
      uuid: translationUUID,
      domain: domain,
      range: range
    });
  };
  public render() {
    const { removeTranslation, dictionaryUUID, translationUUID } = this.props;
    const { domain, range, domainError, rangeError, severity } = this.state;
    return (
      <tr>
        <td style={{ width: "40%" }}>
          <input
            type="text"
            name="domain"
            placeholder="Domain"
            value={domain}
            onChange={e => this.setState({ domain: e.target.value })}
          />
          {domainError && <span className={severity}>{domainError}</span>}
        </td>
        <td style={{ width: "40%" }}>
          <input
            type="text"
            name="range"
            placeholder="Range"
            value={range}
            onChange={e => this.setState({ range: e.target.value })}
          />
          {rangeError && <span className={severity}>{rangeError}</span>}
        </td>
        <td style={{ width: "20%" }}>
          <button className="info" onClick={this.editTranslationsHandler}>
            Edit
          </button>
          <button
            className="warning"
            onClick={() => removeTranslation(dictionaryUUID, translationUUID)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
