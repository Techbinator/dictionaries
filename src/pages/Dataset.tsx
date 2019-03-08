import React from "react";
import RadioGroupToggle from "../components/RadioGroupToggle";
import DatasetHead from "../components/DatasetHead";
import DatasetBody from "../components/DatasetBody";
import { DictionariesContext } from "../store/DictionariesContext";

import "./Dataset.scss";
import dataset from "../helpers/__mocks__/dataset.json";

export default class Dataset extends React.Component {
  render() {
    const {
      dictionaries,
      activeDictionary,
      activateDictionary,
      translations
    } = this.context;

    return (
      <div className="dataset one-edge-shadow">
        <div className="table-wrapper">
          <table>
            <DatasetHead {...dataset[0]} />
            <DatasetBody
              data={dataset}
              dictionary={dictionaries[activeDictionary]}
              translations={translations}
            />
          </table>
        </div>
        <div className="filter-wrapper">
          <RadioGroupToggle
            dictionaries={dictionaries}
            activeDictionary={activeDictionary}
            activateDictionary={activateDictionary}
          />
        </div>
      </div>
    );
  }
}

Dataset.contextType = DictionariesContext;
