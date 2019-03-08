import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Dictionaries from "./pages/Dictionaries";
import Dataset from "./pages/Dataset";
import { DictionariesProvider } from "./store/DictionariesContext";

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <DictionariesProvider>
          <Header />
          <div className="content">
            <Route exact path="/" component={Dataset} />
            <Route exact path="/dictionaries" component={Dictionaries} />
          </div>
        </DictionariesProvider>
      </BrowserRouter>
    );
  }
}

export default App;
