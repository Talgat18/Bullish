import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Spinner
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { getInfo, getStockList } from "../actions/stockActions";
import { refreshToken } from "../actions/authActions";
import PropTypes from "prop-types";

class StockList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    stock: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  state = {
    opa: 0
  };

  componentDidMount() {
    this.props.getStockList();
    this.props.getInfo();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  test = () => {
    this.props.getStockList();
  };

  refreshingToken = () => {
    this.props.refreshToken();
  };

  render() {
    const spinner = (
      <Spinner
        className="spinner"
        style={{ width: "10rem", height: "10rem" }}
        color="warning"
      />
    );

    const { stocks, balance, loading } = this.props.stock;

    const test = (
      <ListGroup className="stock-list" >
        <TransitionGroup className="shopping-list">
          {stocks.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                {name}{" "}
                {this.props.isAuthenticated ? (
                  <Button
                    outline
                    color="success"
                    onClick={this.onDeleteClick.bind(this, id)}
                  >
                    Buy
                  </Button>
                ) : null}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    );
    return (
      <Container className="stock-container" style={{ color: "black" }}>
        <Button onClick={this.test}>Test Button</Button> {}
        <Button onClick={this.refreshingToken}>RefreshTokenBTN</Button> {}
        <span className="navbar-text mr-3">
          <strong> {balance ? `Balance - ${balance.balance}` : " "}</strong>
        </span>
        {loading ? spinner : test}
        {/* <ListGroup className="mt-5">
          {stocks.map(({ name }) => (
            <ListGroupItem>{name}</ListGroupItem>
          ))}
        </ListGroup> */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  isAuthenticated: state.auth.isAuthenticated,
  score: state.auth.score,
  ID: state.auth.user
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, getInfo, refreshToken, getStockList }
)(StockList);
