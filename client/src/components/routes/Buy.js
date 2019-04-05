import React, { Component } from "react";
import AppNavbar from "../AppNavbar";
import StockList from "../StockList";
import { Container } from "reactstrap";

export default class Buy extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container>
          <StockList />
        </Container>
      </div>
    );
  }
}
