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

  constructor(props) {
    super(props);

    const { newRate, symbol } = this.props;

    console.log("DidMount Start");
    console.log(symbol);
    console.log("DidMount End");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    console.log(nextState);

    return nextProps != nextState;
  }

  componentDidMount() {
    const { newRate, symbol } = this.props;

    console.log("DidMount Start");
    console.log(symbol);
    console.log("DidMount End");

    let result = [["Dates", symbol]];
    newRate.map(c => result.push([c[0], c[1][symbol]]));

    this.setState({
      data: result
    });
  }

  handleValue = () => {
    const { newRate, symbol } = this.props;
    let result = [["Dates", symbol]];
    newRate.map(c => result.push([c[0], c[1][symbol]]));

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
