import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { baseUrl, imageBase } from "../package.json";

axios.defaults.baseURL = baseUrl;

ReactDOM.render(
  <App imageBase={imageBase} baseUrl={baseUrl} />,
  document.getElementById("root")
);
