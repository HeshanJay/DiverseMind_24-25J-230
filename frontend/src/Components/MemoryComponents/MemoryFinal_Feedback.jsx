import React from "react";

const MemoryFinal_Feedback = ({ predictionResult }) => {
  let feedbackText = "ප්‍රතිපල ලබා ගැනෙමින්...";

  if (predictionResult === "Normal") {
    feedbackText = "ඉතා හොඳයි!";
  } else if (predictionResult === "Medium") {
    feedbackText = "හොඳයි!";
  } else if (predictionResult === "Low") {
    feedbackText = "උනන්දු විය යුතුයි!";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-5xl font-bold mb-6">{feedbackText}</h1>
      <p className="text-xl">මේ ඔබගේ මතකය පිළිබඳ නිගමනයයි.</p>
    </div>
  );
};

export default MemoryFinal_Feedback;