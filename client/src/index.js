import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";

/**
 * Importação do Materialize CSS
 */
import "materialize-css/dist/css/materialize.min.css";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
