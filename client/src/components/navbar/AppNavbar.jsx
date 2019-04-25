import React from "react";
import Links from "./Links";
import { Collapse, Navbar, NavbarToggler, Nav, Container } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getInfoStart, getStockList } from "../../actions/stockActions";
import { getTransHistory } from "../../actions/historyActions";
import { Link } from "react-router-dom";

import { refreshStart } from "../../actions/authActions";

class AppNavbar extends Links {
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
    return (
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
              {isAuthenticated
                ? this.renderAuthLinks()
                : this.renderGuestLinks()}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  stock: state.stock,
  error: state.error
});

export default connect(mapStateToProps)(AppNavbar);
