import React, { Component } from "react";
import Joi from "joi-browser";
import { Button } from "reactstrap";
import Input from "./input";
import { clearErrors } from "../../actions/errorsActions";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) {
      return null;
    }

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit(e);
    this.props.dispatch(clearErrors());
  };

  onChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.onChange}
        placeholder={name}
        error={errors[name]}
      />
    );
  }

  renderButton(label) {
    const { isLoading } = this.props.auth;

    return (
      <Button
        disabled={isLoading}
        color="dark"
        style={{ marginTop: "2rem" }}
        block
      >
        {label}
      </Button>
    );
  }
}

export default Form;
