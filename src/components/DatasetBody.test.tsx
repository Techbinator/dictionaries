import React from "react";
import DatasetBody from "./DatasetBody";
import { shallow } from "enzyme";

import dataset from "../helpers/__mocks__/smallDataset.json";
import dictionariesData from "../helpers/__mocks__/dictionaries.json";

describe("DatasetBody component", () => {
  it("should render render one row for each dataset object", () => {
    const dictionary =
      dictionariesData.dictionaries["619ce930-4116-11e9-9306-ef359c18301d"];
    const wrapper = shallow(
      <DatasetBody
        data={dataset}
        dictionary={dictionary}
        translations={dictionariesData.translations}
      />
    );
    const tableRows = wrapper.find("tr");
    expect(tableRows).toHaveLength(4);
  });
});
