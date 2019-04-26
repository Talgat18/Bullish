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
        text: "someStock"
      },
      chartData: {
        labels: this.props.chart.date,
        datasets: [
          {
            label: "USD",
            fill: false,
            data: this.props.chart.data,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10
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
            data: this.props.chart.data
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
              text: this.state.anyData.text,
              fontSize: 13
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
