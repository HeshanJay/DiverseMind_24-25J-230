import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiEye,
  FiTrash2,
  FiRefreshCw,
  FiUsers,
  FiClipboard,
} from "react-icons/fi";
import DashboardHeader from "../../Components/TeacherDashboard/DashboardHeader";
import DashboardCard from "../../Components/TeacherDashboard/DashboardCard";
import Sidebar from "../../Components/TeacherDashboard/Sidebar";
import "./Dashboard.css";

const TeacherDashboard = () => {
  const [uniqueCode, setUniqueCode] = useState("");
  const [students, setStudents] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/dashboard");
      return;
    }
    try {
      const response = await axios.get("http://127.0.0.1:8000/dashboard/", {
        headers: { Authorization: `Bearer ${token}` },
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
        { headers: { Authorization: `Bearer ${token}` } }
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUniqueCode(response.data.unique_code);
    } catch (error) {
      console.error(error);
      alert("Failed to reset code");
    }
  };

  // Sidebar action handlers
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  const handleViewReport = (studentId) => {
    navigate(`/report-view/${studentId}`);
  };

  // Instead of immediately deleting, we show a confirmation popup
  const initiateDelete = (studentId) => {
    setStudentToDelete(studentId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("access_token");
    if (!token || !studentToDelete) {
      navigate("/login");
      return;
    }
    try {
      await axios.delete(
        `http://127.0.0.1:8000/delete-student/${studentToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents((prev) =>
        prev.filter((student) => student._id !== studentToDelete)
      );
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
      setShowDeleteSuccess(true);
      // Hide success popup after 2 seconds
      setTimeout(() => {
        setShowDeleteSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Error deleting student");
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setStudentToDelete(null);
  };

  const getCompletedTasks = (student) => {
    const tasks = [];
    if (student.writing_results?.length) tasks.push("ලිවීමේ හැකියා පරීක්ෂාව");
    if (student.attention_results?.length)
      tasks.push("අවධානය රඳවා තබා ගැනීමේ පරාසය පරීක්ෂාව");
    if (student.math_results?.length) tasks.push("ගණිත හැකියා පරීක්ෂාව");
    if (student.memory_results?.length) tasks.push("මතක ශක්තිය පරීක්ෂාව");
    return tasks;
  };

  const routes = [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/screening-menu", name: "Screening Test" },
    { path: "/interventions-menu", name: "Interventions" },
    { name: "Reset Password", onClick: handleResetPassword },
    { name: "Logout", onClick: handleLogout },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar routes={routes} />

      <div className="main-content">
        <DashboardHeader />

        <div className="metrics-grid text-xl">
          <DashboardCard
            title="ශිෂ්‍ය සංඛ්‍යාව"
            count={students.length}
            icon={<FiUsers size={40} color="white" />}
            color="bg-blue-500"
          />
          {/* <DashboardCard title="Classes" count="8" color="bg-purple-500" /> */}
          <DashboardCard
            title="ඇගයීම් සංඛ්‍යාව"
            count="4"
            icon={<FiClipboard size={40} color="white" />}
            color="bg-green-500"
          />
        </div>

        <div className="code-management">
          <div className="code-card">
            <h3 className="code-title text-2xl" style={{ fontSize: "2rem" }}>
              ඔබේ කේතය
            </h3>
            <div className="code-display">
              <span className="code-value">{uniqueCode || "XXXX-XXXX"}</span>
              <div className="code-actions">
                {!uniqueCode ? (
                  <button
                    onClick={handleGenerateCode}
                    className="code-btn generate text-xl"
                  >
                    <FiRefreshCw className="btn-icon" />
                    කේතය ලබා ගන්න
                  </button>
                ) : (
                  <button
                    onClick={handleResetCode}
                    className="code-btn reset text-xl"
                  >
                    <FiRefreshCw className="btn-icon" />
                    කේතය යළි සකසන්න
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="students-management">
          <div className="students-card">
            <h3 className="students-title">ඇතුළත් වූ සිසුන්</h3>
            {students.length === 0 ? (
              <div className="empty-state">
                <p>තවමත් සිසුන් බඳවාගෙන නොමැත.</p>
              </div>
            ) : (
              <table className="students-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ශිෂ්‍ය නම</th>
                    <th>සම්පූර්ණ කරන ලද ඇගයීම්</th>
                    <th>ක්‍රියා</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>
                        <div className="task-badges">
                          {getCompletedTasks(student).map((task, i) => (
                            <span key={i} className="task-badge">
                              {task}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="view-btn"
                            onClick={() => handleViewReport(student._id)}
                          >
                            <FiEye className="btn-icon" />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => initiateDelete(student._id)}
                          >
                            <FiTrash2 className="btn-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>මැකීම තහවුරු කිරීම</h2>
            <p>ඔබට මෙම වාර්තාව මැකීමට අවශ්‍ය බව ඔබට විශ්වාසද?</p>
            <div className="popup-actions">
              <button className="confirm-btn" onClick={confirmDelete}>
                මැකීම තහවුරු කරන්න
              </button>
              <button className="cancel-btn" onClick={cancelDelete}>
                අවලංගු කරන්න
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showDeleteSuccess && (
        <div className="popup-overlay">
          <div className="popup-content success">
            <h2>වාර්තාව සාර්ථකව මකා දමන ලදී</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
