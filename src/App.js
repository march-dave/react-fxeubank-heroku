import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { Table, Button, Row, Col, Input } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faChartLine } from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import RateCharts from "./components/RateChart";
import "./app.css";
// import { connect } from "react-redux";
// import action from "./Actions";

library.add(faSort, faChartLine);

// const mapDispatchToProps = dispatch => {
//   return {
//     setNewRate: newRate => dispatch(action(newRate))
//   };
// };

class App extends Component {
  state = {
    base: "",
    lasttimeupdate_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    start_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    latest_rates: [],
    rates: [],
    target_symbol: "",
    keyword: "",
    can_currency: "",
    can_rate: "",
    sorting_assending: true,
    sortingdate_assending: true,
    chart_symbol: "CAD"
  };

  handleCharthd = e => {
    console.log(e.target);
    const symbol = e.target.getAttribute("data-item");
    console.log(symbol);

    this.setState({
      chart_symbol: symbol
    });

    console.log("handleCharthd Start");
    console.log(this.state.rates);
    console.log("handleCharthd End");
  };

  handleSort = () => {
    let sorting_arr = [];
    this.state.sorting_assending === true
      ? (sorting_arr = this.state.latest_rates.sort((a, b) => {
          return a[1] - b[1];
        }))
      : (sorting_arr = this.state.latest_rates.sort((a, b) => {
          return b[1] - a[1];
        }));

    this.setState({
      latest_rates: sorting_arr,
      sorting_assending: !this.state.sorting_assending
    });
  };

  handleDateSort = () => {
    this.setState({
      sortingdate_assending: !this.state.sortingdate_assending
    });
  };

