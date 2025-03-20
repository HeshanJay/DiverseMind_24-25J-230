import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FiDownload } from "react-icons/fi";
import Logo from "../../assets/logo/DiverseMind_logo.png";
import DashboardHeader from "../../Components/TeacherDashboard/DashboardHeader";
import Sidebar from "../../Components/TeacherDashboard/Sidebar";
import "./ReportView.css";

const ReportView = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  // Sidebar action handlers
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  const routes = [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/screening-menu", name: "Screening Test" },
    { path: "/interventions-menu", name: "Interventions" },
    { name: "Reset Password", onClick: handleResetPassword },
    { name: "Logout", onClick: handleLogout },
  ];

  // Helper functions for mapping outputs
  const getMathDisplay = (value) => {
    // Identity mapping – display the value as is
    return value;
  };

  const getWritingDisplay = (value) => {
    if (value === "Good") return "ඉතා හොඳයි";
    if (value === "Average") return "හොඳයි";
    if (value === "Weak") return "උනන්දු විය යුතුයි";
    return value;
  };

  const getAttentionDisplay = (value) => {
    if (value === "Focused") return "ඉතා හොඳයි";
    if (value === "Moderately Focused") return "මධ්‍යස්තයි";
    if (value === "Not Focused") return "උනන්දු විය යුතුයි";
    return value;
  };

  const getMemoryDisplay = (value) => {
    if (value === "Normal") return "ඉතා හොඳයි";
    if (value === "Medium") return "හොඳයි";
    if (value === "Low") return "උනන්දු විය යුතුයි";
    return value;
  };

  useEffect(() => {
    const fetchStudentReport = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get("http://127.0.0.1:8000/dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const foundStudent = response.data.students.find(
          (stud) => stud._id === id
        );
        if (foundStudent) {
          setStudent(foundStudent);
        } else {
          console.error("Student not found");
        }
      } catch (error) {
        console.error("Error fetching student report:", error);
      }
    };

    fetchStudentReport();
  }, [id, navigate]);

  const handleDownload = () => {
    const reportElement = document.getElementById("reportContent");
    if (!reportElement) return;
    // Temporarily hide the download button from the captured content
    const downloadButton = document.getElementById("downloadButton");
    let originalDisplay = "";
    if (downloadButton) {
      originalDisplay = downloadButton.style.display;
      downloadButton.style.display = "none";
    }
    html2canvas(reportElement, {
      scrollY: -window.scrollY,
      scale: 2,
      windowHeight: reportElement.scrollHeight,
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      if (downloadButton) {
        downloadButton.style.display = ""; // Restore display
      }
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * pageWidth) / imgProps.width;
      let position = 0;
      let remainingHeight = imgHeight;
      while (remainingHeight > 0) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
        if (remainingHeight > 0) {
          pdf.addPage();
          position -= pageHeight;
        }
      }
      pdf.save(`report-${id}.pdf`);
    });
  };

  if (!student) {
    return <div>වාර්තාව පූරණය වෙමින් පවතී...</div>;
  }

  return (
    <div className="flex">
      <Sidebar routes={routes} />

      <div className="flex-grow p-6 ml-64 space-y-6">
        <DashboardHeader />

        <div className="professional-report-container" id="reportContent">
          <div className="report-header">
            <img src={Logo} alt="DiverseMind Logo" className="header-logo" />
            <div className="header-text">
              <h1 className="institute-name">DiverseMind</h1>
              <p className="institute-address">
                ඉගෙනීමේ දුෂ්කරතා ඇති දරුවන් සඳහා අධ්‍යාපන මෙවලමක්
              </p>
            </div>
          </div>

          <div className="report-title-section">
            <h1 className="main-title">ශිෂ්‍ය ප්‍රතිඵල වාර්තාව</h1>
            <div className="title-underline"></div>
          </div>

          <div className="student-info-grid">
            <div className="info-item">
              <span className="info-label">සිසුවාගේ නම:</span>
              <span className="info-value">{student.name}</span>
            </div>
          </div>

          {/* Math Section */}
          <div className="report-section math-section">
            <div className="section-header">
              <h2 className="section-title">ගණිත හැකියා පරීක්ෂාව</h2>
              <div className="section-divider"></div>
            </div>
            {student.math_results?.length > 0 ? (
              <div className="results-grid">
                {student.math_results.map((result, index) => (
                  <div key={index} className="result-card">
                    <div className="skill-level-badge">
                      {getMathDisplay(result.skillPhrase)}
                    </div>
                    <div className="metric-row">
                      <span>සම්පූර්ණ නිරවද්‍යතාව:</span>
                      <span className="metric-value">
                        {result.total_accuracy}%
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>සම්පූර්ණ කාලය:</span>
                      <span className="metric-value">{result.total_time}s</span>
                    </div>
                    <div className="metric-row">
                      <span>එකතු කිරීම:</span>
                      <span className="metric-value">
                        {result.addition_score}/10
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>අඩු කිරීම:</span>
                      <span className="metric-value">
                        {result.substraction_score}/10
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>බෙදීම:</span>
                      <span className="metric-value">
                        {result.division_score}/10
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>ගුණ කිරීම:</span>
                      <span className="metric-value">
                        {result.multiplication_score}/10
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>භාග:</span>
                      <span className="metric-value">
                        {result.fraction_score}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">ගණිත ප්‍රතිඵල නොමැත.</p>
            )}
          </div>

          {/* Writing Section */}
          <div className="report-section">
            <div className="section-header">
              <h2 className="section-title">ලිවීමේ හැකියා පරීක්ෂාව</h2>
              <div className="section-divider"></div>
            </div>
            {student.writing_results?.length > 0 ? (
              <div className="results-grid">
                {student.writing_results.map((result, index) => (
                  <div key={index} className="result-card">
                    <div className="skill-level-badge">
                      {getWritingDisplay(result.skill_level)}
                    </div>
                    <div className="metric-row">
                      <span>ලිවීමේ පරීක්ෂාව:</span>
                      <span className="metric-value">
                        {result.letter_formation_score}/6
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>පිල්ලම් දැනුම පරීක්ෂාව:</span>
                      <span className="metric-value">
                        {result.vowel_symbol_score}/10
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>විරාම ලක්ෂණ දැනුම පරීක්ෂාව:</span>
                      <span className="metric-value">
                        {result.punctuation_score}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">ලිවීමේ ප්‍රතිඵල නොමැත.</p>
            )}
          </div>

          {/* Attention Section */}
          <div className="report-section">
            <div className="section-header">
              <h2 className="section-title">
                අවධානය රඳවා තබා ගැනීමේ පරාසය පරීක්ෂාව
              </h2>
              <div className="section-divider"></div>
            </div>
            {student.attention_results?.length > 0 ? (
              <div className="results-grid">
                {student.attention_results.map((result, index) => (
                  <div key={index} className="result-card">
                    <div className="skill-level-badge">
                      {getAttentionDisplay(result.status)}
                    </div>
                    <div className="metric-row">
                      <span>සාමාන්‍ය ලකුණු:</span>
                      <span className="metric-value">
                        {result.average_score}/10
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>සම්පූර්ණ කාලය:</span>
                      <span className="metric-value">{result.total_time}s</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">අවධානය යොමු කිරීමේ ප්‍රතිඵල නොමැත.</p>
            )}
          </div>

          {/* Memory Section */}
          <div className="report-section memory-section">
            <div className="section-header">
              <h2 className="section-title">මතක ශක්තිය පරීක්ෂාව</h2>
              <div className="section-divider"></div>
            </div>
            {student.memory_results?.length > 0 ? (
              <div className="results-grid">
                {student.memory_results.map((result, index) => (
                  <div key={index} className="result-card">
                    <div className="skill-level-badge">
                      {getMemoryDisplay(result.prediction)}
                    </div>
                    <div className="metric-row">
                      <span>දෘශ්ය වෙනස්කම්:</span>
                      <span className="metric-value">
                        {result.visualDiscriminationScore}/10
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>මතක ලකුණු:</span>
                      <span className="metric-value">
                        {result.memoryScore}/10
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>භාෂා වාග් තන්දුව:</span>
                      <span className="metric-value">
                        {result.languageVocabScore}/10
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>ශ්‍රවණ වෙනස්කම්:</span>
                      <span className="metric-value">
                        {result.audioDiscriminationScore}/10
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>වේගය:</span>
                      <span className="metric-value">
                        {result.speedScore}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">මතක ප්‍රතිඵල නොමැත.</p>
            )}
          </div>

          <div className="download-section">
            <button
              id="downloadButton"
              onClick={handleDownload}
              className="download-btn"
            >
              <FiDownload className="download-icon" />
              සම්පූර්ණ වාර්තාව බාගත කරගන්න
            </button>
            <p className="download-note">
              * මෙම නිල වාර්තාව වලංගු කිරීම සඳහා අධීක්ෂක අත්සන අවශ්‍ය වේ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
