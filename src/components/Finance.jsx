import React from "react";
// import data from "../json/Finance.json";

import { LineChart } from "react-chartkick";
import "chart.js";

export default class Finance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      delay: 300000,
      data: null
    };
  }

  componentWillMount() {
    fetch("http://localhost:4000/finance")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ data: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const dataChart = this.state.data ? this.state.data[this.state.id] : "";
    //stock market line chart
    let data = [
      {
        name: "Period 1",
        data: {
          Team1: dataChart.Team1,
          Team2: dataChart.Team2,
          Team3: dataChart.Team3,
          Team4: dataChart.Team4
        }
      },
      {
        name: "Period 2",
        data: {
          Team1: dataChart.Team5,
          Team2: dataChart.Team6,
          Team3: dataChart.Team7,
          Team4: dataChart.Team8
        }
      }
    ];
    setTimeout(() => {
      //update every 5 minutes
      this.setState({ id: (this.state.id + 1) % this.state.data.length });
    }, this.state.delay);

    return (
      <div>
        {this.state.data ? (
          <div>
            <div className="title">Finance</div>
            <LineChart data={data} />
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    );
  }
}
