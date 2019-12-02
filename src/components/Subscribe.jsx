import React from "react";
// import users from "../json/User.json";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      error: "",
      success: "",
      users: null
    };
  }

  componentWillMount() {
    fetch("http://localhost:4000/user")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ users: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleChange = name => event => {
    //users can subscribe to news updates using their emails
    this.setState({ name: event.target.value });
  };

  click = () => {
    console.log("click");
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email is validated
    if (reg.test(this.state.name) === false) {
      // console.log("Email is Not Correct");
      this.setState({
        error: "Please try again,Email is Not Correct"
      });
      return false;
    }
    var tempUser = this.state.users.includes(this.state.name);

    if (tempUser) {
      //the user wouldn’t be able to subscribe again
      this.setState({
        error: "This user is already registered"
      });
      setTimeout(() => {
        this.setState({ error: "", name: "" });
      }, 3000);
      return false;
    } else {
      this.setState({ users: this.state.users.concat([this.state.name]) });

      // console.log(this.state.users[0]);
      this.setState({
        error: "",
        name: "",
        success: "Your email has been successfully sent"
      });
      setTimeout(() => {
        this.setState({ success: "" });
      }, 3000);
      // console.log("Email is Correct");
    }
  };

  render() {
    return (
      <div>
        <div className="title">Subscribe for updates</div>
        <div className="column">
          <TextField
            id="outlined-email-input"
            label="Email"
            className="section"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            value={this.state.name}
            onChange={this.handleChange("name")}
          />
          {this.state.error !== "" ? (
            <div style={error}>{this.state.error}</div>
          ) : (
            <div style={success}>{this.state.success}</div>
          )}
          <Button
            style={button}
            variant="contained"
            color="primary"
            onClick={this.click}
          >
            Send
          </Button>
        </div>
      </div>
    );
  }
}
//inline style
var button = {
  width: "10vw"
};

var error = {
  color: "red",
  direction: "ltr",
  height: "5px"
};

var success = {
  color: "blue",
  direction: "ltr",
  height: "5px"
};
