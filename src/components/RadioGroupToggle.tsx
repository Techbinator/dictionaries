import * as React from "react";
import "./RadioGroupToggle.scss";
import { IDictionaries, TactivateDictionary } from "../store/Dictionaries.type";

export interface IRadioToggleProps {
  dictionaries: IDictionaries;
  activeDictionary: string;
  activateDictionary: TactivateDictionary;
}

export default class RadioToggle extends React.Component<IRadioToggleProps> {
  public render() {
    const { dictionaries, activeDictionary, activateDictionary } = this.props;

    return (
      <div className="radio-group-container">
        <input
          type="radio"
          name="dictionary-selection"
          id="radio-0"
          checked={activeDictionary == ""}
          onChange={() => null}
        />
        <label onClick={() => activateDictionary("")} htmlFor="radio-0">
          Initial data
        </label>
        {Object.keys(dictionaries).map(key => (
          <span key={dictionaries[key].uuid}>
            <input
              name="dictionary-selection"
              type="radio"
              id={`radio-${dictionaries[key].uuid}`}
              checked={dictionaries[key].uuid === activeDictionary}
              onChange={() => null}
            />
            <label
              htmlFor={dictionaries[key].uuid}
              onClick={() => activateDictionary(dictionaries[key].uuid)}
            >
              {dictionaries[key].name}
            </label>
          </span>
        ))}
      </div>
    );
  }
}
