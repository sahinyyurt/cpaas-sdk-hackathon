import React, { Component } from "react";
import { connect } from "redux-zero/react";
import {
  subscribeService,
  answerCall,
  createCall,
  holdCall,
  unHoldCall,
  endCall
} from "../store";

class Call extends Component {
  state = {
    callee: ""
  };

  componentDidMount() {
    const { subscribeService } = this.props;
    subscribeService(["call"]);
  }

  renderContainer(call) {
    this.props.renderTracks();
  }

  OnAnswerBtnClick() {
    this.props.answerCall();
  }

  OnCallBtnClick() {
    const { callee } = this.state;
    this.props.createCall({ callee });
  }

  OnHoldBtnClick() {
    this.props.holdCall();
  }
  OnUnHoldBtnClick() {
    this.props.unHoldCall();
  }
  OnEndBtnClick() {
    this.props.endCall();
  }
  render() {
    const { activeCall, hasInComingCall } = this.props;
    return (
      <div>
        <h2>Call</h2>
        <h3>Call Status: {activeCall ? activeCall.state : "No CALL"}</h3>
        <input
          placeholder="Callee Address"
          onChange={({ target }) => {
            this.setState({ callee: target.value });
          }}
        />
        <button onClick={this.OnCallBtnClick.bind(this)}>Call</button>
        <button
          disabled={!hasInComingCall}
          onClick={this.OnAnswerBtnClick.bind(this)}
        >
          Answer
        </button>
        <button disabled={!activeCall} onClick={this.OnHoldBtnClick.bind(this)}>
          Hold
        </button>
        <button
          disabled={!activeCall}
          onClick={this.OnUnHoldBtnClick.bind(this)}
        >
          UnHold
        </button>
        <button
          disabled={!activeCall}
          onClick={this.OnEndBtnClick.bind(this)}
        >
          End Call
        </button>
        <div id="remote" />
        <div id="local" />
      </div>
    );
  }
}

const mapToProps = ({ activeCall, hasInComingCall }) => ({
  activeCall,
  hasInComingCall
});

export default connect(
  mapToProps,
  {
    subscribeService,
    answerCall,
    createCall,
    holdCall,
    unHoldCall,
    endCall
  }
)(Call);
