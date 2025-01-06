import React from "react";

const WritingFinalPrediction = ({
  finalPredictionData,
  onClose,
  onSave,
  onViewReport, // <-- new prop for viewing the report
}) => {
  if (!finalPredictionData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-center">Final Prediction</h2>
        <p>
          <strong>Skill Level:</strong> {finalPredictionData.skill_level}
        </p>
        <p>
          <strong>Letter Formation Score:</strong>{" "}
          {finalPredictionData.letter_formation_score}
        </p>
        <p>
          <strong>Vowel Symbol Score:</strong>{" "}
          {finalPredictionData.vowel_symbol_score}
        </p>
        <p>
          <strong>Punctuation Score:</strong>{" "}
          {finalPredictionData.punctuation_score}
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={onSave}
          >
            Save Report
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={() => {
              onViewReport();
              onSave();
            }} // <-- correctly triggers both report view and save
          >
            View Report
          </button>

          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingFinalPrediction;
