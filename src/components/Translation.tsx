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
  newDomain: string;
  newRange: string;
  domainError: string;
  rangeError: string;
  severity: string;
}
export default class Translation extends React.Component<
  IDictionaryDataProps,
  ITranslationState
> {
  state = {
    newDomain: this.props.translations[this.props.translationUUID].domain,
    newRange: this.props.translations[this.props.translationUUID].range,
    domainError: "",
    rangeError: "",
    severity: ""
  };
  editTranslationsHandler = () => {
    const {
      editTranslation,
      translations,
      translationsUUID,
      translationUUID
    } = this.props;
    const { newDomain, newRange } = this.state;
    const validation = validateTranslation(
      newDomain,
      newRange,
      translationsUUID,
      translations,
      translationUUID
    );

    if (validation.severity !== "error") {
      editTranslation({
        uuid: translationUUID,
        domain: newDomain,
        range: newRange
      });
    }
    this.setState({ ...validation });
  };
  public render() {
    const { removeTranslation, dictionaryUUID, translationUUID } = this.props;
    const {
      newDomain,
      newRange,
      domainError,
      rangeError,
      severity
    } = this.state;
    return (
      <tr>
        <td style={{ width: "40%" }} className="p-relative">
          {domainError && <span className={severity}>{domainError}</span>}
          <input
            type="text"
            name="domain"
            placeholder="Domain"
            value={newDomain}
            onFocus={e => this.setState({ domainError: "" })}
            onChange={e => this.setState({ newDomain: e.target.value })}
          />
        </td>
        <td style={{ width: "40%" }} className="p-relative">
          {rangeError && <span className={severity}>{rangeError}</span>}
          <input
            type="text"
            name="range"
            placeholder="Range"
            value={newRange}
            onFocus={e => this.setState({ rangeError: "" })}
            onChange={e => this.setState({ newRange: e.target.value })}
          />
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
