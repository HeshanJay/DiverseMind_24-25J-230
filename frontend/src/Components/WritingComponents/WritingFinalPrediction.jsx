import React from "react";

const Popup = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-center">Final Prediction</h2>
        <p>
          <strong>Skill Level:</strong> {data.skill_level}
        </p>
        <p>
          <strong>Letter Formation Score:</strong> {data.letter_formation_score}
        </p>
        <p>
          <strong>Vowel Symbol Score:</strong> {data.vowel_symbol_score}
        </p>
        <p>
          <strong>Punctuation Score:</strong> {data.punctuation_score}
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
