import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import * as serviceWorkerRegister from './serviceWorkerRegistration'
import { setUser, searchPeople, setCurrentMessaging } from "./common/reducers";
const logger = createLogger();

const rootReducer = combineReducers({ user: setUser, people: searchPeople, currentMsging: setCurrentMessaging });

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorkerRegister.register();
reportWebVitals();
