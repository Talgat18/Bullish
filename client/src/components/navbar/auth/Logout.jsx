import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../../actions/authActions";
import { NavLink } from "react-router-dom";

export class Logout extends Component {
  handleLogout = () => {
    this.props.dispatch(logout());
  };
  render() {
    return (
      <Fragment>
        <NavLink
          className="nav-item nav-link"
          onClick={this.handleLogout}
          to="/home"
        >
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(null)(Logout);
