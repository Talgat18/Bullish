import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { getInfo } from "../actions/stockActions";
import { refreshToken } from "../actions/authActions";
import PropTypes from "prop-types";

class Balance extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getInfo();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  test = () => {
    this.props.refreshToken();
  };

  render() {
    const { balance } = this.props.stock;

    const noAssets = (
      <div>
        <span className="navbar-text mr-3">
          <strong>You have no stocks</strong>
        </span>
        <span className="navbar-text mr-3">
          <a href="/buy" className="badge badge-info">
            Buy some!
          </a>
        </span>
      </div>
    );

    const haveSome = (
      <span className="navbar-text mr-3">
        <strong>You have some</strong>
      </span>
    );

    return (
      <Container style={{ color: "#2f3640" }}>
        <span className="navbar-text mr-3">
          <strong> {balance ? ` Your balance ${balance.balance}` : " "}</strong>
        </span>
        <span className="navbar-text mr-3">
          <strong> {balance.stocks.length === 0 ? noAssets : haveSome}</strong>
        </span>
        <Button onClick={this.test}>Test Button</Button> {}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  score: state.auth.score,
  ID: state.auth.user,
  stock: state.stock
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, getInfo, refreshToken }
)(Balance);
