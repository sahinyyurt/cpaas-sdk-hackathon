import React, { Component } from "react";

import { connect } from "redux-zero/react";
import { setUserToken } from "./store";
import { Login } from "./components/Login";
import Call from "./components/Call";

export class App extends Component {
  onLoginBtnClicked({ username, password, clientId }) {
    this.props.setUserToken({ username, password, clientId });
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Call />
        ) : (
          <Login onLogin={this.onLoginBtnClicked.bind(this)} />
        )}
      </div>
    );
  }
}

const mapToProps = ({ isLoggedIn }) => ({ isLoggedIn });

export default connect(
  mapToProps,
  { setUserToken }
)(App);
