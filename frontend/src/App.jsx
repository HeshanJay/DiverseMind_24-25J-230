import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import WritingTest from "./Pages/WritingTest";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/writingtest" element={<WritingTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
