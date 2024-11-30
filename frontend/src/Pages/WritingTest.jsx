import React, { useState } from "react";
import WritingCanvas_MadhyaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_MadhyaAkshara1";
import WritingCanvas_MadhyaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_MadhyaAkshara2";
import WritingCanvas_AarohanaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_AarohanaAkshara1";
import WritingCanvas_AarohanaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_AarohanaAkshara2";
import WritingCanvas_AvarohanaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_AvarohanaAkshara1";
import WritingCanvas_AvarohanaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_AvarohanaAkshara2";
import VowelSymbolQ1 from "../Components/VowelSymbolTest/VowelSymbolQ1";
import VowelSymbolQ2 from "../Components/VowelSymbolTest/VowelSymbolQ2";

const WritingTest = () => {
  const [currentComponent, setCurrentComponent] = useState(1);

  const loadNextComponent = () => {
    setCurrentComponent((prev) => prev + 1); // Increment component state
    console.log("Switched to Component:", currentComponent + 1); // Debugging
  };

  const loadPreviousComponent = () => {
    setCurrentComponent((prev) => (prev > 1 ? prev - 1 : prev)); // Decrement component state
    console.log("Switched to Component:", currentComponent - 1); // Debugging
  };

  return (
    <div>
      {currentComponent === 1 && (
        <WritingCanvas_MadhyaAkshara1
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 2 && (
        <WritingCanvas_MadhyaAkshara2
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 3 && (
        <WritingCanvas_AarohanaAkshara1
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 4 && (
        <WritingCanvas_AarohanaAkshara2
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 5 && (
        <WritingCanvas_AvarohanaAkshara1
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 6 && (
        <WritingCanvas_AvarohanaAkshara2
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
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
    </div>
  );
};

export default WritingTest;
