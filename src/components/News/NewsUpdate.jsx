import React from "react";
// import data from "../../json/NewsUpdate.json";

import gif from "../../img/news/source.gif";

import Popup from "reactjs-popup"; //for modal

export default class NewsUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      delay: 600000,
      img: null,
      data: null
    };
  }

  componentWillMount() {
    fetch("http://localhost:4000/news")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ data: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  modalFunc = () => {
    //show the full article in the modal window
    return (
      <div style={modal}>
        {" "}
        <section style={sectionSummaryArticle}>
          <div style={header}> {this.state.data[this.state.id].title}</div>
          <div className="summary" style={modalArticle}>
            {this.state.data[this.state.id].summary}
          </div>{" "}
          <img
            style={newsImgArticle}
            src={require("../../img/news/" +
              this.state.data[this.state.id].img)}
            alt="newsImgArticle"
          />{" "}
          <div style={content}> {this.state.data[this.state.id].article}</div>
        </section>
      </div>
    );
  };

  render() {
    console.log(this.state);
    setTimeout(() => {
      //real-time updte display the latest news break every 10 min
      this.setState({ id: (this.state.id + 1) % this.state.data.length });
    }, this.state.delay);
    var currentdate = new Date();

    return (
      <div>
        {this.state.data ? (
          <div className="page">
            <div className="title">News update</div>
            <img style={newsGif} src={gif} alt="" />
            <Popup
              modal
              trigger={
                <section style={sectionSummary}>
                  <div className="summary" style={titleSummary}>
                    {currentdate.getHours() +
                      ":" +
                      (currentdate.getMinutes() < 10
                        ? "0" + currentdate.getMinutes() + " "
                        : currentdate.getMinutes() + "  ")}
                    <br />

                    {this.state.data[this.state.id].title}
                  </div>
                  <div className="row ">
                    {" "}
                    <img
                      style={newsImg}
                      src={require("../../img/news/" +
                        this.state.data[this.state.id].img)}
                      alt="newsImg"
                    />
                    <div className="summary">
                      {this.state.data[this.state.id].summary}
                    </div>
                  </div>
                </section>
              }
            >
              {this.modalFunc}
            </Popup>
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    );
  }
}

//inline style
var titleSummary = {
  color: "red",
  marginRight: "1vw",
  marginLeft: "1vw"
};

var newsImg = {
  width: "auto",
  height: "17vh",
  margin: "1vw"
};

var newsGif = {
  width: "auto",
  height: "7vh",
  margin: "1vw",
  position: "absolute",
  left: "45%",
  bottom: "78%"
};

var newsImgArticle = {
  width: "70%",
  height: "100%",
  margin: "inherit"
};

var sectionSummary = {
  margin: "3vw 1vw 1vw 2vw"
};

var sectionSummaryArticle = {
  margin: "30px"
};

var modal = {
  fontSize: "12px",
  height: "90vh",
  overflowY: "scroll"
};

var header = {
  width: "100%",
  borderBottom: "1px solid gray",
  fontSize: "28px",
  padding: "5px",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: "3",
  WebkitBoxOrient: "vertical",
  color: "black",
  margin: "1vw"
};

var content = {
  fontSize: "20px",
  marginLeft: "30px"
};

var modalArticle = {
  marginLeft: "30px"
};
