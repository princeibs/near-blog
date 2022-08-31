import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { BlogDetails, Write, Welcome } from "./pages";
import { initializeContract } from "./utils/near";

window.nearInitPromise = initializeContract()
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/write" element={<Write />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
          </Routes>
        </Router>
      </React.StrictMode>,
      document.getElementById("root")
    );
  })
  .catch(console.error);
