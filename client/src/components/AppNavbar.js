import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import { getInfo } from "../actions/stockActions";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };
  //this.toggle = this.toggle.bind(this); // Если не писать через стрелочную ф-ию

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getInfo();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { balance } = this.props.stock;
    // check if score === undefined
    if (user) {
      if (user.score === undefined) {
        user.score = 0;
      }
    }

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong> {balance ? ` Welcome ${balance.name}` : " "}</strong>
          </span>
        </NavItem>
        <NavItem>
          <NavLink href="/buy">Let's buy some sh*t</NavLink>{" "}
        </NavItem>
        <NavItem>
          <NavLink href="/balance">Assets</NavLink>{" "}
        </NavItem>

        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar
          style={{ background: "#2f3640" }}
          dark
          expand="sm"
          className="mb-5"
        >
          <Container>
            <NavbarBrand href="/">Taktasimoff / Bullish</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  stock: state.stock
});

export default connect(
  mapStateToProps,
  { getInfo }
)(AppNavbar);
