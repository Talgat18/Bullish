import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Row,
  Col,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../../actions/authActions";
import { getInfo, sellingStock } from "../../../actions/stockActions";
import { clearErrors } from "../../../actions/errorActions";

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      amount: "0",
      count: 0
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange = e => {
    this.setState({ amount: e.target.value });
  };

  maxAmount = () => {
    const { count } = this.props;
    this.setState({ amount: count });
  };

  sellStock = () => {
    const { amount } = this.state;
    const { stockId } = this.props;

    const sell = {
      stockId,
      amount
    };
    this.toggle();
    this.props.sellingStock(sell);
  };

  render() {
    const { balance } = this.props.stock;
    return (
      <div>
        <button className="btn btn-danger btn-sm" onClick={this.toggle}>
          Sell
        </button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{`Balance - $${
            balance.balance
          } | You have - ${this.props.count} stock(s)`}</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Row form>
                  <Col md={10}>
                    <FormGroup>
                      <Input
                        name="amount"
                        value={this.state.amount}
                        id={this.state.stockId}
                        placeholder="Enter amount..."
                        className="mb-3"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Button
                        style={{ marginTop: "0.3rem" }}
                        color="link"
                        onClick={this.maxAmount}
                      >
                        Max
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Button
                        color="danger"
                        style={{ marginTop: "1.5rem" }}
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
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth,
  stock: state.stock
});

export default connect(
  mapStateToProps,
  { login, clearErrors, getInfo, sellingStock }
)(Sell);
