import React from "react";
import WritingCanvas from "./Components/WritingCanvas/WritingCanvas";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import LetterFormationTest from "./Pages/LetterFormationTest";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/letterformationtest"
            element={<LetterFormationTest />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
