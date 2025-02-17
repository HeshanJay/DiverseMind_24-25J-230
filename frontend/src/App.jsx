import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages//About/About";
import AttentionReadingTest from "./Pages/ReadingDashboardpage";
import MathScreeningTest from "./Pages/math/MathScreeningTest";
import WritingTest from "./Pages/Writing/WritingTest";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import TeacherDashboard from "./Pages/TeacherDashboard/TeacherDashboard";
import SplashScreen from "./Pages/SplashScreen/SplashScreen";
import Dashboard from "./Components/Dashboard/Dashboard";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import StudentEntrance from "./Components/StudentEntrence/StudentEntrence";
import HomePage from "./Pages/HomePage/home_page";
import WorkingMemory from "./Pages/WorkingMemory/WorkingMemory";
import ScoreBoard from "./Components/Score_board";
import { ScoresProvider } from "./context/Score_context";
import ScreeningMenu from "./Pages/ScreeningMenu/ScreeningMenu";
import AttentionIM from "./Pages/Attention/AttentionIM";
import AttentionGame1 from "./Pages/Attention/AttentionGame1";

import AttentionGame2 from "./Pages/Attention/AttentionGame2";
import AttentionGame2Level1 from "./Pages/Attention/AttentionGame2level1";
import AttentionGame2Level2 from "./Pages/Attention/AttentionGame2Level2";
import AttentionGame2Level3 from "./Pages/Attention/AttentionGame2Level3";
import AttentionGame3 from "./Pages/Attention/AttentionGame3";
import AttentionGame1Level1 from "./Pages/Attention/AttentionGame1Level1";
import AttentionGame1Level2 from "./Pages/Attention/AttentionGame1Level2";
import AttentionGame1Level3 from "./Pages/Attention/AttentionGame1Level3";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScoresProvider>
          <Routes>
            <Route index element={<SplashScreen />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Reading Test Dashboard and Passages */}
            <Route
              path="/attentionreadingtest"
              element={<AttentionReadingTest />}
            />
            <Route path="/attentiongame1" element={<AttentionGame1 />} />

            <Route
              path="/attentiongame1level1"
              element={<AttentionGame1Level1 />}
            />
            <Route
              path="/attentiongame1level2"
              element={<AttentionGame1Level2 />}
            />
            <Route
              path="/attentiongame1level3"
              element={<AttentionGame1Level3 />}
            />

            <Route path="/attentiongame2" element={<AttentionGame2 />} />
            <Route
              path="/attentiongame2level1"
              element={<AttentionGame2Level1 />}
            />
            <Route
              path="/attentiongame2level2"
              element={<AttentionGame2Level2 />}
            />
            <Route
              path="/attentiongame2level3"
              element={<AttentionGame2Level3 />}
            />

            <Route path="/attentiongame3" element={<AttentionGame3 />} />
            <Route path="/attentionInterventions" element={<AttentionIM />} />
            <Route path="/math" element={<MathScreeningTest />} />
            <Route path="/writingtest" element={<WritingTest />} />
            <Route path="/working-memory" element={<WorkingMemory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboardTeacher" element={<TeacherDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/student-entrance" element={<StudentEntrance />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/scoreboard" element={<ScoreBoard />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/screening-menu" element={<ScreeningMenu />} />
          </Routes>
        </ScoresProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
