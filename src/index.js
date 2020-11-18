//REACT
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//HELPERS
import reportWebVitals from "./reportWebVitals";

//CSS
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";

//COMPONENTS
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();