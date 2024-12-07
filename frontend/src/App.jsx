import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
<<<<<<< HEAD
import AttentionReadingTest from "./Pages/ReadingDashboardpage";
=======
import MathScreeningTest from "./Pages/math/MathScreeningTest";
import WritingTest from "./Pages/WritingTest";
>>>>>>> 8d1dfc0da9c8d96dadbcd56f5eeea2ffbdf345c0

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Main Pages */}
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
<<<<<<< HEAD

          {/* Reading Test Dashboard and Passages */}
          <Route
            path="/attentionreadingtest"
            element={<AttentionReadingTest />}
          />
=======
          <Route path="/math" element={<MathScreeningTest />} />
          <Route path="/writingtest" element={<WritingTest />} />
>>>>>>> 8d1dfc0da9c8d96dadbcd56f5eeea2ffbdf345c0
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
