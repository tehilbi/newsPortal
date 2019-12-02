import React from "react";
// import data from "../../json/Weather.json";

// import img8 from "../../img/weather/weatherNew/Capture8.PNG";
// import img9 from "../../img/weather/weatherNew/Capture9.PNG";
// import img10 from "../../img/weather/weatherNew/Capture10.PNG";
// import img11 from "../../img/weather/weatherNew/Capture11.PNG";
// import img12 from "../../img/weather/weatherNew/Capture12.PNG";
// import img13 from "../../img/weather/weatherNew/Capture13.PNG";
// import img14 from "../../img/weather/weatherNew/Capture14.PNG";
// import img15 from "../../img/weather/weatherNew/Capture15.PNG";

import Popup from "reactjs-popup";
import ModalWeather from "./ModalWeather";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      currentDate: new Date().getDate(),
      currentMonth: new Date().getMonth() + 1,
      delay: 14400000,
      data: null
    };
  }

  componentWillMount() {
    fetch("http://localhost:4000/weather")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ data: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  Modal = () => {
    console.log(this.state.data);
    //display a 7-day based forecast
    return (
      <div>
        <div style={row}>
          {this.state.data.map(data => (
            <ModalWeather
              data={data}
              id={data.id}
              key={data.id}
              date={
                this.state.currentDate + data.id + "/" + this.state.currentMonth
              }
            />
          ))}
        </div>
      </div>
    );
  };

  render() {
    console.log(this.state.data);
    //display the current weather conditions
    setTimeout(() => {
      //update every 4 hours
      this.setState({ id: (this.state.id + 1) % this.state.data.length });
    }, this.state.delay);
    var currentdate = new Date();

    return (
      <div>
        {this.state.data ? (
          <Popup
            modal
            trigger={
              <div className="page weather">
                <div className="title">Weather</div>

                <div className="row">
                  <section style={sectionSummary}>
                    <div>
                      {this.state.data[this.state.id].degrees}
                      {" C "}
                    </div>
                    <div className="summary">Beer Sheva</div>
                  </section>
                  <div>
                    <img
                      src={require("../../img/weather/weatherNew/" +
                        this.state.data[this.state.id].icon)}
                      alt=""
                    />
                  </div>
                </div>

                <div className="currentDate">
                  {"Last update: " +
                    currentdate.getHours() +
                    ":" +
                    (currentdate.getMinutes() < 10
                      ? "0" + currentdate.getMinutes() + " "
                      : currentdate.getMinutes() + " ")}
                </div>
              </div>
            }
          >
            {this.Modal}
          </Popup>
        ) : (
          <div>loading...</div>
        )}
      </div>
    );
  }
}

//inline style
var sectionSummary = {
  marginTop: "30px",
  color: "black",
  fontSize: "3vh"
};

var row = {
  display: "flex",
  justifyContent: "start",
  alignItems: "center"
};
