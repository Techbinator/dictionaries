import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../assets/images/logo.png";
import "./Header.scss";

export default () => (
  <header className="header">
    <img src={logo} />
    <div className="menu">
      <NavLink exact to="/">
        Dataset
      </NavLink>
      <NavLink exact to="/dictionaries">
        Dictionaries
      </NavLink>
    </div>
  </header>
);
