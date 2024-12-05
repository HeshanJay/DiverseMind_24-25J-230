import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import MathScreeningTest from "./Pages/math/MathScreeningTest";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/math" element={<MathScreeningTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
