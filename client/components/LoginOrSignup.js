import React, { Component } from "react";
import { Login, Signup } from "../components/AuthForm";

export default class LoginOrSignup extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <h1>Login</h1>
        <Login />

        <h1>Signup</h1>
        <Signup />
      </div>
    );
  }
}
