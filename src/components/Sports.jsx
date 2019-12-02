import React from "react";
// import data from "../json/Sport.json";

import "chart.js";

export default class Sports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      delay: 1000,
      data: null
    };
  }

  componentWillMount() {
    fetch("http://localhost:4000/sport")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ data: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    //displays the current score of a sports match
    setTimeout(() => {
      //update every 1 second
      this.setState({ id: (this.state.id + 1) % this.state.data.length });
    }, this.state.delay);

    return (
      <div>
        {this.state.data ? (
          <div>
            <div className="title">Sports</div>
            <div className="row" style={sectionRes}>
              <img
                style={imgSport}
                src={require("../img/sports/" +
                  this.state.data[this.state.id].img1)}
                alt=""
              />
              {this.state.data[this.state.id].Score1}
              {":"}
              {this.state.data[this.state.id].Score2}
              <img
                style={imgSport}
                src={require("../img/sports/" +
                  this.state.data[this.state.id].img2)}
                alt=""
              />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    );
  }
}

//inline style
var imgSport = {
  height: "60px",
  width: "60px"
};

var sectionRes = {
  justifyContent: "space-around",
  alignItems: "center",
  marginTop: "9vh",
  fontSize: "xx-large",
  fontWeight: "bolder"
};
