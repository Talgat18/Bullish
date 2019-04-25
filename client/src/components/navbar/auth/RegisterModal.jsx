import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  NavLink,
  Alert,
  Spinner
} from "reactstrap";
import { connect } from "react-redux";

import { registerStart } from "../../../actions/authActions";
import { clearErrors } from "../../../actions/errorsActions";

class Register extends Form {
  state = {
    modal: false,
    msg: null,
    data: {
      name: "",
      login: "",
      password: "",
      icon:
        "https://uybor.uz/borless/uybor/img/user-images/user_no_photo_300x300.png"
    },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    icon: Joi.string()
      .required()
      .label("Profile Icon"),
    login: Joi.string()
      .required()
      .label("Login"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.props.dispatch(clearErrors());
    this.setState({
      modal: !this.state.modal
    });
  };

  doSubmit = () => {
    const { login, name, icon, password } = this.state.data;
    const user = {
      name,
      login,
      password,
      icon
    };
    this.props.dispatch(registerStart(user));
  };

  render() {
    const { msg, modal } = this.state;
    const { isLoading } = this.props.auth;
    const spinner = <Spinner type="grow" color="warning" />;
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Register {"          "}
            {isLoading ? spinner : " "}
          </ModalHeader>
          <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            <form onSubmit={this.onSubmit}>
              <FormGroup>
                {this.renderInput("name", "Name")}
                {this.renderInput("icon", "Profile Icon")}
                {this.renderInput("login", "Login")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Register")}
              </FormGroup>
            </form>
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

export default connect(mapStateToProps)(Register);
