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
import Screening_and_interventions from "./Pages/ScreeningMenu_interventions/Screening_and_interventions";
import Intervention_menu from "./Pages/Intervention_Menu/Intervention_menu";
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
import WM_Game1_Level1 from "./Pages/WorkingMemoryInterventions/WorkingMemoryGame1/WM_Game1_Level1";
import WM_Game1_Level2 from "./Pages/WorkingMemoryInterventions/WorkingMemoryGame1/WM_Game1_Level2";
import WM_Game1_Level3 from "./Pages/WorkingMemoryInterventions/WorkingMemoryGame1/WM_Game1_Level3";
import WM_Game2_Level1 from "./Pages/WorkingMemoryInterventions/WorkingMmeoryGame2/WM_Game2_Level1";
import WM_Game2_Level2 from "./Pages/WorkingMemoryInterventions/WorkingMmeoryGame2/WM_Game2_Level2";
import WM_Game2_Level3 from "./Pages/WorkingMemoryInterventions/WorkingMmeoryGame2/WM_Game2_Level3";
import WM_Game3_Level1 from "./Pages/WorkingMemoryInterventions/WorkingMemoryGame3/WM_Game3_Level1";
import WM_Game3_Level2 from "./Pages/WorkingMemoryInterventions/WorkingMemoryGame3/WM_Game3_Level2";
import WM_Game3_Level3 from "./Pages/WorkingMemoryInterventions/WorkingMemoryGame3/WM_Game3_Level3";
import WM_Game1Menu from "./Pages/WorkingMemoryInterventions/WorkingMemoryGame1/WM_Game1Menu";
import WM_Game2Menu from "./Pages/WorkingMemoryInterventions/WorkingMmeoryGame2/WM_Game2Menu";
import WM_Game3Menu from "./Pages/WorkingMemoryInterventions/WorkingMemoryGame3/WM_Game3Menu"; 
import WM_Menu from "./Pages/WorkingMemoryInterventions/WorkingMemoryMenu/WM_Menu";
import Writing_menu from "./Components/Writing_menu";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScoresProvider>
          <Routes>
            <Route index element={<SplashScreen />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
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
            <Route path="/screening_and_interventions" element={<Screening_and_interventions />} />
            <Route path="/interventions-menu" element={<Intervention_menu />} />
            <Route path="/working-memory-game1/Level1/*" element={<WM_Game1_Level1 />} />
            <Route path="/working-memory-game1/Level2/*" element={<WM_Game1_Level2 />} />
            <Route path="/working-memory-game1/Level3/*" element={<WM_Game1_Level3 />} />
            <Route path="/working-memory-game2/Level1/*" element={<WM_Game2_Level1 />} />
            <Route path="/working-memory-game2/Level2/*" element={<WM_Game2_Level2 />} />
            <Route path="/working-memory-game2/Level3/*" element={<WM_Game2_Level3 />} />
            <Route path="/working-memory-game3/Level1/*" element={<WM_Game3_Level1 />} />
            <Route path="/working-memory-game3/Level2/*" element={<WM_Game3_Level2 />} />
            <Route path="/working-memory-game3/Level3/*" element={<WM_Game3_Level3 />} />
            <Route path="/WM_Game1Menu" element={<WM_Game1Menu />} />
            <Route path="/WM_Game2Menu" element={<WM_Game2Menu />} />
            <Route path="/WM_Game3Menu" element={<WM_Game3Menu />} />
            <Route path="/WM_Menu" element={<WM_Menu />} />
            <Route path="/Writing_menu" element={<Writing_menu />} />

        </Routes>
        </ScoresProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
