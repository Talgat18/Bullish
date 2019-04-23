import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Spinner
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import { getInfoStart, getStockList } from "../../actions/stockActions";
import { getTransHistory } from "../../actions/historyActions";
import { NavLink, Link } from "react-router-dom";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.dispatch(getInfoStart());
      this.props.dispatch(getTransHistory());
      this.props.dispatch(getStockList());
    }
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { balance, loading } = this.props.stock;

    const spinner = <Spinner size="sm" type="grow" color="warning" />;
    const authLinks = (
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
          style={{ background: "#2f3640", height: "3rem" }}
          dark
          expand="sm"
          className="mb-5"
        >
          <Container>
            <Link className="navbar-brand" to="/">
              Taktasimoff / Bullish
            </Link>
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
  stock: state.stock,
  error: state.error
});

export default connect(mapStateToProps)(AppNavbar);
