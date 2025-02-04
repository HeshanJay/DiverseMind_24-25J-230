import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ScoreBoard.css";
import backgroundImage from "../../../assets/background_images/back_img4.jpg";
import rabbitImage from "../../../assets/characters/rabbit.png";
import { FaRedoAlt, FaHome, FaBars } from "react-icons/fa";
import axios from "axios";

const ScoreBoard = ({ onRestart }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Open dialog on load
  const [attentionData, setAttentionData] = useState({
    status: null,
    total_time: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAttentionData(); // Fetch data automatically when component loads
  }, []);

  const fetchAttentionData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/attention/result"
      );
      if (response.data) {
        setAttentionData({
          status: response.data.status || "N/A",
          total_time: response.data.total_time || "N/A",
        });
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching attention data:", error);
      setAttentionData({
        status: "Error fetching data",
        total_time: "N/A",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFeedbackMessage = (status) => {
    return status === "Focused" ? "ඉතා හොඳයි 😊" : "හොඳ නැහැ 😐";
  };

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative p-0 m-0"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative text-center">
            <h2 className="text-3xl font-bold text-purple-500 mb-4">
              🎉 ඔබේ අවධානය 🎉
            </h2>
            {loading ? (
              <p className="text-lg text-gray-700">ලෝඩ් වෙමින්... ⏳</p>
            ) : (
              <div className="text-lg">
                <p className="text-2xl font-bold mb-4">
                  {getFeedbackMessage(attentionData.status)}
                </p>
                <p className="text-gray-700">
                  <strong>මුළු කාලය:</strong> {attentionData.total_time} තත්පර
                </p>
              </div>
            )}
            <div className="flex justify-center my-6">
              <img
                src={rabbitImage}
                alt="Jumping Rabbit"
                className="w-24 h-24 animate-bounce"
              />
            </div>
            <div className="flex justify-center gap-10">
              {" "}
              {/* Increased gap for spacing */}
              {/* Restart Button */}
              <button
                onClick={onRestart}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <FaRedoAlt />
              </button>
              {/* Home Button */}
              <button
                onClick={() => navigate("/home")}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <FaHome />
              </button>
              {/* Menu Button */}
              <button
                onClick={() => navigate("/home")}
                className="bg-gradient-to-r from-pink-400 to-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
