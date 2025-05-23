import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About"; // Fixed extra slash here
import AttentionReadingTest from "./Pages/ReadingDashboardpage";
import MathScreeningTest from "./Pages/math/MathScreeningTest";
import WritingTest from "./Pages/WritingScreening/WritingTest";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import TeacherDashboard from "./Pages/TeacherDashboard/TeacherDashboard";
import SplashScreen from "./Pages/SplashScreen/SplashScreen";
import Dashboard from "./Components/Dashboard/Dashboard";
import Report from "./Pages/Report/ReportView";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import StudentEntrance from "./Components/StudentEntrence/StudentEntrence";
import HomePage from "./Pages/HomePage/home_page";
import WorkingMemory from "./Pages/WorkingMemory/WorkingMemory";
import { ScoresProvider } from "./context/Score_context";
import ScreeningMenu from "./Pages/ScreeningMenu/ScreeningMenu";
import MathMenu from "./Pages/MathematicActivities/MathMenu";
import MathAdditionGuidancePage from "./Components/MathComponents/Activities/Guidence/MathAdditionGuidancePage";
import MathSubstractionGuidancePage from "./Components/MathComponents/Activities/Guidence/MathSubstractionGuidancePage";
import MathMultiplicationGuidancePage from "./Components/MathComponents/Activities/Guidence/MathMultiplicationGuidancePage";
import MathDivisionGuidancePage from "./Components/MathComponents/Activities/Guidence/MathDivisionGuidancePage";
import MathAdditionGamePage from "./Components/MathComponents/Activities/MathGames/MathAdditionGamePage";
import MathFractionGamePage from "./Components/MathComponents/Activities/MathGames/MathFractionGamePage";
import MathSubstractionGamePage from "./Components/MathComponents/Activities/MathGames/MathSubstractionGamePage";
import MathMultiplicationGamePage from "./Components/MathComponents/Activities/MathGames/MathMultiplicationGamePage";
import MathDivisionGamePage from "./Components/MathComponents/Activities/MathGames/MathDivisionGamePage";
import MathInstruction1 from "./Components/MathComponents/Activities/Instructions/MathInstruction1";
import MathInstruction2 from "./Components/MathComponents/Activities/Instructions/MathInstruction2";
import MathInstruction3 from "./Components/MathComponents/Activities/Instructions/MathInstruction3";
import MathInstruction4 from "./Components/MathComponents/Activities/Instructions/MathInstruction4";
import MathInstruction5 from "./Components/MathComponents/Activities/Instructions/MathInstruction5";
import MathFunnyGameMenu from "./Components/MathComponents/Activities/MathGames/MathFunnyGameMenu";

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
import MathChoiceSelectionPage from "./Pages/MathematicActivities/MathChoiceSelectionPage";
import WritingGameMenu from "./Pages/WritingInterventions/WritingGameMenu/WritingGameMenu";
import WritingGame2Ins from "./Pages/WritingInterventions/WritingGame2/WritingGame2Ins";
import WritingGame2Menu from "./Pages/WritingInterventions/WritingGame2/WritingGame2Menu";
import WritingGame3Menu from "./Pages/WritingInterventions/WritingGame3/WritingGame3Menu";
import WritingGame2Level1 from "./Pages/WritingInterventions/WritingGame2/WritingGame2Level1";
import WritingGame2Level2 from "./Pages/WritingInterventions/WritingGame2/WritingGame2Level2";
import WritingGame2Level3 from "./Pages/WritingInterventions/WritingGame2/WritingGame2Level3";
import WritingGame3Level1 from "./Pages/WritingInterventions/WritingGame3/WritingGame3Level1";
import WritingGame1Level1 from "./Pages/WritingInterventions/WritingGame1/WritingGame1Level1";
import WritingGame3ScoreBoard from "./Pages/WritingInterventions/WritingGame3/WritingGame3ScoreBoard";
import WritingGame1ScoreBoard from "./Pages/WritingInterventions/WritingGame1/WritingGame1ScoreBoard";
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
            <Route path="/report-view/:id" element={<Report />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/student-entrance" element={<StudentEntrance />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/screening-menu" element={<ScreeningMenu />} />
            <Route path="/math-menu" element={<MathMenu />} />
            <Route
              path="/math-addition-guidance"
              element={<MathAdditionGuidancePage />}
            />
            <Route
              path="/math-substraction-guidance"
              element={<MathSubstractionGuidancePage />}
            />
            <Route
              path="/math-multiplication-guidance"
              element={<MathMultiplicationGuidancePage />}
            />
            <Route
              path="/math-division-guidance"
              element={<MathDivisionGuidancePage />}
            />
            <Route
              path="/math-addition-game"
              element={<MathAdditionGamePage />}
            />
            <Route
              path="/math-addition-guidance"
              element={<MathAdditionGuidancePage />}
            />
            <Route
              path="/math-substraction-guidance"
              element={<MathSubstractionGuidancePage />}
            />
            <Route
              path="/math-multiplication-guidance"
              element={<MathMultiplicationGuidancePage />}
            />
            <Route
              path="/math-division-guidance"
              element={<MathDivisionGuidancePage />}
            />
            <Route
              path="/math-addition-game"
              element={<MathAdditionGamePage />}
            />
            <Route path="/math-choice" element={<MathChoiceSelectionPage />} />
            <Route
              path="/screening_and_interventions"
              element={<Screening_and_interventions />}
            />
            <Route path="/interventions-menu" element={<Intervention_menu />} />
            <Route
              path="/working-memory-game1/Level1/*"
              element={<WM_Game1_Level1 />}
            />
            <Route
              path="/working-memory-game1/Level2/*"
              element={<WM_Game1_Level2 />}
            />
            <Route
              path="/working-memory-game1/Level3/*"
              element={<WM_Game1_Level3 />}
            />
            <Route
              path="/working-memory-game2/Level1/*"
              element={<WM_Game2_Level1 />}
            />
            <Route
              path="/working-memory-game2/Level2/*"
              element={<WM_Game2_Level2 />}
            />
            <Route
              path="/working-memory-game2/Level3/*"
              element={<WM_Game2_Level3 />}
            />
            <Route
              path="/working-memory-game3/Level1/*"
              element={<WM_Game3_Level1 />}
            />
            <Route
              path="/working-memory-game3/Level2/*"
              element={<WM_Game3_Level2 />}
            />
            <Route
              path="/working-memory-game3/Level3/*"
              element={<WM_Game3_Level3 />}
            />
            <Route path="/WM_Game1Menu" element={<WM_Game1Menu />} />
            <Route path="/WM_Game2Menu" element={<WM_Game2Menu />} />
            <Route path="/WM_Game3Menu" element={<WM_Game3Menu />} />
            <Route path="/WM_Menu" element={<WM_Menu />} />
            <Route
              path="/math-addition-guidance"
              element={<MathAdditionGuidancePage />}
            />
            <Route
              path="/math-substraction-guidance"
              element={<MathSubstractionGuidancePage />}
            />
            <Route
              path="/math-multiplication-guidance"
              element={<MathMultiplicationGuidancePage />}
            />
            <Route
              path="/math-division-guidance"
              element={<MathDivisionGuidancePage />}
            />
            <Route
              path="/math-addition-game"
              element={<MathAdditionGamePage />}
            />
            <Route path="/writing-game-menu" element={<WritingGameMenu />} />
            <Route path="/writing-game2-ins" element={<WritingGame2Ins />} />
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
            <Route
              path="/math-fraction-game"
              element={<MathFractionGamePage />}
            />
            <Route
              path="/math-substraction-game"
              element={<MathSubstractionGamePage />}
            />
            <Route
              path="/math-multiplication-game"
              element={<MathMultiplicationGamePage />}
            />
            <Route
              path="/math-division-game"
              element={<MathDivisionGamePage />}
            />
            <Route path="/math-instruction1" element={<MathInstruction1 />} />
            <Route path="/math-instruction2" element={<MathInstruction2 />} />
            <Route path="/math-instruction3" element={<MathInstruction3 />} />
            <Route path="/math-instruction4" element={<MathInstruction4 />} />
            <Route path="/math-instruction5" element={<MathInstruction5 />} />
            <Route
              path="/math-funny-game-menu"
              element={<MathFunnyGameMenu />}
            />
          </Routes>
        </ScoresProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
