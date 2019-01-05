import React, { Component } from "react";
import Chart from "react-google-charts";

const options = {
  title: "Fx Rate",
  curveType: "function",
  legend: { position: "bottom" }
};

class RateCharts extends Component {
  static defaultProps = {
    data: []
  };

  state = {};

  componentDidMount() {
    const { symbol } = this.props;
    let result = [["Dates", symbol]];
    this.props.newRate.map(c => result.push([c[0], c[1][symbol]]));

    this.setState({
      data: result
    });
  }

  handleValue = () => {
    const { symbol } = this.props;
    let result = [["Dates", symbol]];
    this.props.newRate.map(c => result.push([c[0], c[1][symbol]]));
    this.setState({
      data: result
    });
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        <button onClick={this.handleValue}>Chart Refresh</button>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    );
  }
}

// RateCharts = connect(
//   mapStateToProps,
//   null
// )(RateCharts);

export default RateCharts;
