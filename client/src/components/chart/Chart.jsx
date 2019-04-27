import React, { Component } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { getStockHistory } from "../../actions/chartActions";

class Chart extends Component {
  constructor(props) {
    super(props);
    const { chart, index } = this.props;
    this.state = {
      opacity: 1,
      anyData: {
        displayTitle: true,
        displayLegend: true,
        legendPosition: "right",
        text: "someStock"
      },
      chartData: {
        labels: chart.date[index],
        datasets: [
          {
            label: "USD",
            fill: false,
            data: chart.data[index],
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
    const { chart, index } = this.props;
    this.setState({
      chartData: {
        labels: chart.date[index],
        datasets: [
          {
            label: "USD",
            data: chart.data[index]
          }
        ]
      }
    });
  }

  componentDidMount() {
    this.handleData();
  }

  handleData = () => {
    const { id } = this.props;
    let range = "month";
    this.props.dispatch(getStockHistory(id, range));
  };

  render() {
    const { anyData, chartData } = this.state;
    return (
      <div className="chart-container">
        <Line
          width={15}
          height={7}
          data={chartData}
          options={{
            title: {
              display: anyData.displayTitle,
              text: anyData.text,
              fontSize: 13
            },
            legend: {
              display: anyData.displayLegend,
              position: anyData.legendPosition
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
