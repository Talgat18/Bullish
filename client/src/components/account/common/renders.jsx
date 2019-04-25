import React, { Component } from "react";
import { Spinner } from "reactstrap";

class Renders extends Component {
  state = {};
  renderLoader() {
    return (
      <Spinner
        className="spinner-center"
        type="grow"
        style={{ width: "5rem", height: "5rem" }}
        color="warning"
      />
    );
  }

  renderNoStocks() {
    return (
      <div>
        <span className="navbar-text mr-3">You have no stocks!</span>
        <span className="navbar-text mr-3">
          <a href="/stocks" className="badge badge-info">
            Buy some!
          </a>
        </span>
      </div>
    );
  }
}

export default Renders;
