import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../../actions/authActions";

export class Logout extends Component {
  handleLogout = () => {
    this.props.dispatch(logout());
  };
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.handleLogout}>
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(null)(Logout);
