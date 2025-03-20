import React, { useState } from "react";
import axios from "axios";
import "./StudentEntrence.css"; 
import { useNavigate } from "react-router-dom";
import backImg8 from "../../assets/background_images/back_img8.jpg"; 

const StudentEntrance = () => {
  const [teacherCode, setTeacherCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleEntrance = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/add-student/", {
        teacher_code: teacherCode,
        student_name: studentName,
      });
      const studentId = response.data.student_id;
      localStorage.setItem("student_id", studentId);
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/screening_and_interventions");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.detail || "Entrance failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="student-entrance-container"
      style={{
        backgroundImage: `url(${backImg8})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="overlay">
        <div className="student-entrance-form">
          <h2>DiverseMind එක්ක විනෝද වෙමු !</h2>
          <form onSubmit={handleEntrance}>
            <div className="input-group">
              <label htmlFor="teacherCode">ගුරුවරයාගේ අංකය </label>
              <input
                id="teacherCode"
                type="text"
                placeholder="ගුරුවරයාගේ අංකය ඇතුළත් කරන්න"
                value={teacherCode}
                onChange={(e) => setTeacherCode(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="studentName">ඔයාගේ නම</label>
              <input
                id="studentName"
                type="text"
                placeholder="ඔයාගේ නම ඇතුළත් කරන්න "
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "ආරම්භ කරමු !"}
            </button>
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentEntrance;
