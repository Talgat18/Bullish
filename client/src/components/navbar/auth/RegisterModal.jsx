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

import { registerStart } from "../../../actions/authActions";

class Register extends Component {
  state = {
    modal: false,
    login: "",
    password: "",
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // If auth --> close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    //this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, login, password } = this.state;

    // Create user object
    const newUser = {
      name,
      login,
      password
    };
    // Attempt to register
    this.props.dispatch(registerStart(newUser));
    this.toggle();
  };

  render() {
    const { isLoading } = this.props.auth;
    const spinner = <Spinner type="grow" color="warning" />;
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Register{"          "}
            {isLoading ? spinner : " "}
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Login</Label>
                <Input
                  type="login"
                  name="login"
                  id="login"
                  placeholder="Login"
                  className="mb-3"
                  onChange={this.onChange} // use in typeracer
                />
                <Label for="item">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange} // use in typeracer
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Register
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Register);