  handleFilteredDate = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  componentDidMount = () => {
    const url = `https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP,EUR,AUD,CAD`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        let result = [];
        let res_currency;
        let res_rate;
        for (let currencyCode in data.rates) {
          result.push([currencyCode, data.rates[currencyCode]]);

          if (currencyCode.toUpperCase() === "CAD") {
            res_currency = currencyCode.toUpperCase();
            res_rate = data.rates[currencyCode];
          }
        }

        console.log(data);

        this.setState({
          base: data.base,
          lasttimeupdate_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          latest_rates: result,
          can_currency: res_currency,
          can_rate: res_rate
        });
      });
  };

  handleFxRate = () => {
    const url = `https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP,EUR,AUD,CAD`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        let result = [];
        let res_currency;
        let res_rate;
        for (let currencyCode in data.rates) {
          result.push([currencyCode, data.rates[currencyCode]]);

          if (currencyCode.toUpperCase() === "CAD") {
            res_currency = currencyCode.toUpperCase();
            res_rate = data.rates[currencyCode];
          }
        }

        console.log(data);

        this.setState({
          base: data.base,
          lasttimeupdate_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          latest_rates: result,
          can_currency: res_currency,
          can_rate: res_rate
        });
      });
  };

  handleFxRateLast30Days = e => {
    console.log("aaa : " + e.target.name);

    const start_at = moment()
      .add(-30, "days")
      .format("YYYY-MM-DD");
    const end_at = moment(Date.now()).format("YYYY-MM-DD");
    const target_symbol =
      e.target.name === "" ? "GBP,EUR,AUD,CAD" : e.target.name;

    console.log("target_symbol: " + target_symbol);
    
    // https://api.exchangeratesapi.io/history?start_at=2018-11-28&end_at=2018-12-28&base=USD&symbols=GBP,EUR,AUD,CAD

    const url = `https://api.exchangeratesapi.io/history?start_at=${start_at}&end_at=${end_at}&base=USD&symbols=${target_symbol}`;

    console.log("url " + url);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        let result = [];
        for (let i in data.rates) {
          result.push([i, data.rates[i]]);
        }

        console.log(data.rates);
        console.log(result);

        this.setState({
          base: data.base,
          end_at: moment(data.end_at).format("YYYY-MM-DD HH:mm:ss"),
          start_at: moment(data.start_at).format("YYYY-MM-DD HH:mm:ss"),
          rates: result,
          target_symbol: target_symbol
        });
      });
  };

  handleSaveFxRate = () => {
    axios
      .post("https://fxeubank.herokuapp.com/api/fxrate", {
        base: "USD",
        rates: this.state.rates,
        end_at: this.state.end_at,
        start_at: this.state.start_at
      })
      .then(response => {
        console.log(response.data);
      });
  };

  render() {
    const {
      base,
      lasttimeupdate_date,
      start_at,
      latest_rates,
      rates,
      target_symbol,
      keyword,
      can_currency,
      can_rate
    } = this.state;

    const filteredList = rates.filter(info => info[0].indexOf(keyword) !== -1);

    let dataList = keyword === "" ? rates : filteredList;

    return (
      <div className="container">
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>
            {base != "" ? (
              <Header
                basecurrency={base}
                currency={can_currency}
                rate={can_rate}
                lasttimeupdate_date={lasttimeupdate_date}
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.handleFxRate}>Get Fx Rates</Button>
          </Col>
          <Col>
            <Button onClick={this.handleFxRateLast30Days}>
              Get Fx Rates Last 30 days
            </Button>
          </Col>
          <Col>
            <Button onClick={this.handleSaveFxRate}>Store Fx Rates</Button>
          </Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>

        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th onClick={this.handleSort}>
                    Currency&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {latest_rates.map((c, i) => (
                  <tr>
                    <td>
                      <Button name={c[0]} onClick={this.handleFxRateLast30Days}>
                        {c[0]}
                      </Button>
                    </td>
                    <td>{c[1]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th onClick={this.handleDateSort}>
                    <Input
                      type="text"
                      name="filterd_date"
                      onChange={this.handleFilteredDate}
                      placeholder="Filtered Date"
                    />
                    Date <FontAwesomeIcon icon="sort" />
                  </th>
                  <th data-item="CAD" onClick={this.handleCharthd}>
                    CAD&nbsp;
                    <FontAwesomeIcon icon="chart-line" />
                  </th>
                  <th data-item="AUD" onClick={this.handleCharthd}>
                    AUD&nbsp;
                    <FontAwesomeIcon icon="chart-line" />
                  </th>
                  <th data-item="GBP" onClick={this.handleCharthd}>
                    GBP&nbsp;
                    <FontAwesomeIcon icon="chart-line" />
                  </th>
                  <th data-item="EUR" onClick={this.handleCharthd}>
                    EUR&nbsp;
                    <FontAwesomeIcon icon="chart-line" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.sortingdate_assending === true
                  ? dataList
                      .sort((a, b) => {
                        a = a[0]
                          .split("-")
                          // .reverse()
                          .join("");
                        b = b[0]
                          .split("-")
                          // .reverse()
                          .join("");
                        return parseInt(a) > parseInt(b)
                          ? 1
                          : parseInt(a) < parseInt(b)
                          ? -1
                          : 0;
                      })
                      .map((c, i) => (
                        <tr>
                          <td scope="row" key={i}>
                            {i + 1}
                          </td>
                          <td>{c[0]}</td>
                          <td>{c[1].CAD}</td>
                          <td>{c[1].AUD}</td>
                          <td>{c[1].GBP}</td>
                          <td>{c[1].EUR}</td>
                        </tr>
                      ))
                  : dataList
                      .sort((a, b) => {
                        a = a[0]
                          .split("-")
                          // .reverse()
                          .join("");
                        b = b[0]
                          .split("-")
                          // .reverse()
                          .join("");
                        return parseInt(b) > parseInt(a)
                          ? 1
                          : parseInt(b) < parseInt(a)
                          ? -1
                          : 0;
                      })
                      .map((c, i) => (
                        <tr>
                          <td scope="row" key={i}>
                            {i + 1}
                          </td>
                          <td>{c[0]}</td>
                          <td>{c[1].CAD}</td>
                          <td>{c[1].AUD}</td>
                          <td>{c[1].GBP}</td>
                          <td>{c[1].EUR}</td>
                        </tr>
                      ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col>
            <RateCharts newRate={rates} symbol={this.state.chart_symbol} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
