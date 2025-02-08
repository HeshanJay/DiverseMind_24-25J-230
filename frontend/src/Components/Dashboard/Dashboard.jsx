import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [uniqueCode, setUniqueCode] = useState("");
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/dashboard/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUniqueCode(response.data.unique_code);
      setStudents(response.data.students);
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleGenerateCode = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-code/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUniqueCode(response.data.unique_code);
    } catch (error) {
      console.error(error);
      alert("Failed to generate code");
    }
  };

  const handleResetCode = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/reset-code/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUniqueCode(response.data.unique_code);
    } catch (error) {
      console.error(error);
      alert("Failed to reset code");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="code-section">
        <h2>ඔබේ කේතය:</h2>
        <p className="unique-code">{uniqueCode || "Not Generated"}</p>
        {!uniqueCode && (
          <button onClick={handleGenerateCode} className="generate-button">
            කේතයක් ලබාගන්න 
          </button>
        )}
        {uniqueCode && (
          <button onClick={handleResetCode} className="reset-button">
            කේතය අලුත් කරන්න 
          </button>
        )}
      </div>
      <div className="students-section">
        <h2>Enrolled Students:</h2>
        {students.length === 0 ? (
          <p>No students enrolled yet.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student._id}>{student.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="actions-section">
        <button onClick={handleResetPassword} className="reset-password-button">
        මුරපදය අලුත් කරන්න 
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
