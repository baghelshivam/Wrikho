import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App.jsx";

//for home page
const rootHome = ReactDOM.createRoot(document.getElementById("rootHome"));
console.log(rootHome);

rootHome.render(
  <React.StrictMode>
  <App />
  </React.StrictMode>
);

