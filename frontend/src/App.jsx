import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages//About/About";
import MemoryTests from "./Pages/Memory_Test";
import LanguageVocabTest from "./Components/Language_vocab_test";
import LanguageVocabActivity from "./Components/Language_vocab_activity";
import SpeedMeasurementTest from "./Components/Speed_Measurement_Test";
import SpeedMeasurementActivity from "./Components/Speed_Measurement_Activity";
import MemoryMeasurementTest from "./Components/memory_measurement_test";
import MemoryTestActivity from "./Components/memory_test_activity";
import VisualTest from "./Components/visual_test";
import VisualTestActivity from "./Components/visual_test_activity";
import ScoreBoard from "./Components/Score_board";
import AudioMeasurementActivity from "./Components/Audio_measurement_activity";
import AudioTest from "./Components/Audio_test";
import AttentionReadingTest from "./Pages/ReadingDashboardpage";
import MathScreeningTest from "./Pages/math/MathScreeningTest";
import WritingTest from "./Pages/Writing/WritingTest";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import TeacherDashboard from "./Pages/TeacherDashboard/TeacherDashboard";

import Dashboard from "./Components/Dashboard/Dashboard";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import StudentEntrance from "./Components/StudentEntrence/StudentEntrence";
import HomePage from "./Pages/HomePage/home_page";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/memory-tests" element={<MemoryTests />} />
          <Route path="/visual-test" element={<VisualTest />} />
          <Route path="/audio-test" element={<AudioTest />} />
          <Route
            path="/visual-test-activity"
            element={<VisualTestActivity />}
          />
          <Route path="/language-vocab-test" element={<LanguageVocabTest />} />
          <Route
            path="/language-vocab-activity"
            element={<LanguageVocabActivity />}
          />
          <Route
            path="/speed-measurement-test"
            element={<SpeedMeasurementTest />}
          />
          <Route
            path="/speed-measurement-activity"
            element={<SpeedMeasurementActivity />}
          />
          <Route
            path="/memory-measurement-test"
            element={<MemoryMeasurementTest />}
          />
          <Route
            path="/memory-test-activity"
            element={<MemoryTestActivity />}
          />
          <Route path="/scoreboard" element={<ScoreBoard />} />
          <Route
            path="/audio-measurement-activity"
            element={<AudioMeasurementActivity />}
          />
          <Route path="*" element={<div>Page Not Found</div>} />
          {/* Reading Test Dashboard and Passages */}
          <Route
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/memory-tests" element={<MemoryTests />} />
        <Route path="/visual-test" element={<VisualTest />} />
        <Route path="/audio-test" element={<AudioTest />} />
        <Route path="/visual-test-activity" element={<VisualTestActivity />} />
        <Route path="/language-vocab-test" element={<LanguageVocabTest />} />
        <Route path="/language-vocab-activity" element={<LanguageVocabActivity />} />
        <Route path="/speed-measurement-test" element={<SpeedMeasurementTest />} />
        <Route path="/speed-measurement-activity" element={<SpeedMeasurementActivity />} />
        <Route path="/memory-measurement-test" element={<MemoryMeasurementTest />} />
        <Route path="/memory-test-activity" element={<MemoryTestActivity />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
        <Route path="/audio-measurement-activity" element={<AudioMeasurementActivity />} />
        <Route path="*" element={<div>Page Not Found</div>} />
        {/* Reading Test Dashboard and Passages */}
        <Route
            path="/attentionreadingtest"
            element={<AttentionReadingTest />}
          />
          <Route path="/math" element={<MathScreeningTest />} />
          <Route path="/writingtest" element={<WritingTest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<TeacherDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/student-entrance" element={<StudentEntrance />} />
          <Route path="/home-page" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
};

export default App;
