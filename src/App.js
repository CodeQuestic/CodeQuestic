import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Version1 from "./v2-LandingPage/App";

const App = () => (
  <Router>
    <Routes>
      <Route path="/*" element={<Version1 />} />
    </Routes>
  </Router>
);

export default App;
