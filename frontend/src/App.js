import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UploadForm from "./components/UploadForm";
import ValidateDocument from "./components/ValidateDocument";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/validate" element={<ValidateDocument />} />
      </Routes>
    </Router>
  );
}

export default App;
