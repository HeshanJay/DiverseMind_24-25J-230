// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import About from "./Pages/About/About";
// import ScoreBoard from "./Components/Score_board";
// import Login from "./Components/Login/Login";
// import Signup from "./Components/Signup/Signup";
// import { ScoresProvider } from "./context/Score_context";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import ResetPassword from "./Components/ResetPassword/ResetPassword";
// import StudentEntrance from "./Components/StudentEntrence/StudentEntrence";
// import HomePage from "./Pages/HomePage/home_page";
// import WorkingMemory from "./Pages/WorkingMemory/WorkingMemory";

// const App = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         <ScoresProvider>
//           <Routes>
//             <Route index element={<HomePage />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/memory-tests" element={<MemoryTests />} />
//             <Route path="/scoreboard" element={<ScoreBoard />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//             <Route path="/student-entrance" element={<StudentEntrance />} />
//             <Route path="/home-page" element={<HomePage />} />
//             <Route path="/working-memory" element={<WorkingMemory />} />
//             <Route path="*" element={<div>Page Not Found</div>} />
//           </Routes>
//         </ScoresProvider>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import AttentionReadingTest from "./Pages/ReadingDashboardpage";
import MathScreeningTest from "./Pages/math/MathScreeningTest";
import WritingTest from "./Pages/Writing/WritingTest";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import StudentEntrance from "./Components/StudentEntrence/StudentEntrence";
import HomePage from "./Pages/HomePage/home_page";
import TeacherDashboard from "./Pages/TeacherDashboard/TeacherDashboard";
import WorkingMemory from "./Pages/WorkingMemory/WorkingMemory";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/math" element={<MathScreeningTest />} />
          <Route path="/writingtest" element={<WritingTest />} />
          <Route path="/working-memory" element={<WorkingMemory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/student-entrance" element={<StudentEntrance />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
