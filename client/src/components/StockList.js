import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
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
    const { stocks } = this.props.stock;
    const { balance } = this.props.stock;
    return (
      <Container style={{ color: "black" }}>
        <Button onClick={this.test}>Test Button</Button> {}
        <Button onClick={this.refreshingToken}>RefreshTokenBTN</Button> {}
        <span className="navbar-text mr-3">
          <strong> {balance ? `Balance - ${balance.balance}` : " "}</strong>
        </span>
        <ListGroup className="stock-list">
          <TransitionGroup className="shopping-list">
            {stocks.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {name}{" "}
                  {this.props.isAuthenticated ? (
                    <Button
                      block
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
