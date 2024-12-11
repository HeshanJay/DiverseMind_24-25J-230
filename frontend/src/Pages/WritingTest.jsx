import React, { useState, useEffect } from "react";
import axios from "axios";

import WritingCanvas_MadhyaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_MadhyaAkshara1";
import WritingCanvas_MadhyaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_MadhyaAkshara2";
import WritingCanvas_AarohanaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_AarohanaAkshara1";
import WritingCanvas_AarohanaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_AarohanaAkshara2";
import WritingCanvas_AvarohanaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_AvarohanaAkshara1";
import WritingCanvas_AvarohanaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_AvarohanaAkshara2";

import VowelSymbolQ1 from "../Components/VowelSymbolTest/VowelSymbolQ1";
import VowelSymbolQ2 from "../Components/VowelSymbolTest/VowelSymbolQ2";
import VowelSymbolQ3 from "../Components/VowelSymbolTest/VowelSymbolQ3";
import VowelSymbolQ4 from "../Components/VowelSymbolTest/VowelSymbolQ4";
import VowelSymbolQ5 from "../Components/VowelSymbolTest/VowelSymbolQ5";
import VowelSymbolQ6 from "../Components/VowelSymbolTest/VowelSymbolQ6";
import VowelSymbolQ7 from "../Components/VowelSymbolTest/VowelSymbolQ7";
import VowelSymbolQ8 from "../Components/VowelSymbolTest/VowelSymbolQ8";
import VowelSymbolQ9 from "../Components/VowelSymbolTest/VowelSymbolQ9";
import VowelSymbolQ10 from "../Components/VowelSymbolTest/VowelSymbolQ10";

import PunctuationsTestQ1 from "../Components/PunctuationsTest/PunctuationsTestQ1";
import PunctuationsTestQ2 from "../Components/PunctuationsTest/PunctuationsTestQ2";
import PunctuationsTestQ3 from "../Components/PunctuationsTest/PunctuationsTestQ3";
import PunctuationsTestQ4 from "../Components/PunctuationsTest/PunctuationsTestQ4";
import PunctuationsTestQ5 from "../Components/PunctuationsTest/PunctuationsTestQ5";
import PunctuationsTestQ6 from "../Components/PunctuationsTest/PunctuationsTestQ6";

const WritingTest = () => {
  const [currentComponent, setCurrentComponent] = useState(1);
  const [images, setImages] = useState([]); // Store the 6 images

  const loadNextComponent = () => {
    setCurrentComponent((prev) => prev + 1);
    console.log("Switched to Component:", currentComponent + 1);
  };

  const loadPreviousComponent = () => {
    setCurrentComponent((prev) => (prev > 1 ? prev - 1 : prev));
    console.log("Switched to Component:", currentComponent - 1);
  };

  const submitAllImages = async () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      const dataUrl = images[i];
      const blob = await (await fetch(dataUrl)).blob();
      formData.append("images", blob, `letter${i + 1}.png`);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Prediction:", response.data);
      alert(JSON.stringify(response.data));
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleNext = (imageData) => {
    if (imageData) {
      // Add the new image to the state
      setImages((prev) => [...prev, imageData]);
    }

    // Move to the next component
    const nextComponent = currentComponent + 1;
    setCurrentComponent(nextComponent);
  };

  // When images array reaches 6, we know all canvases have been processed
  useEffect(() => {
    if (images.length === 6) {
      submitAllImages();
    }
  }, [images]); // Only runs when 'images' changes

  return (
    <div>
      {/* 6 Canvas Components that capture images */}
      {currentComponent === 1 && (
        <WritingCanvas_MadhyaAkshara1
          onNext={handleNext}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 2 && (
        <WritingCanvas_MadhyaAkshara2
          onNext={handleNext}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 3 && (
        <WritingCanvas_AarohanaAkshara1
          onNext={handleNext}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 4 && (
        <WritingCanvas_AarohanaAkshara2
          onNext={handleNext}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 5 && (
        <WritingCanvas_AvarohanaAkshara1
          onNext={handleNext}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 6 && (
        <WritingCanvas_AvarohanaAkshara2
          onNext={handleNext}
          onBack={loadPreviousComponent}
        />
      )}

      {/* After collecting 6 images, the submission is handled automatically via useEffect */}

      {currentComponent === 7 && (
        <VowelSymbolQ1
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 8 && (
        <VowelSymbolQ2
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 9 && (
        <VowelSymbolQ3
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 10 && (
        <VowelSymbolQ4
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 11 && (
        <VowelSymbolQ5
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 12 && (
        <VowelSymbolQ6
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 13 && (
        <VowelSymbolQ7
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 14 && (
        <VowelSymbolQ8
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 15 && (
        <VowelSymbolQ9
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 16 && (
        <VowelSymbolQ10
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 17 && (
        <PunctuationsTestQ1
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 18 && (
        <PunctuationsTestQ2
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 19 && (
        <PunctuationsTestQ3
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 20 && (
        <PunctuationsTestQ4
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 21 && (
        <PunctuationsTestQ5
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 22 && (
        <PunctuationsTestQ6
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
    </div>
  );
};

export default WritingTest;
