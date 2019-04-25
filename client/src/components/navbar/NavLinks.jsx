import React, { Component, Fragment } from "react";

import { NavItem, Spinner } from "reactstrap";
import { NavLink } from "react-router-dom";

import Logout from "../auth/Logout";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

class Links extends Component {
  renderGuestLinks() {

    return (
      <Fragment>
       

        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );
  }

  renderAuthLinks() {
    const spinner = <Spinner size="sm" type="grow" color="warning" />;
    const { balance, loading } = this.props.stock;

    return (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong className="welcoming">
              {" "}
              {loading
                ? spinner
                : ` Welcome ${balance.name || localStorage.getItem("name")}`}
            </strong>
          </span>
        </NavItem>
        <NavItem>
          <NavLink className="nav-item nav-link" to="/stocks">
            Акции
          </NavLink>{" "}
        </NavItem>
        <NavItem>
          <NavLink className="nav-item nav-link" to="/balance">
            Личный кабинет
          </NavLink>{" "}
        </NavItem>
        <Logout />
        <NavItem />
      </Fragment>
    );
  }
}

export default Links;
