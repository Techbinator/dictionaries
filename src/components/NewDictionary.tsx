import React from "react";
import { TaddDictionary } from "../store/Dictionaries.type";
interface INewDictionary {
  addDictionary: TaddDictionary;
}

const INITIAL_STATE = { name: "", error: "" };
export default class NewDictionary extends React.Component<INewDictionary> {
  state = INITIAL_STATE;
  onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    if (this.state.name.length < 1) {
      this.setState({ error: "Please add a dictionary name" });
      return;
    }
    this.props.addDictionary(this.state.name);
    this.setState(INITIAL_STATE);
  };
  render() {
    const { name, error } = this.state;
    return (
      <tr>
        <td colSpan={2} className="p-relative">
          {error && <span className="error">{error}</span>}
          <input
            onChange={e => this.setState({ name: e.target.value })}
            onFocus={e => this.setState({ error: "" })}
            type="string"
            placeholder="Name"
            value={name}
          />
        </td>
        <td>
          <input type="button" value="Add dictionary" onClick={this.onSubmit} />
        </td>
      </tr>
    );
  }
}
