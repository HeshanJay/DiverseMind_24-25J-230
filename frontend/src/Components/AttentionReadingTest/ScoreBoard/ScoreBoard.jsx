import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ScoreBoard.css";
import backgroundImage from "../../../assets/background_images/scorebg3.jpg";
import rabbitImage from "../../../assets/characters/rabbit.png";
import { FaRedoAlt, FaHome, FaBars } from "react-icons/fa";
import axios from "axios";

const ScoreBoard = ({ onRestart }) => {
  const navigate = useNavigate();
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
    if (status === "Focused") {
      return "ඉතා හොඳයි 😊";
    } else if (status === "Moderately Focused") {
      return "හොඳයි 😊";
    } else {
      return "හොඳ උත්සාහයක් !🌿";
    }
  };

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex flex-col justify-center items-center relative p-0 m-0"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Move everything upwards by reducing mt-20 to mt-10 */}
      <div className="relative text-center text-white z-10 mt-23">
        <div className="mt-4">
          <h2 className="text-4xl font-bold text-yellow-300 mb-9">
            🎉 ඔබේ අවධානය 🎉
          </h2>
        </div>
        <div className="text-2xl mt-4">
          {loading ? (
            <p className="text-xl text-gray-300">ලෝඩ් වෙමින්... ⏳</p>
          ) : (
            <>
              <p className="font-bold mb-4">
                {getFeedbackMessage(attentionData.status)}
              </p>
              <p className="text-gray-200">
                <strong>මුළු කාලය:</strong> {attentionData.total_time} තත්පර
              </p>
            </>
          )}
        </div>
        {/* Move the rabbit image upwards by reducing my-6 to my-3 */}
        <div className="flex justify-center my-3">
          <img
            src={rabbitImage}
            alt="Jumping Rabbit"
            className="w-24 h-24 animate-bounce"
          />
        </div>

        {/* Right-aligned vertical buttons (pushed even further right and up) */}
        <div className="absolute right-[-150px] top-6 flex flex-col gap-6">
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <FaRedoAlt />
          </button>
          <button
            onClick={() => navigate("/screening_and_interventions")}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <FaHome />
          </button>
          <button
            onClick={() => navigate("/screening-menu")}
            className="bg-gradient-to-r from-pink-400 to-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <FaBars />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
