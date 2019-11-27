import React, { Component } from "react";

export class Login extends Component {
  onLoginBtnClicked(){
    const { username, password, clientId } = this.state;
    this.props.onLogin({ username, password, clientId })
  }
  state = {
    clientId: "PUB-sdkmobile.ryfq.MSDK",
    password: "Mobile_12",
    username: "sahin1@cpaas.com"
  };
  render() {
    return (
      <div>
        <h2>Login</h2>
        <input
          placeholder="Client Id"
          onChange={({ target }) => {
            this.setState({ clientId: target.value });
          }}
        />
        <input
          placeholder="Username"
          onChange={({ target }) => {
            this.setState({ username: target.value });
          }}
        />
        <input
          placeholder="password"
          onChange={({ target }) => {
            this.setState({ password: target.value });
          }}
        />
        <button onClick={this.onLoginBtnClicked.bind(this)}>Login</button>
      </div>
    );
  }
}
