import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
  Spinner
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { getInfo } from "../../actions/stockActions";
import { clearErrors } from "../../actions/errorActions";

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  buyStock = id => {
    console.log("success", id, this.state.amount);
    this.toggle();
  };

  render() {
    const { isLoading } = this.props.auth;
    const { balance } = this.props.stock;
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{`Balance --- ${
            balance.balance
          }`}</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Amount</Label>

                <Input
                  type="amount"
                  name="amount"
                  id="amount"
                  placeholder="Enter amount..."
                  className="mb-3"
                  onChange={this.onChange} // use in typeracer
                />

                <Button
                  disabled={isLoading}
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  onClick={this.buyStock}
                >
                  Buy
                </Button>
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
  { login, clearErrors, getInfo }
)(Buy);
