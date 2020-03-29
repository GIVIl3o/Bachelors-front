import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { baseUrl } from "../package.json";

axios.defaults.baseURL = baseUrl;

ReactDOM.render(<App />, document.getElementById("root"));
