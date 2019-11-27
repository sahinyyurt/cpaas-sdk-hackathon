import { getTokens } from "../CPaaS";
import { client } from "../CPaaS";
import { bindActions } from "redux-zero/utils";
import _store from "./store";

export const setUserToken = async (store, { username, password, clientId }) => {
  try {
    const token = await getTokens({ username, password, clientId });
    client.setTokens(token);
    return { isLoggedIn: true };
  } catch (error) {
    return { isLoggedIn: false, hasError: "Couldn't login" };
  }
};

export const subscribeService = (store, services) => {
  client.services.subscribe(services, "websocket");
};

export const answerCall = store => {
  const { activeCall } = store;
  const mediaConstraints = {
    audio: true,
    video: true
  };
  client.call.answer(activeCall.id, mediaConstraints);
};

export const createCall = (store, { callee }) => {
  const mediaConstraints = {
    audio: true,
    video: true
  };
  const callId = client.call.make(callee, mediaConstraints);
  const call = client.call.getById(callId);
  return { activeCall: call };
};

export const holdCall = store => {
  const { activeCall } = store;
  client.call.hold(activeCall.id);
};

export const unHoldCall = store => {
  const { activeCall } = store;
  client.call.unhold(activeCall.id);
};

export const endCall = store => {
  const { activeCall } = store;
  client.call.end(activeCall.id);
}

const renderTracks = store => {
  const { activeCall } = store;
  const videoTrack = activeCall.localTracks.find(trackId => {
    return client.media.getTrackById(trackId).kind === "video";
  });
  client.media.renderTracks([videoTrack], "#local");
  client.media.renderTracks(activeCall.remoteTracks, "#remote");
};

export const subcribeHasChanged = store => {
  console.log("subcribeHasChanged");
};
const subcribeHasChangedBound = bindActions({ subcribeHasChanged }, _store);
client.on("subscription:change", function() {
  if (!client.services.getSubscriptions().isPending) {
    if (client.services.getSubscriptions().subscribed.length > 0) {
      console.log(
        "Successfully subscribed to following services: " +
          client.services.getSubscriptions().subscribed.toString()
      );
      subcribeHasChangedBound.subcribeHasChanged();
    } else {
      console.log("Successfully unsubscribed from service subscriptions.");
    }
  }
});

export const incomingCallReceived = (
  store,
  { activeCall, hasInComingCall }
) => {
  return { activeCall, hasInComingCall };
};
const incomingCallReceivedBound = bindActions({ incomingCallReceived }, _store);
client.on("call:receive", params => {
  const { callId } = params;
  const call = client.call.getById(callId);
  incomingCallReceivedBound.incomingCallReceived({
    activeCall: call,
    hasInComingCall: true
  });
});

export const callStatusChanged = (store, { activeCall }) => {
  renderTracks(store);
  return { activeCall };
};
const callStatusChangedBound = bindActions({ callStatusChanged }, _store);
client.on("call:stateChange", function(params) {
  // Retrieve call state.
  const call = client.call.getById(params.callId);

  if (params.error && params.error.message) {
    console.log("Error: " + params.error.message);
  }
  console.log(
    "Call state changed from " + params.previous.state + " to " + call.state
  );
  callStatusChangedBound.callStatusChanged({ activeCall: call });
  
  // If the call ended, stop tracking the callId.
  if (call.state === "ENDED") {
    callStatusChangedBound.callStatusChanged({ activeCall: null });
  }
});
