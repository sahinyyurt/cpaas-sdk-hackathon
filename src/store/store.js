import createStore from "redux-zero";

const store = createStore({
  isLoggedIn: false,
  activeCall: "",
  hasInComingCall: false,
  hasError: ""
});

export default store;
