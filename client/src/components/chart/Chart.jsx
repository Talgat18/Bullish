import React, { Component } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
//import { getStockHistory } from "../actions/stockActions";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      anyData: {
        displayTitle: true,
        displayLegend: true,
        legendPosition: "right",
        location: "City"
      },
      price: [],
      chartData: {
        labels: this.props.chart.date,
        datasets: [
          {
            label: "USD",
            data: this.props.chart.data,
            backgroundColor: ["#689F38"]
          }
        ]
      }
    };
  }

  componentWillReceiveProps() {
    this.setState({
      chartData: {
        labels: this.props.chart.date,
        datasets: [
          {
            label: "USD",
            data: this.props.chart.data,
            backgroundColor: ["#689F38"]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="chart-container" style={{ opacity: this.state.opacity }}>
        <Line
          width={15}
          height={7}
          data={this.state.chartData}
          options={{
            title: {
              display: this.state.anyData.displayTitle,
              text: "Largest Cities In " + this.state.anyData.location,
              fontSize: 1
            },
            legend: {
              display: this.state.anyData.displayLegend,
              position: this.state.anyData.legendPosition
            }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chart: state.chart
});

export default connect(mapStateToProps)(Chart);
