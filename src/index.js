import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import DataProvider from "./store/DataProvider";

ReactDOM.render(
  <DataProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DataProvider>,
  document.getElementById("root")
);
