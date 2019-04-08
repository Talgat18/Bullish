import React, { Component } from "react";
import Rnd from "react-rnd";
import AppNavbar from "../AppNavbar";
import Drag from "../drag";
import Stocklist from "../StockList";

export default class Test extends Component {
  render() {
    
    return (
      <React.Fragment>
        <AppNavbar />
        <div
          style={{
            width: "400px",
            height: "100px"
          }}
        >
          <Rnd
            default={{
              x: 100,
              y: 40,
              width: 500,
              height: 190
            }}
            minWidth={900}
            minHeight={200}
            bounds="window"
          >
            <Stocklist />
          </Rnd>
        </div>
      </React.Fragment>
    );
  }
}
