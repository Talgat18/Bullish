import React, { Component } from "react";
import Chart from "./Chart";
import StockList from "./StockList";
import { Container, Row, Col } from "reactstrap";

export default class Drag extends Component {
  yo = e => {
    var ball = document.getElementById("ball");
    var ballz = document.getElementById("ballz");

    ballz.onmousedown = function(e) {
      var coords = getCoords(ballz);
      var shiftX = e.pageX - coords.left;
      var shiftY = e.pageY - coords.top;

      ball.style.position = "absolute";
      document.body.appendChild(ball);
      moveAt(e);

      ball.style.zIndex = 1000; // над другими элементами

      function moveAt(e) {
        ball.style.left = e.pageX - shiftX + "px";
        ball.style.top = e.pageY - shiftY + "px";
      }

      document.onmousemove = function(e) {
        moveAt(e);
      };

      ball.onmouseup = function() {
        document.onmousemove = null;
        ball.onmouseup = null;
      };
    };

    ball.ondragstart = function() {
      return false;
    };

    function getCoords(elem) {
      // (1)
      var box = elem.getBoundingClientRect();

      var body = document.body;
      var docEl = document.documentElement;

      // (2)
      var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      var scrollLeft =
        window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

      // (3)
      var clientTop = docEl.clientTop || body.clientTop || 0;
      var clientLeft = docEl.clientLeft || body.clientLeft || 0;

      // (4)
      var top = box.top + scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;

      return {
        top: top,
        left: left
      };
    }
  };

  render() {
    //console.log(this.props.position);
    return (
      <Container>
        <Row>
          <Col md={8}>
            <div id="ball" className="ball stocks" onMouseDown={this.yo}>
              <div
                id="ballz"
                className="ballz"
                style={{ backgroundColor: "#f1c40f" }}
              >
                {" "}
                Список Акций
              </div>
              <StockList />
            </div>
          </Col>
          <Col md={4}>
            {" "}
            <div id="ball" className="ball" onMouseDown={this.yo}>
              <div
                id="ballz"
                className="ballz"
                style={{ backgroundColor: "#f1c40f" }}
              >
                {" "}
                График
              </div>
              <Chart />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
