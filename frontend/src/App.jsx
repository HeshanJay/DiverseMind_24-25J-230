import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
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
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
