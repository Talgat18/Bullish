import React, { Component } from "react";
import AppNavbar from "../AppNavbar";
import Balance from "../Balance";
import { Container } from "reactstrap";

export default class BalanceRoute extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container>
          <Balance />
        </Container>
      </div>
    );
  }
}
