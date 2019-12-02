import React from "react";

export default class ModalWeather extends React.Component {
  render() {
    return (
      <div className="page weather" style={weatherPageWeek}>
        <div className="row">
          <section className="section">
            <div className="summary">
              {this.props.data.degrees}
              {" C "}
            </div>
            <div className="summary">Beer Sheva</div>
          </section>
          <div>
            <img
              style={iconWeek}
              src={require("../../img/weather/weatherNew/" +
                this.props.data.icon)}
              alt=""
            />
          </div>
        </div>

        <div className="currentDate">{this.props.date}</div>
      </div>
    );
  }
}

var weatherPageWeek = {
  paddingRight: "1vw",
  paddingLeft: "1vw",
  borderRight: "1px solid #ADD8E6",
  borderLeft: "1px solid #ADD8E6",
  color: "black"
};

var iconWeek = {
  width: "5vw",
  height: "5vw"
};
