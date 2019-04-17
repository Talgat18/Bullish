import React, { Component } from "react";
import AppNavbar from "../AppNavbar";
import Drag from "../drag";

export default class Buy extends Component {
  render() {
    return (
      <React.Fragment>
        <AppNavbar />
        <div>
          <Drag />
        </div>
      </React.Fragment>
    );
  }
}
