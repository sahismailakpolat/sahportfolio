import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    axios.post(
        "https://api.devcamp.space/sessions",
        {
          client: {
            email: this.state.email,
            password: this.state.password
          }
        },
        {
          withCredentials: true
        }
      ).then(res => {
        if (res.data.status === "created") {
            this.props.handleSuccessfulAuth();
        } else {
            this.setState({
                errorText: "Wrong email or password"
            })
            this.props.handleUnsuccessfulAuth();
        }
      }).catch(err => {
          this.setState({
              errorText: alert(err)
          });
          this.props.handleUnsuccessfulAuth();

      });
    
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }

  render() {
    return (
      <div>
        <h1>Login to access your portfolio</h1>
        <div>{this.state.errorText}</div>

        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email Adress"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
