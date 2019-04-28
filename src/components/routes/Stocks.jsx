import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../chart/Chart";
import DnD from "../dnd/index";
import StockList from "../stockList/StockList";

class Buy extends Component {
  renderChart = () => {
    const { widget } = this.props;
    if (widget.chartList.length > 0) {
      return widget.chartList.map((item, index) => (
        <DnD
          index={index}
          width="635px"
          name="График"
          closable={true}
          position={1 + index}
          key={1 + index}
        >
          <Chart id={item} index={index} />
        </DnD>
      ));
    }
  };

  render() {
    return (
      <React.Fragment>
        <DnD
          width="635px"
          name="Список акций"
          closable={false}
          position={0}
          key={0}
        >
          <StockList />
        </DnD>
        {this.renderChart()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  widget: state.widget
});

export default connect(mapStateToProps)(Buy);
