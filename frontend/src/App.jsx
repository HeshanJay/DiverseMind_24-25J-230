import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages//About/About";
import AttentionReadingTest from "./Pages/ReadingDashboardpage";
import MathScreeningTest from "./Pages/math/MathScreeningTest";
import WritingTest from "./Pages/WritingScreening/WritingTest";
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
import WritingGameMenu from "./Pages/WritingInterventions/WritingGameMenu/WritingGameMenu";
import WritingGame2Menu from "./Pages/WritingInterventions/WritingGame2/WritingGame2Menu";
import WritingGame2Level1 from "./Pages/WritingInterventions/WritingGame2/WritingGame2Level1";

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
            <Route path="/writing-game-menu" element={<WritingGameMenu />} />
            <Route path="/writing-game2-menu" element={<WritingGame2Menu />} />
            <Route
              path="/writing-game2-level1"
              element={<WritingGame2Level1 />}
            />
          </Routes>
        </ScoresProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
