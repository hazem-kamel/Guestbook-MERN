import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "../src/Redux/Store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "./styles.css";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 2000,
  offset: "10px",
  transition: transitions.FADE,
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
