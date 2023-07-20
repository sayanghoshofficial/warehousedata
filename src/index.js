import React from "react";
import ReactDOM from "react-dom";
import { AuthContextprovider } from "./context/AuthContext";
import "./styles/index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextprovider>
      <App />
    </AuthContextprovider>
  </React.StrictMode>
);