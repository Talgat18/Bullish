import React, { Component } from "react";
import AppNavbar from "../AppNavbar";
import Balance from "../Balance";
import ItemModal from "../ItemModal";
import { Container } from "reactstrap";

export default class BalanceRoute extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container>
          <ItemModal />
          <Balance />
        </Container>
      </div>
    );
  }
}
