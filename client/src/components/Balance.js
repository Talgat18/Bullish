import React, { Component } from "react";
import { Container, Spinner, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getInfo } from "../actions/stockActions";
import { refreshToken } from "../actions/authActions";
import PropTypes from "prop-types";

class Balance extends Component {
  static propTypes = {
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
    const { balance, loading } = this.props.stock;
    const noAssets = (
      <div>
        <span className="navbar-text mr-3">
          <strong> {balance ? ` Your balance ${balance.balance}` : " "}</strong>
        </span>
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

    const spinner = (
      <Spinner
        className="spinner"
        style={{ width: "9rem", height: "9rem" }}
        color="warning"
      />
    );

    const list = (
      <ListGroup className="stock-list">
        <TransitionGroup className="shopping-list">
          {balance.stocks.map(({ id, name, price, priceDelta, count }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                Name - {name} | Amount - {count} | {price}${" "}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    );

    const test = loading ? spinner : noAssets;

    return (
      <Container style={{ color: "#2f3640" }}>
        <span className="navbar-text mr-3">
          <strong> {balance.stocks.length === 0 ? test : list}</strong>
        </span>
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
  { getInfo, refreshToken }
)(Balance);
