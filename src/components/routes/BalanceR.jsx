import React, { Component } from "react";
import Balance from "../account/Balance";
import { Container } from "reactstrap";

export default class BalanceRoute extends Component {
  render() {
    return (
      <Container>
        <Balance />
      </Container>
    );
  }
}
