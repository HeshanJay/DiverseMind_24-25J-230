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
import AttentionGame3Level1 from "./Pages/Attention/AttentionGame3Level1";
import AttentionGame3Level2 from "./Pages/Attention/AttentionGame3Level2";
import AttentionGame3Level3 from "./Pages/Attention/AttentionGame3Level3";
import WritingGameMenu from "./Pages/WritingInterventions/WritingGameMenu/WritingGameMenu";
import WritingGame2Menu from "./Pages/WritingInterventions/WritingGame2/WritingGame2Menu";
import WritingGame3Menu from "./Pages/WritingInterventions/WritingGame3/WritingGame3Menu";
import WritingGame2Level1 from "./Pages/WritingInterventions/WritingGame2/WritingGame2Level1";
import WritingGame2Level2 from "./Pages/WritingInterventions/WritingGame2/WritingGame2Level2";
import WritingGame2Level3 from "./Pages/WritingInterventions/WritingGame2/WritingGame2Level3";
import WritingGame3Level1 from "./Pages/WritingInterventions/WritingGame3/WritingGame3Level1";
import WritingGame1Level1 from "./Pages/WritingInterventions/WritingGame1/WritingGame1Level1";
import WritingGame3ScoreBoard from "./Pages/WritingInterventions/WritingGame3/WritingGame3ScoreBoard";
import WritingGame1ScoreBoard from "./Pages/WritingInterventions/WritingGame1/WritingGame1ScoreBoard";

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

            <Route
              path="/attentiongame3level1"
              element={<AttentionGame3Level1 />}
            />

            <Route
              path="/attentiongame3level2"
              element={<AttentionGame3Level2 />}
            />
            <Route
              path="/attentiongame3level3"
              element={<AttentionGame3Level3 />}
            />

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
            <Route path="/writing-game-menu" element={<WritingGameMenu />} />
            <Route path="/writing-game2-menu" element={<WritingGame2Menu />} />
            <Route path="/writing-game3-menu" element={<WritingGame3Menu />} />
            <Route
              path="/writing-game2-level1"
              element={<WritingGame2Level1 />}
            />
            <Route
              path="/writing-game2-level2"
              element={<WritingGame2Level2 />}
            />
            <Route
              path="/writing-game2-level3"
              element={<WritingGame2Level3 />}
            />
            <Route
              path="/writing-game3-level1"
              element={<WritingGame3Level1 />}
            />
            <Route
              path="/writing-game3-scoreBoard"
              element={<WritingGame3ScoreBoard />}
            />
            <Route
              path="/writing-game1-level1"
              element={<WritingGame1Level1 />}
            />
            <Route
              path="/writing-game1-scoreBoard"
              element={<WritingGame1ScoreBoard />}
            />
          </Routes>
        </ScoresProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
