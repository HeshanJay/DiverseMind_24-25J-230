import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AttentionReadingTest from "./Pages/ReadingDashboardpage";
import MathScreeningTest from "./Pages/math/MathScreeningTest";
import WritingTest from "./Pages/WritingTest";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Main Pages */}
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Reading Test Dashboard and Passages */}
          <Route
            path="/attentionreadingtest"
            element={<AttentionReadingTest />}
          />
          <Route path="/math" element={<MathScreeningTest />} />
          <Route path="/writingtest" element={<WritingTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
