import React, { Component } from "react";
import Drag from "../drag";
import { Container } from "reactstrap";
import ReactCursorPosition from "react-cursor-position";

export default class Buy extends Component {
  render() {
    return (
      <div>
     
        <Container>
          <ReactCursorPosition>
            <Drag />
          </ReactCursorPosition>
        </Container>
      </div>
    );
  }
}
