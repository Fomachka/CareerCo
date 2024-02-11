import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import App from "./App";
import { store } from "./store/index";
import { Provider } from "react-redux";
import "./firebase";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
    <Toaster
      toastOptions={{
        style: {
          border: "1px solid #858585",
          fontFamily: "Inter",
          fontSize: "14px",
        },
      }}
    />
  </Provider>
);
