import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import App from "./App";
import { store } from "./store/index";
import { Provider } from "react-redux";
import "./firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
