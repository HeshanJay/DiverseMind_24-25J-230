import React, { createContext, useState, useContext } from "react";


// Create the context
const ScoresContext = createContext();


// Create a provider component
export const ScoresProvider = ({ children }) => {
  const [visualDiscriminationScore, setVisualDiscriminationScore] = useState(0);
  const [audioDiscriminationScore, setAudioDiscriminationScore] = useState(0);
  const [memoryScore, setMemoryScore] = useState(0);
  const [languageVocabScore, setLanguageVocabScore] = useState(0);
  const [speedScore, setSpeedScore] = useState(0);
  const [currentTestName, setCurrentTestName] = useState("");

  return (
    <ScoresContext.Provider
      value={{
        visualDiscriminationScore,
        setVisualDiscriminationScore,
        audioDiscriminationScore,
        setAudioDiscriminationScore,
        memoryScore,
        setMemoryScore,
        languageVocabScore,
        setLanguageVocabScore,
        speedScore,
        setSpeedScore,
        currentTestName, 
        setCurrentTestName
      }}
    >
      {children}
    </ScoresContext.Provider>
  );
};

// Custom hook to use the context
export const useScores = () => useContext(ScoresContext);
