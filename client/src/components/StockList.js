import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";
import AtomSpinner from "./spinner/atom-spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getNews } from "../actions/newsActions";
import { refreshToken } from "../actions/authActions";
import {
  getInfo,
  getStockList,
  getStockHistory,
  buyingStock,
  sellingStock
} from "../actions/stockActions";

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      buyMod: true,
      amount: 0,
      stockId: 0,
      price: 0
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    this.props.getStockList();
    this.props.getInfo();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  refreshingToken = () => {
    this.props.refreshToken();
  };

  showChart = id => {
    this.props.getStockHistory(id);
  };

  openMod = (id, price) => {
    this.setState({ stockId: id, price: price });
    this.toggle();
  };

  buyStock = () => {
    console.log(
      "success",
      this.state.id,
      "--- ID",
      this.state.price,
      "--- PRICE",
      this.state.amount,
      "--- AMOUNT"
    );
    const { stockId, amount } = this.state;

    const buy = {
      stockId,
      amount
    };

    this.toggle();
    this.props.buyingStock(buy);
  };

  sellStock = () => {
    console.log(
      "success",
      this.state.id,
      "--- ID",
      this.state.price,
      "--- PRICE",
      this.state.amount,
      "--- AMOUNT"
    );
    const { stockId, amount } = this.state;

    const sell = {
      stockId,
      amount
    };

    this.toggle();
    this.props.sellingStock(sell);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  maxAmount = () => {
    const { balance } = this.props.stock;
    const max = Math.floor(balance.balance / this.state.price);
    document.getElementById(this.state.stockId).value = max;
    console.log(document.getElementById(this.state.stockId).value);
    this.setState({ amount: max });
  };

  render() {
    const spinner = <AtomSpinner color="#000000" size={50} />;

    const { stocks, balance, loading } = this.props.stock;

    const buyModal = (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{`Balance - ${
            balance.balance
          } | Stock price - ${this.state.price}`}</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Row form>
                  <Col md={10}>
                    <FormGroup>
                      <Input
                        type="amount"
                        name="amount"
                        id={this.state.stockId}
                        placeholder="Enter amount..."
                        className="mb-3"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Button color="link" onClick={this.maxAmount}>
                        Max
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={8}>
                    <FormGroup>
                      <Button
                        color="success"
                        style={{ marginTop: "2rem" }}
                        block
                        onClick={this.buyStock}
                      >
                        Buy
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Button
                        color="danger"
                        style={{ marginTop: "2rem" }}
                        block
                        onClick={this.sellStock}
                      >
                        Sell
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );

    const stock_list = (
      <ListGroup className="stock-list">
        <TransitionGroup className="shopping-list">
          {stocks.map(({ id, name, price, priceDelta }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                {name} {price} {priceDelta}{" "}
                {this.state.buyMod ? buyModal : null}
                <Button
                  style={{ marginRight: "0.5rem" }}
                  outline
                  color="info"
                  onClick={this.openMod.bind(this, id, price)}
                >
                  Buy/Sell
                </Button>
                {this.props.isAuthenticated ? (
                  <Button
                    outline
                    color="info"
                    onClick={this.showChart.bind(this, id)}
                  >
                    График
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
        <Button onClick={this.refreshingToken}>RefreshTokenBTN</Button> {}
        <span className="navbar-text mr-3">
          <strong> {balance ? `Balance - ${balance.balance}` : " "}</strong>
        </span>
        <div style={{ textAlign: "center" }}>
          {" "}
          {loading ? spinner : stock_list}
        </div>
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
  {
    getInfo,
    refreshToken,
    getStockList,
    getStockHistory,
    getNews,
    buyingStock,
    sellingStock
  }
)(StockList);
